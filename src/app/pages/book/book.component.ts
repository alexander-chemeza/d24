import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../../restapi.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  // Input decorator to get customerID
  @Input() customerId: number;
  @Input() customerAddressId: number;
  // Reactive forms
  newContragent: any;
  newContact: any;
  newAddress: any;

  request = '';

  constructor(private service: RestapiService) {
    this.customerId = 0;
    this.customerAddressId = -1;
  }

  ngOnInit(): void {
    this.newContragent = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.newContact = new FormGroup({
      type: new FormControl('', [

      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      tel1: new FormControl('', [
        Validators.required
      ]),
      tel2: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      position: new FormControl('', [
        Validators.required
      ])
    });

    this.newAddress = new FormGroup({
      type: new FormControl('', [

      ]),
      place: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required
      ]),
      building: new FormControl('', [
        Validators.required
      ]),
      corpus: new FormControl('', [
        Validators.required
      ]),
      house: new FormControl('', [
        Validators.required
      ]),
      office: new FormControl('', [
        Validators.required
      ]),
      apartment: new FormControl('', [
        Validators.required
      ]),
      deliveryFrom: new FormControl('', [
        Validators.required
      ]),
      deliveryTo: new FormControl('', [
        Validators.required
      ]),
      timeoutFrom: new FormControl('', [
        Validators.required
      ]),
      timeoutTo: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ])
    });
  }
  // Show modal event
  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }
  // Hide modal event
  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }
  // New contragent button event
  createNewContragent(): void {
    // Received data
    const data = {
      customerName: this.newContragent.value.name as string,
      customerType: this.newContragent.value.type as string
    };
    // POST to backend
    this.service.saveUserCustomer(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('new-contragent');
        this.newContragent.reset();
        window.location.reload();
      }
    });
  }
  // New contact button event
  createNewContact(): void {
    // Read fields from popup
    const data = {
      customerAddressId: this.customerAddressId,
      email: this.newContact.value.email as string,
      mainContact: this.newContact.value.type as boolean,
      name: this.newContact.value.name as string,
      phone: this.newContact.value.tel1 as string,
      phone2: this.newContact.value.tel2 as string,
      position: this.newContact.value.position as string
    };
    // Post to backend
    this.service.saveUserCustomerContact(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('new-contact');
        this.newContact.reset();
        window.location.reload();
      }
    });
  }
  // New address button event
  createNewAddress(): void {
    // Read fields from popup
    const data = {
      building: this.newAddress.value.house,
      cityName: this.newAddress.value.place as string,
      description: this.newAddress.value.description as string,
      house: this.newAddress.value.building as string,
      housing: this.newAddress.value.corpus as string,
      mainAddress: this.newAddress.value.type as boolean,
      office: this.newAddress.value.office as string,
      pauseFrom: this.newAddress.value.timeoutFrom as string,
      pauseTo: this.newAddress.value.timeoutTo as string,
      room: this.newAddress.value.apartment as string,
      streetName: this.newAddress.value.street as string,
      timeFrom: this.newAddress.value.deliveryFrom as string,
      timeTo: this.newAddress.value.deliveryTo as string,
      customerId: this.customerId
    };
    console.log('New address', data);
    // Save the data
    this.service.saveUserCustomerAddress(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('new-address');
        this.newAddress.reset();
        window.location.reload();
      }
    });
  }
  // Get customerID
  getCustomerId(id: number): void {
    this.customerId = id;
  }
  // Get addressID
  getCustomerAddressId(id: number): void {
    this.customerAddressId = id;
  }

  filter(event: any): void {
    if (event.code === 'Enter') {
      if (event.target.value !== '') {
        this.request = event.target.value;
      }
    }

    if (event.code === 'Backspace') {
      if (event.target.value === '') {
        this.request = event.target.value;
      }
    }

    if (event.code === 'Delete') {
      if (event.target.value === '') {
        this.request = event.target.value;
      }
    }
  }
}
