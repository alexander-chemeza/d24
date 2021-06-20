import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../../restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;
  // Agents array
  senderAgents: any;
  receiverAgents: any;
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

  profileForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ]),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    userPhone: new FormControl('', [
      Validators.required
    ]),
    sender: new FormControl('', [
      Validators.required
    ]),
    senderAddress: new FormControl('', [
      Validators.required
    ]),
    senderContact: new FormControl('', [
      Validators.required
    ]),
    senderMainAddress: new FormControl('', [
      // Validators.required
    ]),
    receiver: new FormControl('', [
      Validators.required
    ]),
    receiverAddress: new FormControl('', [
      Validators.required
    ]),
    receiverContact: new FormControl('', [
      Validators.required
    ]),
    receiverMainAddress: new FormControl('', [
      // Validators.required
    ]),
    costNotification: new FormControl('', [
      // Validators.required
    ]),
    smsNotification: new FormControl('', [
      // Validators.required
    ])
  });

  constructor(private service: RestapiService) { }

  ngOnInit(): void {
    // Make user object with his data
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    }
    // Clear data if exists
    if (this.senderAgents || this.receiverAgents) {
      this.senderAgents.pop();
      this.receiverAgents.pop();
    }
    // User common data reception
    if (this.user) {
      // Get agents from address book and split it into divided arrays
      this.service.getAllUserCustomer().subscribe(response => {
        if (response.status === 200) {
          this.senderAgents = response.body;
          this.receiverAgents = response.body;
          console.log('sender agents', this.senderAgents);
          console.log('receiver agents', this.receiverAgents);
        }
      });
      // Put some logic to get some user info
      // Put some data in fields
      this.profileForm.patchValue({
        userName: this.user.userName,
        userEmail: this.user.email,
        userPhone: this.user.phone,
        senderMainAddress: this.user.senderAddress.mainAddress,
        receiverMainAddress: this.user.recipientAddress.mainAddress,
      });
    }

  }

  selectAgent($event: any, agentId: any, addresses: any, contacts: any): void {
    addresses.pop();
    contacts.pop();
    if (agentId) {
      addresses.pop();
      contacts.pop();
      this.service.getAllUserCustomerAddress(agentId).subscribe(response => {
        if (response.status === 200 && addresses.length === 0) {
          for (const address of response.body) {
            addresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      });
    }
  }

  selectAddress($event: any, addressId: any, contacts: any): void {
    contacts.pop();
    if (addressId) {
      console.log('addressID', addressId);
      if (contacts) {
        contacts.pop();
      }
      this.service.getAllUserCustomerContact(addressId).subscribe(response => {
        if (response.status === 200) {
          for (const contact of response.body) {
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

    user.senderCustomer = this.senderAgents.filter((item: any) => item.id === this.profileForm.value.sender)[0];

    // Получаю адресс
    let address;
    this.service.getAllUserCustomerAddress(this.profileForm.value.sender).subscribe(response => {
      if (response.status === 200) {
        // Фильтруюю до конкретного адреса
        address = response.body.filter((item: any) => item.id === this.profileForm.value.address);
        // Присваиваю значения полей
        user.senderAddress = address[0];
        console.log('Address ID', address[0].id);
        this.service.getAllUserCustomerContact(address[0].id).subscribe(resp => {
          if (resp.status === 200) {
            user.senderCustomerContact = resp.body.filter((item: any) => item.id === this.profileForm.value.address)[0];
            // Ввожу изменения в сессии
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // Убираю пароль чтоб не запороть пользователя
            delete user.password;
            // Меняю данные на сервере
            this.service.updateUser(user).subscribe(r => {
              if (r.status === 200) {
                console.log('OK sender updated');
                console.log('Updating data', user);
              }
            });
          }
        });
      }
    });
  }

  onKey(event: any): void {
    if (event.target.value === '' || this.senderAgents.length === 0) {
      this.ngOnInit();
    } else {
      this.senderAgents = this.senderAgents.filter((option: any) => option.customerName.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  onKey2(event: any): void {
    if (event.target.value === '' || this.senderAddresses.length === 0) {
      this.senderAddresses.pop();
      this.service.getAllUserCustomerAddress(this.profileForm.value.sender).subscribe(response => {
        if (response.status === 200) {
          for (const address of response.body) {
            this.senderAddresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      });
    } else {
      this.senderAddresses = this.senderAddresses.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey3(event: any): void {
    if (event.target.value === '' || this.senderContacts.length === 0) {
      this.senderContacts.pop();
      this.service.getAllUserCustomerContact(this.profileForm.value.senderAddress).subscribe(response => {
        if (response.status === 200) {
          for (const contact of response.body) {
            this.senderContacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      });
    } else {
      this.senderContacts = this.senderContacts.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey4(event: any): void {
    if (event.target.value === '' || this.receiverAgents.length === 0) {
      this.ngOnInit();
    } else {
      this.receiverAgents = this.receiverAgents.filter((option: any) => option.customerName.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  onKey5(event: any): void {
    if (event.target.value === '' || this.receiverAddresses.length === 0) {
      this.receiverAddresses.pop();
      this.service.getAllUserCustomerAddress(this.profileForm.value.receiver).subscribe(response => {
        if (response.status === 200) {
          for (const address of response.body) {
            this.receiverAddresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      });
    } else {
      this.receiverAddresses = this.receiverAddresses.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey6(event: any): void {
    if (event.target.value === '' || this.receiverContacts.length === 0) {
      this.receiverContacts.pop();
      this.service.getAllUserCustomerContact(this.profileForm.value.receiverAddress).subscribe(response => {
        if (response.status === 200) {
          for (const contact of response.body) {
            this.receiverContacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      });
    } else {
      this.receiverContacts = this.receiverContacts.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  updateUser(event: any): void {
    // Get common data
    this.user.userName = this.profileForm.value.userName;
    this.user.email = this.profileForm.value.userEmail;
    this.user.phone = this.profileForm.value.userPhone;

    // Data
    const currentSenderAgent = this.senderAgents.filter((item: any) => item.id === this.profileForm.value.sender);
    let currentSenderAddress: any;
    let currentSenderContact: any;
    console.log(currentSenderAgent[0]);
    this.service.getAllUserCustomerAddress(currentSenderAgent[0].id).subscribe(response => {
      if (response.status === 200) {
        currentSenderAddress = response.body.filter((item: any) => item.id === this.profileForm.value.senderAddress);
        this.service.getAllUserCustomerContact(currentSenderAddress[0].id).subscribe(r => {
          if (response.status === 200) {
            currentSenderContact = r.body.filter((item: any) => item.id === this.profileForm.value.senderContact);
            if (currentSenderAddress && currentSenderContact) {
              const currentReceiverAgent = this.receiverAgents.filter((item: any) => item.id === this.profileForm.value.receiver);
              let currentReceiverAddress: any;
              let currentReceiverContact: any;
              this.service.getAllUserCustomerAddress(currentReceiverAgent[0].id).subscribe(newResponse => {
                currentReceiverAddress = newResponse.body.filter((item: any) => item.id === this.profileForm.value.receiverAddress);
                this.service.getAllUserCustomerContact(currentReceiverAddress[0].id).subscribe(newR => {
                  if (newR.status === 200) {
                    currentReceiverContact = newR.body.filter((item: any) => item.id === this.profileForm.value.receiverContact);
                    this.user.senderCustomer = currentSenderAgent[0];
                    this.user.senderAddress = currentSenderAddress[0];
                    this.user.senderCustomerContact = currentSenderContact[0];
                    this.user.recipientCustomer = currentReceiverAgent[0];
                    this.user.recipientAddress = currentReceiverAddress[0];
                    this.user.recipientCustomerContact = currentReceiverContact[0];
                    this.user.senderAddress.mainAddress = this.profileForm.value.senderMainAddress;
                    this.user.recipientAddress.mainAddress = this.profileForm.value.receiverMainAddress;
                    this.user.costNotification = this.profileForm.value.costNotification;
                    this.user.smsNotification = this.profileForm.value.smsNotification;
                    console.log('USER', this.user);
                    // Update user info
                    this.service.updateUser(this.user).subscribe(update => {
                      if (update.status === 200) {
                        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
                      }
                    });
                  }
                });
              });
            }
          }
        });
      }
    });
  }
}
