import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService, Street} from '../../restapi.service';
import {Cities, StreetsList} from '../order/order.component';
import {ContragentsComponent} from './contragents/contragents.component';
import {AddressComponent} from './address/address.component';
import {ContactsComponent} from './contacts/contacts.component';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  contactsPhoneCode1 = false;
  contactsPhoneCode2 = false;
  contactsFieldIsEmpty = false;
  loading = false;
  userOldInfo: any = sessionStorage.getItem('currentUser');
  user: any;
  // @ts-ignore
  @ViewChild(ContragentsComponent) contragents: ContragentsComponent;

  // @ts-ignore
  @ViewChild(AddressComponent) addresslist: AddressComponent;

  // @ts-ignore
  @ViewChild(ContactsComponent) contactslist: ContactsComponent;

  // Input decorator to get customerID
  @Input() customerId: number;
  @Input() customerAddressId: number;
  @Input() selectedCustomer: any;
  @Input() selectedCustomerAddress: any;
  @Input() selectedCustomerContact: any;
  // Reactive forms
  newContragent: any;
  newContact: any;
  newAddress: any;

  currentCity = 0;
  citiesList: Cities[] = [];
  streetList: StreetsList[] = [];
  street: Street = {
    cityCode: '',
    regionCode: '',
  };

  request = '';

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

    this.customerId = 0;
    this.customerAddressId = -1;
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.userOldInfo) {
      this.user = JSON.parse(this.userOldInfo);
      delete this.user.password;
    } else {
      this.router.navigate(['login']);
    }

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
      // type: new FormControl('', [
      //
      // ]),
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
      // deliveryFrom: new FormControl('', [
      //   Validators.required
      // ]),
      // deliveryTo: new FormControl('', [
      //   Validators.required
      // ]),
      // timeoutFrom: new FormControl('', [
      //   Validators.required
      // ]),
      // timeoutTo: new FormControl('', [
      //   Validators.required
      // ]),
      // description: new FormControl('', [
      //   Validators.required
      // ])
    });

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  selectPlace(event: any, form: any): void {
    this.streetList = [];
    const streetInput1: any = document.getElementById('edit-street');
    const streetInput2: any = document.getElementById('new-street');
    streetInput1.value = '';
    streetInput2.value = '';
    // Get city id
    const currentCityCode = form.value.place.id;
    // Find city by the id
    const cityInfo = this.citiesList.find(item => item.id === currentCityCode);
    // Check and build data
    if (cityInfo) {
      // The request object
      this.street = {
        cityCode: cityInfo.city_code,
        regionCode: cityInfo.region_code,
        districtCode: cityInfo.district_code,
        localityCode: cityInfo.locality_code
      };

      const ok = !Object.values(this.street).every(o => o === null && o === '');

      if (ok) {
        // Get streets
        this.service.streets(this.street).subscribe(response => {
          if (response.status === 200) {
            this.streetList = response.body;
            this.newAddress.get('street').enable();
          } else {
            this.newAddress.get('street').disable();
          }
        });
      }
    }
  }

  // Show modal event
  showModal(id: string): void {
    if (id === 'new-address') {
      this.getCities();
      this.newAddress.get('street').disable();
    }

    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }
  // Hide modal event
  hideModal(id: string, form: any): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
    form.reset();
    // this.citiesList = [];
    this.streetList = [];
    this.selectedCustomerAddress = null;

    if (id === 'new-contact' || id === 'edit-contact') {
      this.contactsFieldIsEmpty = false;
      this.contactsPhoneCode2 = false;
      this.contactsPhoneCode1 = false;
    }
  }
  getCities(): void {
    this.service.cities().subscribe(data => {
      if (data.status === 200) {
        this.citiesList = data.body;
      }
    });
  }
  // New contragent button event
  createNewContragent(): void {
    const contragents: any = document.getElementsByClassName('contragent');
    // Received data
    const data = {
      customerName: this.newContragent.value.name as string,
      customerType: this.newContragent.value.type as string
    };

    if (data.customerName && data.customerType) {
      for (const item of contragents) {
        item.classList.remove('alert-input');
      }
      // POST to backend
      this.service.saveUserCustomer(data).subscribe(response => {
        if (response.status === 200) {
          this.hideModal('new-contragent', this.newContragent);
          this.newContragent.reset();
          this.contragents.getTable();
          // window.location.reload();
        }
      });
    } else {
      for (const item of contragents) {
        if (item.value === null || item.value === '') {
          item.classList.add('alert-input');
        }
      }
    }
  }
  // New contact button event
  createNewContact(): void {
    const contacts: any = document.getElementsByClassName('contact');
    // Read fields from popup
    const data = {
      customerAddressId: this.customerAddressId,
      email: this.newContact.value.email as string,
      mainContact: this.newContact.value.type as boolean,
      name: this.newContact.value.name as string,
      phone: `+375${this.newContact.value.tel1}` as string,
      phone2: `+375${this.newContact.value.tel2}` as string,
      position: this.newContact.value.position as string
    };


    if (data.name && data.phone) {
      const t1 = data.phone.slice(4, 6);
      const t2 = data.phone2.slice(4, 6);
      this.contactsFieldIsEmpty = false;

      if (t1 === '25' || t1 === '29' || t1 === '33' || t1 === '44') {
        this.contactsPhoneCode1 = false;
      } else {
        this.contactsPhoneCode1 = true;
      }

      if (data.phone2.length === 13) {
        if (t2 === '25' || t2 === '29' || t2 === '33' || t2 === '44') {
          this.contactsPhoneCode2 = false;
        } else {
          this.contactsPhoneCode2 = true;
          return;
        }
      } else {
        data.phone2 = '';
      }

      if (!this.contactsPhoneCode1) {
        // Post to backend
        this.service.saveUserCustomerContact(data).subscribe(response => {
          if (response.status === 200) {
            this.hideModal('new-contact', this.newContact);
            this.newContact.reset();
            this.contactslist.ngOnChanges();
          }
        });
      }
   } else {
      this.contactsFieldIsEmpty = true;
    }
  }
  // New address button event
  createNewAddress(cityBlock: string, streetBlock: string): void {
    const addresses: any = document.getElementsByClassName('address');
    // This vars will get correct name of city and street
    let city: string;
    let street: string;
    // This constants will get the objects describing city and street
    const cityCorrectName = this.citiesList.find(item => item.id === this.newAddress.value.place.id);
    const streetCorrectName = this.streetList.find(item => item.id === this.newAddress.value.street.id);
    if (cityCorrectName && streetCorrectName) {
      // Get correct names
      city = cityCorrectName.fullName;
      street = streetCorrectName.name;

      // Read fields from popup
      const data = {
        building: this.newAddress.value.house,
        cityId: this.newAddress.value.place.id,
        cityName: city,
        description: this.newAddress.value.description as string,
        house: this.newAddress.value.building as string,
        housing: this.newAddress.value.corpus as string,
        mainAddress: this.newAddress.value.type as boolean,
        office: this.newAddress.value.office as string,
        pauseFrom: this.newAddress.value.timeoutFrom as string,
        pauseTo: this.newAddress.value.timeoutTo as string,
        room: this.newAddress.value.apartment as string,
        streetId: this.newAddress.value.street.id,
        streetName: street,
        timeFrom: this.newAddress.value.deliveryFrom as string,
        timeTo: this.newAddress.value.deliveryTo as string,
        customerId: this.customerId
      };

      const ok = !Object.values(data).every(o => o === null && o === '');

      if (data.cityId !== '' && data.cityId !== null && data.streetId !== '' && data.streetId !== null && data.house !== null && data.house !== '') {
        // Save the data
        this.service.saveUserCustomerAddress(data).subscribe(response => {
          if (response.status === 200) {
            this.hideModal('new-address', this.newAddress);
            this.newAddress.reset();
            const cityInput: any = document.getElementById(cityBlock);
            const streetInput: any = document.getElementById(streetBlock);
            if (cityInput && streetInput) {
              cityInput.value = '';
              streetInput.value = '';
            }
            this.citiesList = [];
            this.streetList = [];
            this.street = {
              cityCode: '',
              regionCode: '',
              districtCode: '',
              localityCode: ''
            };

            this.addresslist.ngOnChanges();
          }
        });
      } else {
        for (const item of addresses) {
          if(item.value === '' || item.value === null) {
            item.classList.add('alert-input');
          }
        }
      }

    }
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

  onKey(event: any): void {
    if (event.target.value === '' || this.citiesList.length === 0) {
      this.getCities();
      this.streetList = [];
      this.newAddress.get('street').disable();
      const streetInput1: any = document.getElementById('edit-street');
      const streetInput2: any = document.getElementById('new-street');
      streetInput1.value = '';
      streetInput2.value = '';
    } else {
      this.citiesList = this.search(event.target.value);
    }
  }

  private search(value: string): any {
    return this.citiesList.filter(option => option.fullName.indexOf(value) > -1);
  }

  onKey2(event: any): void {
    const ok = !Object.values(this.street).every(o => o === null && o === '');
    if (event.target.value === '' && ok) {
      this.service.streets(this.street).subscribe(response => {
        if (response.status === 200) {
          this.streetList = response.body.filter((item: any) => item.district_code === this.street.districtCode);
        }
      });
    } else {
      this.streetList = this.search2(event.target.value);
    }
  }

  private search2(value: string): any {
    const filter = value.toLowerCase();
    return this.streetList.filter(option => option.name.toLowerCase().includes(filter));
  }

  showCustomer(data: any): void {
    this.selectedCustomer = data;
    this.newContragent.patchValue({
      name: this.selectedCustomer[0].customerName,
      type: this.selectedCustomer[0].customerType
    });
    this.showModal('edit-contragent');
  }

  showCustomerAddress(data: any): void {
    this.loading = true;
    this.newAddress.get('street').enable();
    this.selectedCustomerAddress = data;
    const currentCityCode = this.selectedCustomerAddress[0].cityId;
    this.service.cities().subscribe(cities => {
      if (cities.status === 200) {
        this.citiesList = cities.body;
        // Find city by the id
        const cityInfo = this.citiesList.find(item => item.id === currentCityCode);
        // Check and build data
        if (cityInfo) {
          // The request object
          this.street = {
            cityCode: cityInfo.city_code,
            regionCode: cityInfo.region_code,
            districtCode: cityInfo.district_code,
            localityCode: cityInfo.locality_code
          };

          const ok = !Object.values(this.street).every(o => o === null && o === '');

          if (ok) {
            // Get streets
            this.service.streets(this.street).subscribe(resp => {
              if (resp.status === 200) {
                this.streetList = resp.body;
                const currentStreet = this.streetList.find((item) => item.id === this.selectedCustomerAddress[0].streetId)
                const patch = {
                  // type: this.selectedCustomerAddress[0].mainAddress,
                  place: cityInfo,
                  street: currentStreet,
                  building: this.selectedCustomerAddress[0].house,
                  corpus: this.selectedCustomerAddress[0].housing,
                  house: this.selectedCustomerAddress[0].building,
                  office: this.selectedCustomerAddress[0].office,
                  apartment: this.selectedCustomerAddress[0].room,
                  // deliveryFrom: this.selectedCustomerAddress[0].timeFrom,
                  // deliveryTo: this.selectedCustomerAddress[0].timeTo,
                  // timeoutFrom: this.selectedCustomerAddress[0].pauseFrom,
                  // timeoutTo: this.selectedCustomerAddress[0].pauseTo,
                  // description: this.selectedCustomerAddress[0].description
                };
                this.newAddress.patchValue(patch);
                this.loading = false;
                this.showModal('edit-address');
              }
            });
          }
        }
      }
    });
  }

  editCustomer(): void {
    const contragents: any = document.getElementsByClassName('contragent');
    // Received data
    const data = {
      customerName: this.newContragent.value.name as string,
      customerType: this.newContragent.value.type as string,
      id: this.selectedCustomer[0].id
    };

    if (data.customerName && data.customerType) {
      for (const item of contragents) {
        item.classList.remove('alert-input');
      }
      // POST to backend
      this.service.saveUserCustomer(data).subscribe(response => {
        if (response.status === 200) {
          this.hideModal('edit-contragent', this.newContragent);
          this.newContragent.reset();
          this.contragents.getTable();
        }
      });
    } else {
      for (const item of contragents) {
        if (item.value === null || item.value === '') {
          item.classList.add('alert-input');
        }
      }
    }
  }

  editNewAddress(cityBlock: string, streetBlock: string): void {
    // This vars will get correct name of city and street
    let city: string;
    let street: string;
    // This constants will get the objects describing city and street
    const cityCorrectName = this.citiesList.find(item => item.id === this.newAddress.value.place.id);
    const streetCorrectName = this.streetList.find(item => item.id === this.newAddress.value.street.id);
    if (cityCorrectName && streetCorrectName) {
      // Get correct names
      city = cityCorrectName.fullName;
      street = streetCorrectName.name;

      // Read fields from popup
      const data = {
        building: this.newAddress.value.house,
        cityId: this.newAddress.value.place.id,
        cityName: city,
        description: this.newAddress.value.description as string,
        house: this.newAddress.value.building as string,
        housing: this.newAddress.value.corpus as string,
        mainAddress: this.newAddress.value.type as boolean,
        office: this.newAddress.value.office as string,
        pauseFrom: this.newAddress.value.timeoutFrom as string,
        pauseTo: this.newAddress.value.timeoutTo as string,
        room: this.newAddress.value.apartment as string,
        streetId: this.newAddress.value.street.id,
        streetName: street,
        timeFrom: this.newAddress.value.deliveryFrom as string,
        timeTo: this.newAddress.value.deliveryTo as string,
        customerId: this.customerId,
        id: this.selectedCustomerAddress[0].id
      };

      const ok = !Object.values(data).every(o => o === null && o === '');

      if (ok) {
        // Save the data
        this.service.saveUserCustomerAddress(data).subscribe(response => {
          if (response.status === 200) {
            this.hideModal('edit-address', this.newAddress);
            this.newAddress.reset();
            const cityInput: any = document.getElementById(cityBlock);
            const streetInput: any = document.getElementById(streetBlock);
            const cityInput2: any = document.getElementById('new-city');
            const streetInput2: any = document.getElementById('new-street');
            if (cityInput && streetInput && cityInput2 && streetInput2) {
              cityInput.value = '';
              streetInput.value = '';
              cityInput2.value = '';
              streetInput2.value = '';
            }
            this.citiesList = [];
            this.streetList = [];
            this.street = {
              cityCode: '',
              regionCode: '',
              districtCode: '',
              localityCode: ''
            };
            this.addresslist.ngOnChanges();
          }
        });
      }
    }
  }

  showCustomerContact(data: any): void {
    const contacts: any = document.getElementsByClassName('contact');
    for (const item of contacts) {
      item.classList.remove('alert-input');
    }
    this.selectedCustomerContact = data;
    this.newContact.patchValue({
      type: this.selectedCustomerContact[0].mainContact,
      name: this.selectedCustomerContact[0].name,
      tel1: this.selectedCustomerContact[0].phone.slice(4,13),
      tel2: this.selectedCustomerContact[0].phone2.slice(4,13),
      email: this.selectedCustomerContact[0].email,
      position: this.selectedCustomerContact[0].position
    });
    this.showModal('edit-contact');
  }

  editContact(): void {
    const contacts: any = document.getElementsByClassName('contact');
    // Read fields from popup
    const data = {
      customerAddressId: this.customerAddressId,
      email: this.newContact.value.email as string,
      id: this.selectedCustomerContact[0].id,
      mainContact: this.newContact.value.type as boolean,
      name: this.newContact.value.name as string,
      phone: `+375${this.newContact.value.tel1}` as string,
      phone2: `+375${this.newContact.value.tel2}` as string,
      position: this.newContact.value.position as string
    };

    if (data.name && data.phone) {
      const t1 = data.phone.slice(4, 6);
      const t2 = data.phone2.slice(4, 6);
      this.contactsFieldIsEmpty = false;

      if (t1 === '25' || t1 === '29' || t1 === '33' || t1 === '44') {
        this.contactsPhoneCode1 = false;
      } else {
        this.contactsPhoneCode1 = true;
      }

      if (data.phone2.length === 13) {
        if (t2 === '25' || t2 === '29' || t2 === '33' || t2 === '44') {
          this.contactsPhoneCode2 = false;
        } else {
          this.contactsPhoneCode2 = true;
          return;
        }
      } else {
        data.phone2 = '';
      }

      if (!this.contactsPhoneCode1) {
        // Post to backend
        this.service.saveUserCustomerContact(data).subscribe(response => {
          if (response.status === 200) {
            this.hideModal('edit-contact', this.newContact);
            this.contactslist.ngOnChanges();
          }
        });
      }
    } else {
      this.contactsFieldIsEmpty = true;
    }
  }

  cityShow(city: any): any {
    if (city) {
      return city.fullName;
    }
  }

  streetShow(street: any): any {
    if (street) {
      return street.name;
    }
  }
}
