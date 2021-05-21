import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RestapiService, Street} from '../../restapi.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface ServiceTypesList {
  value: string;
  viewValue: string;
}

interface DeliveryTypesList {
  id: string;
  name: string;
}

export interface Cities {
  id: number;
  name: string;
  type: number;
  abbreviation: string;
  region_code: string;
  district_code: string;
  city_code: string;
  code: string;
  locality_code: string;
  street_code: string;
  fullName: string;
}

export interface StreetsList {
  abbreviation: string;
  city_code: string;
  code: string;
  district_code: string;
  fullName: any;
  id: number;
  locality_code: string;
  name: string;
  region_code: string;
  street_code: string;
  type: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  serviceType: string;
  deliveryType: string;
  currentCity: number;

  select: any;

  serviceTypes: ServiceTypesList[] = [
    {value: '0', viewValue: 'Экспресс-доставка грузов'},
    {value: '1', viewValue: 'Курьерская доставка'},
  ];

  deliveryTypes: DeliveryTypesList[] = [];
  citiesList: Cities[] = [];
  streetList: StreetsList[] = [];
  street: Street = {
    cityCode: '',
    regionCode: ''
  };

  // Reactive forms
  newExpressSenderContragent: any;
  newExpressSenderContact: any;
  newExpressSenderAddress: any;

  newExpressRecipientContragent: any;
  newExpressRecipientContact: any;
  newExpressRecipientAddress: any;

  newCarrierSenderContragent: any;
  newCarrierSenderContact: any;
  newCarrierSenderAddress: any;

  constructor(private service: RestapiService) {
    this.serviceType = this.serviceTypes[0].value;
    this.deliveryType = '';
    this.currentCity = 0;
  }

  ngOnInit(): void {
    this.serviceType = this.serviceTypes[0].value;

    this.service.deliveryTypes().subscribe(data => {
      this.deliveryTypes = data;
      this.deliveryType = this.deliveryTypes[0].id;
    });

    this.service.cities().subscribe(data => {
      if (data.status === 200) {
        this.citiesList = data.body;
        this.currentCity = this.citiesList[0].id;
      }
    });

    this.newExpressSenderContragent = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.newExpressSenderContact = new FormGroup({
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

    this.newExpressSenderAddress = new FormGroup({
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

    this.newExpressRecipientContragent = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.newExpressRecipientContact = new FormGroup({
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

    this.newExpressRecipientAddress = new FormGroup({
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

    this.newCarrierSenderContragent = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.newCarrierSenderContact = new FormGroup({
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

    this.newCarrierSenderAddress = new FormGroup({
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

  selectPlace(event: any, form: any): void {
    // Get city id
    const currentCityCode = form.value.place;
    // Find city by the id
    const cityInfo = this.citiesList.find(item => item.id === currentCityCode);
    // Check and build data
    if (cityInfo) {
      // The request object
      this.street = {
        cityCode: cityInfo.city_code,
        regionCode: cityInfo.region_code
      };
      // Get streets
      this.service.streets(this.street).subscribe(response => {
        if (response.status === 200) {
          this.streetList = response.body;
        }
      });
    }
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

  createNewExpressSenderContragent(): void {
    // Write something
  }

  createNewExpressSenderContact(): void {
    // Write something
  }

  createNewExpressSenderAddress(): void {
    // Write something
  }

  createNewExpressRecipientContragent(): void {
    // Write something
  }

  createNewExpressRecipientContact(): void {
    // Write something
  }

  createNewExpressRecipientAddress(): void {
    // Write something
  }

  createNewCarrierSenderContragent(): void {
    // Write something
  }

  createNewCarrierSenderContact(): void {
    // Write something
  }

  createNewCarrierSenderAddress(): void {
    // Write something
  }
}
