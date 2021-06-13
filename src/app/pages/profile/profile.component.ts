import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService, SaveUserCustomer, UserInfo} from '../../restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Agents array (common)
  agents: any;
  // Address arrays
  senderAddresses: {id: number, name: string}[] = [];
  receiverAddresses: {id: number, name: string}[] = [];
  // Contacts arrays
  senderContacts: {id: number, name: string}[] = [];
  receiverContacts: {id: number, name: string}[] = [];
  // Agents IDs
  currentSenderAgentId: any;
  currentReceiverAgentId: any;
  // Addresses IDs
  currentSenderAddressId: any;
  currentReceiverAddressId: any;

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

    const data = {
      adminUserId: user.adminUserId,
      id: user.id,
      userName: user.userName as string,
      email: user.email as string,
      phone: user.phone as string
    }

    this.service.updateUser(user).subscribe(response => {
      if (response.status === 200) {
        console.log('OK');
      }
    });
  }

  selectAgent($event: any, form: any, agentId: any, addresses: any): void {
    if (form.value.sender) {
      addresses.pop();
      agentId = form.value.sender;
      this.service.getAllUserCustomerAddress(agentId).subscribe(response => {
        if (response.status === 200 && addresses.length === 0) {
          for (let address of response.body) {
            addresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      })
    }
  }

  selectAddress($event: any, form: any, addressId: any, contacts: any): void {
    if(form.value.address) {
      contacts.pop();
      addressId = form.value.address;
      this.service.getAllUserCustomerContact(addressId).subscribe(response => {
        if (response.status === 200) {
          for (let contact of response.body) {
            contacts.push({
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
