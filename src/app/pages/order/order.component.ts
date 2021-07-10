import {Component, OnChanges, OnInit} from '@angular/core';
import {RestapiService, Street} from '../../restapi.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

interface ContractList {
  contractActive: string | boolean;
  contractEndDate: string;
  contractNumber: string;
  contractType: string;
  contractUNP: string;
  id?: any;
  ourId: number;
}

interface AddressList {
  id: number;
  name: string;
}

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
  delivery_zone_id: string;
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

interface DeliverySchedulte {
  delivery: string;
  deliveryActive: boolean;
  delivery_day: string;
  delivery_zone_id: string;
  id: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnChanges, OnInit {
  // Work with user contracts
  userType = ''; // Юр.лицо / Физ.лицо
  contractList: ContractList[] = []; // List of available contracts of the user
  contractTypes: string[] = []; // List of contract types
  agreementWithCustomer = false; // Договор с покупателем
  agreementWithWarrantor = false; // Договор с поручителем
  agreementWithPost = false; // Почтовые отправления
  serviceTypes: ServiceTypesList[] = []; // Экспресс-доставка, экспресс-доставка документов, курьерская доставка

  // Delivery schedule
  deliverySchedules: DeliverySchedulte[] = [];

  // Delivery schedules
  expressSenderSchedule = 'fucking shit';
  expressRecipientSchedule = '';
  carrierSenderSchedule = '';
  carrierRecipientSchedule = '';

  // Packages
  expressDeliveryPackage = ['pt0', 'pt1', 'pt2', 'pt4'];

  currentContractId = 0;
  // Cap type and stage detection
  serviceType = '0';
  deliveryType: string;
  stage = 1;


  pipe = new DatePipe('en-US');
  cargoDescription = '';

  currentCity: number;

  select: any;
  // It depends on contracts type


  deliveryTypes: DeliveryTypesList[] = [];
  citiesList: Cities[] = [];
  streetList: StreetsList[] = [];
  street: Street = {
    cityCode: '',
    regionCode: ''
  };

  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;

  expressSenderAgents: any;
  public expressSenderAddresses: {id: number, name: string}[] = [];
  expressSenderContacts: {id: number, name: string}[] = [];

  expressReceiverAgents: any;
  expressReceiverAddresses: {id: number, name: string}[] = [];
  expressReceiverContacts: {id: number, name: string}[] = [];


  // Forms
  orderForm = new FormGroup({
    serviceType: new FormControl('', [
      Validators.required
    ]),
    deliveryType: new FormControl('', [
      Validators.required
    ]),
    expressSender: new FormControl('', [
      Validators.required
    ]),
    expressRecipient: new FormControl('', [
      Validators.required
    ]),
    expressSenderAddress: new FormControl('', [
      Validators.required
    ]),
    expressRecipientAddress: new FormControl('', [
      Validators.required
    ]),
    expressSenderContact: new FormControl('', [
      Validators.required
    ]),
    expressRecipientContact: new FormControl('', [
      Validators.required
    ]),
    expressSenderDeliveryDate: new FormControl('', [
      Validators.required
    ]),
    expressRecipientDeliveryDate: new FormControl('', [
      Validators.required
    ]),
    expressSenderDeliverFrom: new FormControl('', [
      Validators.required
    ]),
    expressRecipientDeliverFrom: new FormControl('', [
      Validators.required
    ]),
    expressSenderDeliverTo: new FormControl('', [
      Validators.required
    ]),
    expressRecipientDeliverTo: new FormControl('', [
      Validators.required
    ]),
    expressSenderTimeoutFrom: new FormControl('', [
      Validators.required
    ]),
    expressRecipientTimeoutFrom: new FormControl('', [
      Validators.required
    ]),
    expressSenderTimeoutTo: new FormControl('', [
      Validators.required
    ]),
    expressRecipientTimeoutTo: new FormControl('', [
      Validators.required
    ]),
    expressSenderTTN: new FormControl('', [
      Validators.required
    ]),
    expressRecipientNotification: new FormControl('', [
      Validators.required
    ]),
    expressRecipientNotificationEmail: new FormControl('', [
      Validators.required
    ]),
    expressSenderDescription: new FormControl('', [
      Validators.required
    ]),
    expressRecipientDescription: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryDescription: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryType: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryType2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryCounter1: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWeight: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryVolume: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryLength: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWidth: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryHeight: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryTTN: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWait: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryRelocate: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryAgreement: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryCounter2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWeight2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryVolume2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryLength2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWidth2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryHeight2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryTTN2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryWait2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryRelocate2: new FormControl('', [
      Validators.required
    ]),
    expressDeliveryAgreement2: new FormControl('', [
      Validators.required
    ]),
    carrierSender: new FormControl('', [
      Validators.required
    ]),
    carrierSenderAddress: new FormControl('', [
      Validators.required
    ]),
    carrierSenderContact: new FormControl('', [
      Validators.required
    ]),
    carrierSenderDate: new FormControl('', [
      Validators.required
    ]),
    carrierSenderDateFrom: new FormControl('', [
      Validators.required
    ]),
    carrierSenderDateTo: new FormControl('', [
      Validators.required
    ]),
    carrierSenderTimeFrom: new FormControl('', [
      Validators.required
    ]),
    carrierSenderTimeTo: new FormControl('', [
      Validators.required
    ]),
    carrierSenderDescription: new FormControl('', [
      Validators.required
    ]),
    carrierRecipient: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientAddress: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientStreet: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientHome: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientPart: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientBuilding: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientOffice: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientApartament: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientContactPhone: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientContactPhone2: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientDate: new FormControl('', [
      Validators.required
    ]),
    carrierRecipientDescription: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryType: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryCounter: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWeight: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryVolume: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryLength: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWidth: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryHeight: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryCost: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryTTN: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWait: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryRelocate: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryAgreement: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryCounter2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryType2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWeight2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryVolume2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryLength2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWidth2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryHeight2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryPayment: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryTTN2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWait2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryRelocate2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryAgreement2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryListing: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryCost2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryType3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWeight3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryVolume3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryLength3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWidth3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryHeight3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryTTN3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryWait3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryRelocate3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryAgreement3: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryListing2: new FormControl('', [
      Validators.required
    ]),
    carrierDeliveryCost3: new FormControl('', [
      Validators.required
    ]),
  });

  newExpressSenderContragent = new FormGroup({
    type: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  newExpressSenderContact = new FormGroup({
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

  newExpressSenderAddress = new FormGroup({
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

  newExpressRecipientContragent = new FormGroup({
    type: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  newExpressRecipientContact = new FormGroup({
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

  newExpressRecipientAddress = new FormGroup({
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

  newCarrierSenderContragent = new FormGroup({
    type: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  newCarrierSenderContact = new FormGroup({
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

  newCarrierSenderAddress = new FormGroup({
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

  constructor(private service: RestapiService) {
    // this.serviceType = this.serviceTypes[0].value;
    this.deliveryType = '';
    this.currentCity = 0;
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    // 0. Get user data
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    }
    // 1. Define available contracts types
    this.contractList = this.user.contractList;
    for (const item of this.contractList) {
      this.contractTypes.push(item.contractType);
    }
    this.contractTypes = this.contractTypes.filter((e: any, i: any) => this.contractTypes.indexOf(e) === i);
    for (const item of this.contractTypes) {
      if (item === 'Договор с покупателем') {
        this.agreementWithCustomer = true;
      } else if (item === 'С поручителем') {
        this.agreementWithWarrantor = true;
      } else {
        this.agreementWithPost = true;
      }
    }
    // 2. Define user type
    if (this.user.unp) {
      this.userType = 'Юр.лицо';
      if (this.agreementWithCustomer && !this.agreementWithWarrantor && !this.agreementWithPost) {
        this.serviceTypes = [
          {value: '0', viewValue: 'Экспресс-доставка грузов'},
          {value: '2', viewValue: 'Экспресс - доставка документов'}
        ];
      } else if (!this.agreementWithCustomer && this.agreementWithWarrantor && !this.agreementWithPost) {
        this.serviceTypes = [
          {value: '1', viewValue: 'Курьерская доставка'},
        ];
      } else if (this.agreementWithCustomer && this.agreementWithWarrantor && !this.agreementWithPost) {
        this.serviceTypes = [
          {value: '0', viewValue: 'Экспресс-доставка грузов'},
          {value: '2', viewValue: 'Экспресс - доставка документов'},
          {value: '1', viewValue: 'Курьерская доставка'},
        ];
      }
    } else {
      this.userType = 'Физ.лицо';
      this.serviceTypes = [
        {value: '1', viewValue: 'Курьерская доставка'}
      ];
    }
  }

  ngOnInit(): void {
    // Set value to amount counters
    this.orderForm.controls.expressDeliveryCounter1.setValue(0);
    this.orderForm.controls.expressDeliveryCounter2.setValue(0);
    // Get delivery types from database
    this.service.deliveryTypes().subscribe(data => {
      this.deliveryTypes = data;
      this.deliveryType = this.deliveryTypes[0].id;
    });
    // Get cities list from database
    this.service.cities().subscribe(data => {
      if (data.status === 200) {
        this.citiesList = data.body;
        // User common data reception
        if (this.user) {
          // Express form fields
          this.service.getAllUserCustomer().subscribe(response => {
            if (response.status === 200) {
              this.expressSenderAgents = response.body;
              this.expressReceiverAgents = response.body;
              this.service.getAllUserCustomerAddress(this.user.senderCustomer.id).subscribe(addresses => {
                if (addresses.status === 200) {
                  for (const address of addresses.body) {
                    this.expressSenderAddresses.push({
                      id: address.id,
                      name: `${address.cityName}, ${address.streetName}`
                    });
                  }
                  console.log('my cities', this.citiesList);
                  const currentAddress = addresses.body.find((item: any) => item.id === this.user.senderAddress.id);
                  console.log('We got fucking address', currentAddress);
                  const currentCity = this.citiesList.find((item: any) => item.id === currentAddress.cityId);
                  let deliveryZone = '';
                  if (currentCity) {
                    deliveryZone = currentCity.delivery_zone_id;
                    // this.getSchedule(deliveryZone, this.expressSenderSchedule);
                    this.service.getDeliveryCalendar(deliveryZone).subscribe(deliveryZoneId => {
                      if (deliveryZoneId.status === 200) {
                        let schedules: any;
                        schedules = deliveryZoneId.body.sort((a: any, b: any) => a.delivery_day > b.delivery_day ? 1 : -1);
                        schedules[0].delivery_day = 'ПН';
                        schedules[1].delivery_day = 'ВТ';
                        schedules[2].delivery_day = 'СР';
                        schedules[3].delivery_day = 'ЧТ';
                        schedules[4].delivery_day = 'ПТ';
                        schedules[5].delivery_day = 'СБ';
                        schedules[6].delivery_day = 'ВС';
                        this.expressSenderSchedule = schedules.filter((item: any) => item.deliveryActive)
                          .map((a: any) => a.delivery_day).join('-');
                        console.log('Schedules active:' + this.expressSenderSchedule);
                      }
                    });
                  }

                  this.service.getAllUserCustomerContact(this.user.senderAddress.id).subscribe(contacts => {
                    if (contacts.status === 200) {
                      for (const contact of contacts.body) {
                        this.expressSenderContacts.push({
                          id: contact.id,
                          name: contact.name
                        });
                      }
                    }
                  });
                }
              });

              this.service.getAllUserCustomerAddress(this.user.recipientCustomer.id).subscribe(addresses => {
                if (addresses.status === 200) {
                  for (const address of addresses.body) {
                    this.expressReceiverAddresses.push({
                      id: address.id,
                      name: `${address.cityName}, ${address.streetName}`
                    });
                  }
                  this.service.getAllUserCustomerContact(this.user.recipientAddress.id).subscribe(contacts => {
                    if (contacts.status === 200) {
                      for (const contact of contacts.body) {
                        this.expressReceiverContacts.push({
                          id: contact.id,
                          name: contact.name
                        });
                      }
                    }
                  });
                }
              });
            }
          });
          this.orderForm.patchValue({
            expressSender: this.user.senderCustomer.id,
            expressSenderAddress: this.user.senderAddress.id,
            expressSenderContact: this.user.senderCustomerContact.id,
            expressRecipient: this.user.recipientCustomer.id,
            expressRecipientAddress: this.user.recipientAddress.id,
            expressRecipientContact: this.user.recipientCustomerContact.id,
          });
        }
      }
    });
  }

  getSchedule(deliveryZoneId: string, field: any): void {
    this.service.getDeliveryCalendar(deliveryZoneId).subscribe(response => {
      if (response.status === 200) {
        let schedules: any;
        schedules = response.body.sort((a: any, b: any) => a.delivery_day > b.delivery_day ? 1 : -1);
        schedules[0].delivery_day = 'ПН';
        schedules[1].delivery_day = 'ВТ';
        schedules[2].delivery_day = 'СР';
        schedules[3].delivery_day = 'ЧТ';
        schedules[4].delivery_day = 'ПТ';
        schedules[5].delivery_day = 'СБ';
        schedules[6].delivery_day = 'ВС';
        field = schedules.filter((item: any) => item.deliveryActive)
          .map((a: any) => a.delivery_day).join('-');
        console.log('Schedules active:' + field);
      }
    });
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

  onKey(event: any): void {
    if (event.target.value === '' || this.expressSenderAgents.length === 0) {
      this.ngOnInit();
    } else {
      this.expressSenderAgents = this.expressSenderAgents.filter((option: any) => {
        return option.customerName.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey2(event: any): void {
    if (event.target.value === '' || this.expressSenderAddresses.length === 0) {
      this.expressSenderAddresses.pop();
      this.service.getAllUserCustomerAddress(this.orderForm.value.expressSender).subscribe(response => {
        if (response.status === 200) {
          for (const address of response.body) {
            this.expressSenderAddresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      });
    } else {
      this.expressSenderAddresses = this.expressSenderAddresses.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey3(event: any): void {
    if (event.target.value === '' || this.expressSenderContacts.length === 0) {
      this.expressSenderContacts.pop();
      this.service.getAllUserCustomerContact(this.orderForm.value.expressSenderAddress).subscribe(response => {
        if (response.status === 200) {
          for (const contact of response.body) {
            this.expressSenderContacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      });
    } else {
      this.expressSenderContacts = this.expressSenderContacts.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey4(event: any): void {
    if (event.target.value === '' || this.expressReceiverAgents.length === 0) {
      this.ngOnInit();
    } else {
      this.expressReceiverAgents = this.expressReceiverAgents.filter((option: any) => {
        return option.customerName.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey5(event: any): void {
    if (event.target.value === '' || this.expressReceiverAddresses.length === 0) {
      this.expressReceiverAddresses.pop();
      this.service.getAllUserCustomerAddress(this.orderForm.value.expressRecipient).subscribe(response => {
        if (response.status === 200) {
          for (const address of response.body) {
            this.expressReceiverAddresses.push({
              id: address.id,
              name: `${address.cityName}, ${address.streetName}`
            });
          }
        }
      });
    } else {
      this.expressReceiverAddresses = this.expressReceiverAddresses.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  onKey6(event: any): void {
    if (event.target.value === '' || this.expressReceiverContacts.length === 0) {
      this.expressReceiverContacts.pop();
      this.service.getAllUserCustomerContact(this.orderForm.value.expressRecipientAddress).subscribe(response => {
        if (response.status === 200) {
          for (const contact of response.body) {
            this.expressReceiverContacts.push({
              id: contact.id,
              name: contact.name
            });
          }
        }
      });
    } else {
      this.expressReceiverContacts = this.expressReceiverContacts.filter((option: any) => {
        return option.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }
  }

  selectService(): void {
    // 0. Variables and constants
    const stageBtns: any = document.getElementsByClassName('stage-btn');
    const submitRows: any = document.getElementsByClassName('submit-row');
    const forms: any = document.getElementsByClassName('form');
    let currentForm: any;
    // 1. Our stage will be 1 on change of service type
    this.stage = 1;
    // 2. We clear order form on change of service type
    this.orderForm.reset();
    // 3. Set button stage 1 as a default
    for (const item of stageBtns) {
     item.classList.remove('active-btn');
    }
    stageBtns[0].classList.add('active-btn');
    // 4. Set bottom controls type 1 as a default
    for (const item of submitRows) {
      item.classList.add('another-form');
    }
    submitRows[0].classList.remove('another-form');
    // 5. Hide all forms
    for (const item of forms) {
      item.classList.add('another-form');
    }
    // 6. Detect current form
    if (this.serviceType === '0') {
      currentForm = document.getElementById('form-0');
    } else if (this.serviceType === '2') {
      currentForm = document.getElementById('form-0');
    } else {
      currentForm = document.getElementById('form-1');
    }
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
    // 0. Variables and constants
    const submitRows: any = document.getElementsByClassName('submit-row');
    const stageBtns: any = document.getElementsByClassName('stage-btn');
    const controlWide: any = document.getElementById('control-wide');
    const forms: any = document.getElementsByClassName('form');
    const circleBtns: any = document.getElementsByClassName('step-mark');
    let currentForm: any;
    let currentControl: any;
    // 1. Hide all forms
    for (const item of forms) {
      item.classList.add('another-form');
    }
    // 2. Hide all controls
    for (const item of submitRows) {
      item.classList.add('another-form');
    }
    // 3. Make stage buttons inactive
    for (const item of stageBtns) {
      item.classList.remove('active-btn');
    }
    // 4. Make all circle step marks inactive
    for (const item of circleBtns) {
      item.classList.remove('active-btn');
    }
    // 5. Set stage
    this.stage = Number(event.target.getAttribute('stage'));
    // 6. Detect forms and controls and change its view
    if (this.serviceType === '0' && this.stage === 1) { // express delivery stage 1
      currentForm = document.getElementById(`form-0`);
      currentControl = document.getElementById(`control-0`);
      controlWide.classList.remove('show-control-wide');
      stageBtns[0].classList.add('active-btn');
      circleBtns[0].classList.add('active-btn');
    } else if (this.serviceType === '0' && this.stage === 2) { // express delivery stage 2
      currentForm = document.getElementById(`form-${this.serviceType}${this.stage}`);
      currentControl = document.getElementById(`control-1`);
      controlWide.classList.add('show-control-wide');
      stageBtns[1].classList.add('active-btn');
      circleBtns[1].classList.add('active-btn');
    } else if (this.serviceType === '2' && this.stage === 1) { // express document stage 1
      currentForm = document.getElementById(`form-0`);
      currentControl = document.getElementById(`control-0`);
      controlWide.classList.remove('show-control-wide');
      stageBtns[0].classList.add('active-btn');
      circleBtns[0].classList.add('active-btn');
    } else if (this.serviceType === '2' && this.stage === 2) { // express document stage 2
      currentForm = document.getElementById(`form-03`);
      currentControl = document.getElementById(`control-1`);
      controlWide.classList.remove('show-control-wide');
      stageBtns[1].classList.add('active-btn');
      circleBtns[1].classList.add('active-btn');
    } else if (this.serviceType === '1' && this.stage === 1) { // ! It may change its view if we have some kind of agreement
      currentForm = document.getElementById(`form-${this.serviceType}`);
      currentControl = document.getElementById(`control-0`);
      controlWide.classList.remove('show-control-wide');
      stageBtns[0].classList.add('active-btn');
      circleBtns[0].classList.add('active-btn');
    } else { // carrier stage 2
      currentForm = document.getElementById(`form-${this.serviceType}${this.stage}`);
      currentControl = document.getElementById(`control-1`);
      controlWide.classList.remove('show-control-wide');
      stageBtns[1].classList.add('active-btn');
      circleBtns[1].classList.add('active-btn');
    }
    // 6. Show detected form, controls and make detected stage active
    currentForm.classList.remove('another-form');
    currentControl.classList.remove('another-form');
  }

  checkboxChange(event: any): void {
    let currentForm: any;
    const status = event.target.checked;
    const forms: any = document.getElementsByClassName('form');
    if (status === false) {
      currentForm = document.getElementById(`form-2`);
    } else {
      currentForm = document.getElementById(`form-13`);
    }
    for (const item of forms) {
      item.classList.add('another-form');
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

  createContragent(form: FormGroup, modalId: string, array: any, field: any): void {
    const data = {
      customerName: form.value.name as string,
      customerType: form.value.type as string
    };
    this.service.saveUserCustomer(data).subscribe(response => {
      if (response.status === 200) {
        this.service.getAllUserCustomer().subscribe(resp => {
          if (resp.status === 200) {
            array = resp.body;
            form.reset();
            this.hideModal(modalId);
            console.log('New contragent', array);
            console.log('Last', );
            if (field === 'expressSender') {
              this.orderForm.patchValue({
                expressSender: array[array.length - 1].id

              });
            } else if (field === 'expressRecipient') {
              this.orderForm.patchValue({
                expressRecipient: array[array.length - 1].id
              });
            }
          }
        });
      }
    });
  }

  createNewAddress(form: any, id: number, modalId: string): void {
    // addresses.pop();
    // This vars will get correct name of city and street
    let city: string;
    let street: string;
    // This constants will get the objects describing city and street
    const cityCorrectName = this.citiesList.find(item => item.id === form.value.place);
    const streetCorrectName = this.streetList.find(item => item.id === form.value.street);
    if (cityCorrectName && streetCorrectName) {
      // Get correct names
      city = cityCorrectName.fullName;
      street = streetCorrectName.name;

      // Read fields from popup
      const data = {
        building: form.value.house,
        cityId: form.value.place,
        cityName: city,
        description: form.value.description as string,
        house: form.value.building as string,
        housing: form.value.corpus as string,
        mainAddress: form.value.type as boolean,
        office: form.value.office as string,
        pauseFrom: form.value.timeoutFrom as string,
        pauseTo: form.value.timeoutTo as string,
        room: form.value.apartment as string,
        streetId: form.value.street,
        streetName: street,
        timeFrom: form.value.deliveryFrom as string,
        timeTo: form.value.deliveryTo as string,
        customerId: id
      };
      // Save the data
      this.service.saveUserCustomerAddress(data).subscribe(response => {
        // addresses.pop();
        if (response.status === 200) {
          this.hideModal(modalId);
          form.reset();
          // this.service.getAllUserCustomerAddress(agentId).subscribe(resp => {
          //   if (response.status === 200) {
          //     addresses.pop();
          //     for (const address of resp.body) {
          //       addresses.push({
          //         id: address.id,
          //         name: `${address.cityName}, ${address.streetName}`
          //       });
          //     }
          //     console.log('Updated', addresses);
          //   }
          // });
        }
      });
    }
  }

  createNewContact(form: any, modalId: string, addressId: number): void {
    // Read fields from popup
    const data = {
      customerAddressId: addressId,
      email: form.value.email as string,
      mainContact: form.value.type as boolean,
      name: form.value.name as string,
      phone: form.value.tel1 as string,
      phone2: form.value.tel2 as string,
      position: form.value.position as string
    };
    // Post to backend
    this.service.saveUserCustomerContact(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal(modalId);
        form.reset();
      }
    });
  }

  decrease(field: string, formValue: any): void {
    const input = document.getElementById(field) as HTMLInputElement;
    let inputValue: any;
    if (input) {
      inputValue = input.value;

      if (inputValue > 0) {
        inputValue--;
        formValue.setValue(inputValue);
      } else if (inputValue === 0) {
        formValue.setValue(0);
      }
    }
  }

  increase(field: string, formValue: any): void {
    const input = document.getElementById(field) as HTMLInputElement;
    let inputValue: any;
    if (input) {
      inputValue = input.value;
      inputValue++;
      formValue.setValue(inputValue);
    }
  }

  newOrder(event: any): any {
    let data: any;
    let container: any;
    let currentContainerValue: any;

    if (this.serviceType === '0') {
      container = document.getElementsByClassName('express-placing-type');
      for (const item of container) {
        if (item.classList.contains('active-btn')) {
          currentContainerValue = item.getAttribute('package');
        }
      }

      data = {
        // Step 1
        deal_type: 1,
        delivery_type: this.deliveryType,
        senderCustomerId: this.orderForm.value.expressSender,
        senderCustomerAddressId: this.orderForm.value.expressSenderAddress,
        senderCustomerContactId: this.orderForm.value.expressSenderContact,
        recipientCustomerId: this.orderForm.value.expressRecipient,
        recipientCustomerAddressId: this.orderForm.value.expressRecipientAddress,
        recipientCustomerContactId: this.orderForm.value.expressRecipientContact,
        sender_delivery_from: `${this.pipe.transform(this.orderForm.value.expressSenderDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressSenderDeliverFrom}`,
        sender_delivery_to: `${this.pipe.transform(this.orderForm.value.expressSenderDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressSenderDeliverTo}`,
        sender_lunch_break_start: `${this.pipe.transform(this.orderForm.value.expressSenderDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressSenderTimeoutFrom}`,
        sender_lunch_break_finish: `${this.pipe.transform(this.orderForm.value.expressSenderDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressSenderTimeoutTo}`,
        sender_description: this.orderForm.value.expressSenderDescription,
        recipient_accept_from: `${this.pipe.transform(this.orderForm.value.expressRecipientDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressRecipientDeliverFrom}`,
        recipient_accept_to: `${this.pipe.transform(this.orderForm.value.expressRecipientDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressRecipientDeliverTo}`,
        recipient_description: this.orderForm.value.expressRecipientDescription,
        recipient_email: this.orderForm.value.expressRecipientNotificationEmail,
        recipient_lunch_break_start: `${this.pipe.transform(this.orderForm.value.expressRecipientDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressRecipientTimeoutFrom}`,
        recipient_lunch_break_finish: `${this.pipe.transform(this.orderForm.value.expressRecipientDeliveryDate, 'dd.MM.yyyy')} ${this.orderForm.value.expressRecipientTimeoutTo}`,

        // Missed
        // senderDate: this.orderForm.value.expressSenderDeliveryDate,
        // senderTTN: this.orderForm.value.expressSenderTTN,
        // recipientDate: this.orderForm.value.expressRecipientDeliveryDate,
        // recipientNotification: this.orderForm.value.expressRecipientNotification,
        // recipientNotificationEmail: this.orderForm.value.expressRecipientNotificationEmail,

        // Step 2
        description_delivery: this.cargoDescription,
        delivery_placing_type: currentContainerValue,
        delivery_weight: this.orderForm.value.expressDeliveryWeight,
        delivery_volume: this.orderForm.value.expressDeliveryVolume,
        delivery_size_x: this.orderForm.value.expressDeliveryLength,
        delivery_size_y: this.orderForm.value.expressDeliveryWidth,
        delivery_size_z: this.orderForm.value.expressDeliveryHeight,
        amount_packages: this.orderForm.value.expressDeliveryCounter1,

        // Missed
        // ttnChange: this.orderForm.value.expressDeliveryTTN,
        // await: this.orderForm.value.expressDeliveryWait,
        // relocation: this.orderForm.value.expressDeliveryRelocate,
        // agreement: this.orderForm.value.expressDeliveryAgreement
      };
    }
    console.log('Data', data);

    this.service.placeNewOrder(data).subscribe(response => {
      if (response.status === 200) {
        console.log('Saved', data);
        this.orderForm.reset();
        for (const item of container) {
          item.classList.remove('active-btn');
        }
        container[0].classList.add('active-btn');
        this.cargoDescription = '';
      }
    });
  }

  swtchDeliveryPlacing(event: any, placingType: any): void {
    const btns: any = document.getElementsByClassName(placingType);
    for (const item of btns) {
      item.classList.remove('active-btn');
    }
    event.target.classList.add('active-btn');
  }
}
