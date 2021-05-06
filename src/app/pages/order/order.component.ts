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


  selectService(event: any): void {
    const stageBtns = document.getElementsByClassName('stage-btn') as HTMLCollection;
    const currentForm = document.getElementById(`form-${this.serviceType}`) as HTMLElement;
    const forms = document.getElementsByClassName('form') as HTMLCollection;
    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.add('another-form');
    }
    for (let i = 0; i < stageBtns.length; i++) {
      stageBtns[i].classList.remove('active-btn');
    }
    stageBtns[0].classList.add('active-btn');
    currentForm.classList.remove('another-form');
  }

  changeStage(event: any): void {
    const stageBtns = document.getElementsByClassName('stage-btn') as HTMLCollection;
    const controlWide = document.getElementById('control-wide') as HTMLElement;
    let currentForm: any;
    const currentStage: string = event.target.getAttribute('stage');
    const forms = document.getElementsByClassName('form') as HTMLCollection;
    if (this.serviceType === '0' && currentStage === '1') {
      currentForm = document.getElementById(`form-${this.serviceType}`);
      controlWide.classList.remove('show-control-wide');
    } else if (this.serviceType === '0' && currentStage === '2') {
      currentForm = document.getElementById(`form-${this.serviceType}${currentStage}`);
      controlWide.classList.add('show-control-wide');
    } else if (this.serviceType === '1' && currentStage === '1') {
      currentForm = document.getElementById(`form-${this.serviceType}`);
      controlWide.classList.remove('show-control-wide');
    } else {
      currentForm = document.getElementById(`form-${this.serviceType}${currentStage}`);
      controlWide.classList.remove('show-control-wide');
    }
    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.add('another-form');
    }
    currentForm.classList.remove('another-form');
    for (let i = 0; i < stageBtns.length; i++) {
      stageBtns[i].classList.remove('active-btn');
    }
    event.target.classList.add('active-btn');
  }

  checkboxChange(event: any): void {
    const list4 = document.getElementById('list4');
    const list5 = document.getElementById('list5');
    let currentForm: any;
    const status = event.target.checked;
    const forms = document.getElementsByClassName('form') as HTMLCollection;
    if (status === false) {
      currentForm = document.getElementById(`form-2`);
    } else {
      currentForm = document.getElementById(`form-13`);
    }
    for (let i = 0; i < forms.length; i++) {
      forms[i].classList.add('another-form');
    }
    currentForm.classList.remove('another-form');
  }
}
