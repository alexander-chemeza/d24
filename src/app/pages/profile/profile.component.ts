import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../../restapi.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = true;
  defaultSender: any;
  defaultRecipient: any;

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

  constructor(private service: RestapiService, private router: Router) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    let defaultRecipient = localStorage.getItem('defaultRecipient');
    let defaultSender = localStorage.getItem('defaultSender');
    if (defaultSender) {
      defaultSender = JSON.parse(defaultSender);
      this.defaultSender = defaultSender;
    }
    if (defaultRecipient) {
      defaultRecipient = JSON.parse(defaultRecipient);
      this.defaultRecipient = defaultRecipient;
    }
    // Make user object with his data
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    } else {
      this.router.navigate(['login']);
    }
    // Clear data if exists
    if (this.senderAgents || this.receiverAgents) {
      this.senderAgents.pop();
      this.receiverAgents.pop();
    }
    // User common data reception
    if (this.user) {
      this.loading = true;
      // Get agents from address book and split it into divided arrays
      this.service.getAllUserCustomer().subscribe(response => {
        if (response.status === 200) {
          this.senderAgents = response.body;
          this.receiverAgents = response.body;
          if (this.user.senderCustomer.id !== null && this.user.senderCustomer.id !== '') {
            this.service.getAllUserCustomerAddress(this.user.senderCustomer.id).subscribe(addresses => {
              if (addresses.status === 200) {
                for (const address of addresses.body) {
                  this.senderAddresses.push({
                    id: address.id,
                    name: `${address.cityName}, ${address.streetName}`
                  });
                }
                if (this.user.senderAddress.id !== null && this.user.senderAddress.id !== '') {
                  this.service.getAllUserCustomerContact(this.user.senderAddress.id).subscribe(contacts => {
                    if (contacts.status === 200) {
                      for (const contact of contacts.body) {
                        this.senderContacts.push({
                          id: contact.id,
                          name: contact.name
                        });
                      }
                    }
                  });
                }
              }
            });
          }

          if (this.user.recipientCustomer.id !== null && this.user.recipientCustomer.id !== '') {
            this.service.getAllUserCustomerAddress(this.user.recipientCustomer.id).subscribe(addresses => {
              if (addresses.status === 200) {
                for (const address of addresses.body) {
                  this.receiverAddresses.push({
                    id: address.id,
                    name: `${address.cityName}, ${address.streetName}`
                  });
                }
                if (this.user.recipientAddress.id !== null && this.user.recipientAddress.id !== '') {
                  this.service.getAllUserCustomerContact(this.user.recipientAddress.id).subscribe(contacts => {
                    if (contacts.status === 200) {
                      for (const contact of contacts.body) {
                        this.receiverContacts.push({
                          id: contact.id,
                          name: contact.name
                        });
                      }
                    }
                  });
                }
              }
            });
          }

          setTimeout(() => {
            this.loading = false;
          }, 500);
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
        sender: this.user.senderCustomer.id,
        senderAddress: this.user.senderAddress.id,
        senderContact: this.user.senderCustomerContact.id,
        receiver: this.user.recipientCustomer.id,
        receiverAddress: this.user.recipientAddress.id,
        receiverContact: this.user.recipientCustomerContact.id,
        costNotification: this.user.costNotification,
        smsNotification: this.user.smsNotification
      });
    }

  }

  saveDefaultSender(): void {
    this.defaultSender = !this.defaultSender;
    localStorage.setItem('defaultSender', JSON.stringify(this.defaultSender));
  }

  saveDefaultRecipient(): void {
    this.defaultRecipient = !this.defaultRecipient;
    localStorage.setItem('defaultRecipient', JSON.stringify(this.defaultRecipient));
  }

  selectAgent($event: any, type: string): void {
    if (type === 'sender') {
      const agentId = this.profileForm.value.sender;
      if (agentId !== null && agentId !== '') {
        this.senderAddresses = [];
        this.senderContacts = [];
        this.service.getAllUserCustomerAddress(agentId).subscribe(response => {
          for (const item of response.body) {
            this.senderAddresses.push({
              id: item.id,
              name: `${item.cityName}, ${item.streetName}`
            });
          }
        });
      }
    } else if (type === 'recipient') {
      const agentId = this.profileForm.value.receiver;
      if (agentId !== null && agentId !== '') {
        this.receiverAddresses = [];
        this.receiverContacts = [];
        this.service.getAllUserCustomerAddress(agentId).subscribe(response => {
          for (const item of response.body) {
            this.receiverAddresses.push({
              id: item.id,
              name: `${item.cityName}, ${item.streetName}`
            });
          }
        });
      }
    }
  }

  selectAddress($event: any, type: string): void {
    if (type === 'sender') {
      const addressId = this.profileForm.value.senderAddress;
      if (addressId) {
        this.senderContacts = [];
        this.service.getAllUserCustomerContact(addressId).subscribe(response => {
          for (const item of response.body) {
            this.senderContacts.push({
              id: item.id,
              name: item.name
            });
          }
        });
      }
    } else if (type === 'recipient') {
      const addressId = this.profileForm.value.receiverAddress;
      if (addressId) {
        this.receiverContacts = [];
        this.service.getAllUserCustomerContact(addressId).subscribe(response => {
          for (const item of response.body) {
            this.receiverContacts.push({
              id: item.id,
              name: item.name
            });
          }
        });
      }
    }
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
                    this.user.recipientCustomer = currentReceiverAgent[0] || null;
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
                        this.showModal('user-updated');
                        setTimeout(() => {
                          this.hideModal('user-updated');
                        }, 3000);
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

  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }
}
