import { Component, OnInit } from '@angular/core';

interface ServiceTypesList {
  value: string;
  viewValue: string;
}

interface DeliveryTypesList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  serviceType: string;
  deliveryType: string;

  serviceTypes: ServiceTypesList[] = [
    {value: '0', viewValue: 'Экспресс-доставка грузов'},
    {value: '1', viewValue: 'Курьерская доставка'},
  ];

  deliveryTypes: DeliveryTypesList[] = [
    {value: '0', viewValue: 'Дверь/дверь'}
  ];

  constructor() {
    this.serviceType = this.serviceTypes[0].value;
    this.deliveryType = this.deliveryTypes[0].value;
  }

  ngOnInit(): void {
    this.serviceType = this.serviceTypes[0].value;
    this.deliveryType = this.deliveryTypes[0].value;
  }

}
