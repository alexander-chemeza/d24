import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService} from '../../restapi.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  // Reactive forms
  newContragent: any;
  newContact: any;
  newAddress: any;

  constructor(private service: RestapiService) { }

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

  createNewContragent(): void {
    // Write something
  }

  createNewContact(): void {
    // Write something
  }

  createNewAddress(): void {
    // Write something
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
    };
    this.service.saveUserCustomerAddress(data).subscribe(response => {
      if (response.status === 200) {
        console.log('Data', data);
        console.log(response.body);
        this.hideModal('new-address');
        this.newAddress.reset();
      }
    });
  }
}
