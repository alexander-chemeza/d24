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
          console.log(addresses);
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
    // Получаю заготовку отправляемого объекта
    const userInfo: any = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
    // Получаю адресс
    let address;
    this.service.getAllUserCustomerAddress(this.senderForm.value.sender).subscribe(response => {
      if (response.status === 200) {
        // Фильтруюю до конкретного адреса
        address = response.body.filter((item: any) => item.id === this.senderForm.value.address);
        // Присваиваю значения полей
        user.senderAddress = address[0];
        console.log('Текущий адресс', user.senderAddress)
        // Ввожу изменения в сессии
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // Убираю пароль чтоб не запороть пользователя
        delete user.password;
        // Меняю данные на сервере
        this.service.updateUser(user).subscribe(response => {
          if (response.status === 200) {
            console.log('OK sender updated');
          }
        });
      }
    })



  }

  onKey(event: any): void {
    if (event.target.value === '' || this.agents.length === 0) {
      this.ngOnInit();
    } else {
      this.agents = this.agents.filter((option: any) => option.customerName.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  onKey2(event: any): void {
    if (event.target.value === '' || this.senderAddresses.length === 0) {
      this.senderAddresses.pop();
      this.service.getAllUserCustomerAddress(this.senderForm.value.sender).subscribe(response => {
        if (response.status === 200) {
          for (let address of response.body) {
            this.senderAddresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      })
    } else {
      this.senderAddresses = this.senderAddresses.filter((option: any) => option.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  onKey3(event: any): void {
    if (event.target.value === '' || this.senderContacts.length === 0) {
      this.senderContacts.pop();
      this.service.getAllUserCustomerContact(this.senderForm.value.address).subscribe(response => {
        if (response.status === 200) {
          for (let contact of response.body) {
            this.senderContacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      })
    } else {
      this.senderContacts = this.senderContacts.filter((option: any) => option.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }
}
