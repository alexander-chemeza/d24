import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService, SaveUserCustomer, UserInfo} from '../../restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  agents: any;
  addresses: {id: number, name: string}[] = [];
  contacts: {id: number, name: string}[] = [];
  currentAgentId: any;
  currentAddressId: any;

  commonForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ]),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    userPhone: new FormControl('', [
      Validators.required
    ])
  });

  senderForm = new FormGroup({
    sender: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    contact: new FormControl('', [
      Validators.required
    ]),
    mainAddress: new FormControl('', [

    ])
  });

  recipientForm = new FormGroup({
    sender: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    contact: new FormControl('', [
      Validators.required
    ]),
    mainAddress: new FormControl('', [

    ])
  });

  constructor(private service: RestapiService) { }

  ngOnInit(): void {
    // User common data reception
    const userInfo: any = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
    this.commonForm.patchValue({
      userName: user.userName,
      userEmail: user.email,
      userPhone: user.phone
    });

    this.service.getAllUserCustomer().subscribe(response => {
      if(response.status === 200) {
        this.agents = response.body;
        console.log('Agents', this.agents);
      }
    })
  }

  updateCommon($event: any): void {
    const userInfo: any = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }

    user.userName = this.commonForm.value.userName;
    user.email = this.commonForm.value.userEmail;
    user.phone = this.commonForm.value.userPhone;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    delete user.password;
    console.log(user);

    const data = {
      adminUserId: user.adminUserId,
      id: user.id,
      userName: user.userName as string,
      email: user.email as string,
      phone: user.phone as string
    }

    console.log('Data', data)

    this.service.updateUser(user).subscribe(response => {
      if (response.status === 200) {
        console.log('OK');
      }
    });
  }

  selectAgent($event: any, form: any): void {
    if (form.value.sender) {
      this.currentAgentId = form.value.sender;
      this.service.getAllUserCustomerAddress(this.currentAgentId).subscribe(response => {
        if (response.status === 200) {
          console.log('AddressList', response.body);
          this.addresses = [];
          for (let address of response.body) {
            this.addresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
          console.log('Pushed', this.addresses);
        }
      })
    }
  }

  selectAddress($event: any, form: any): void {
    if(form.value.address) {
      this.currentAddressId = form.value.address;
      this.service.getAllUserCustomerContact(this.currentAddressId).subscribe(response => {
        if (response.status === 200) {
          console.log('Contacts', response.body);
          this.contacts = [];
          for (let contact of response.body) {
            this.contacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      });
    }
  }

  updateSender($event: any): void {

  }
}
