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

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  selectPlace(event: any, form: any): void {
    // Get city id
    const currentCityCode = form.value.place.id;
    console.log('Selected city code', currentCityCode);
    // Find city by the id
    const cityInfo = this.citiesList.find(item => item.id === currentCityCode);
    console.log('City info', cityInfo);
    // Check and build data
    if (cityInfo) {
      // The request object
      this.street = {
        cityCode: cityInfo.city_code,
        regionCode: cityInfo.region_code,
        districtCode: cityInfo.district_code
      };
      console.log('Street search data', this.street);
      // Get streets
      this.service.streets(this.street).subscribe(response => {
        if (response.status === 200) {
          this.streetList = response.body;
          console.log('Street list', this.streetList);
        }
      });
    }
  }

  // Show modal event
  showModal(id: string): void {
    if (id === 'new-address' || id === 'edit-address') {
      this.getCities();
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
    // Received data
    const data = {
      customerName: this.newContragent.value.name as string,
      customerType: this.newContragent.value.type as string
    };
    // POST to backend
    this.service.saveUserCustomer(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('new-contragent', this.newContragent);
        this.newContragent.reset();
        this.contragents.ngOnChanges();
        // window.location.reload();
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
        this.hideModal('new-contact', this.newContact);
        this.newContact.reset();
        // window.location.reload();
        this.contactslist.ngOnChanges();
      }
    });
  }
  // New address button event
  createNewAddress(cityBlock: string, streetBlock: string): void {
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
      console.log('New address', data);
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

          // window.location.reload();
          this.addresslist.ngOnChanges();
        }
      });
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
    } else {
      this.citiesList = this.search(event.target.value);
    }
  }

  private search(value: string): any {
    // const filter = value.toLowerCase();
    // return this.citiesList.filter(option => option.fullName.toLowerCase().includes(filter));
    return this.citiesList.filter(option => option.fullName.indexOf(value) > -1);
  }

  onKey2(event: any): void {
    console.log('from search', this.streetList);
    if (event.target.value === '') {
      this.service.streets(this.street).subscribe(response => {
        if (response.status === 200) {
          this.streetList = response.body.filter((item: any) => item.district_code === this.street.districtCode);
        }
      });
    } else {
      this.streetList = this.search2(event.target.value);
      console.log('Street info', this.streetList);
    }
  }

  private search2(value: string): any {
    const filter = value.toLowerCase();
    return this.streetList.filter(option => option.name.toLowerCase().includes(filter));
  }

  showCustomer(data: any): void {
    this.selectedCustomer = data;
    console.log('Void in book', this.selectedCustomer);
    this.newContragent.patchValue({
      name: this.selectedCustomer[0].customerName,
      type: this.selectedCustomer[0].customerType
    });
    this.showModal('edit-contragent');
    console.log('Name', this.newContragent.value.name);
  }

  showCustomerAddress(data: any): void {
    console.log('Our cities list', this.citiesList);
    this.selectedCustomerAddress = data;
    console.log('Our selected address data', this.selectedCustomerAddress);
    const currentCityCode = this.selectedCustomerAddress[0].cityId;
    console.log('Current city code', currentCityCode);
    // Find city by the id
    const cityInfo = this.citiesList.find(item => item.id === currentCityCode);
    console.log('Info about selected city', cityInfo);
    // Check and build data
    if (cityInfo) {
      // The request object
      this.street = {
        cityCode: cityInfo.city_code,
        regionCode: cityInfo.region_code
      };
      console.log('Selected city street search data', this.street);
      // Get streets
      this.service.streets(this.street).subscribe(resp => {
        if (resp.status === 200) {
          this.streetList = resp.body;
          console.log('Our street list', this.streetList);
          const patch = {
            type: this.selectedCustomerAddress[0].mainAddress,
            place: this.selectedCustomerAddress[0].cityId,
            street: this.selectedCustomerAddress[0].streetId,
            building: this.selectedCustomerAddress[0].house,
            corpus: this.selectedCustomerAddress[0].housing,
            house: this.selectedCustomerAddress[0].building,
            office: this.selectedCustomerAddress[0].office,
            apartment: this.selectedCustomerAddress[0].room,
            deliveryFrom: this.selectedCustomerAddress[0].timeFrom,
            deliveryTo: this.selectedCustomerAddress[0].timeTo,
            timeoutFrom: this.selectedCustomerAddress[0].pauseFrom,
            timeoutTo: this.selectedCustomerAddress[0].pauseTo,
            description: this.selectedCustomerAddress[0].description
          };
          console.log('Patch data', patch);
          this.newAddress.patchValue(patch);
          console.log('Patched');
          this.showModal('edit-address');
          console.log('Modal is shown');
        }
      });
    }
  }

  editCustomer(): void {
    // Received data
    const data = {
      customerName: this.newContragent.value.name as string,
      customerType: this.newContragent.value.type as string,
      id: this.selectedCustomer[0].id
    };
    // POST to backend
    this.service.saveUserCustomer(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('edit-contragent', this.newContragent);
        this.newContragent.reset();
        this.contragents.ngOnChanges();
        // window.location.reload();
      }
    });
  }

  editNewAddress(): void {
    // This vars will get correct name of city and street
    let city: string;
    let street: string;
    // This constants will get the objects describing city and street
    const cityCorrectName = this.citiesList.find(item => item.id === this.newAddress.value.place);
    const streetCorrectName = this.streetList.find(item => item.id === this.newAddress.value.street);
    if (cityCorrectName && streetCorrectName) {
      // Get correct names
      city = cityCorrectName.fullName;
      street = streetCorrectName.name;

      // Read fields from popup
      const data = {
        building: this.newAddress.value.house,
        cityName: city,
        description: this.newAddress.value.description as string,
        house: this.newAddress.value.building as string,
        housing: this.newAddress.value.corpus as string,
        mainAddress: this.newAddress.value.type as boolean,
        office: this.newAddress.value.office as string,
        pauseFrom: this.newAddress.value.timeoutFrom as string,
        pauseTo: this.newAddress.value.timeoutTo as string,
        room: this.newAddress.value.apartment as string,
        streetName: street,
        timeFrom: this.newAddress.value.deliveryFrom as string,
        timeTo: this.newAddress.value.deliveryTo as string,
        customerId: this.customerId,
        id: this.selectedCustomerAddress[0].id
      };
      console.log('Edit address', data);
      // Save the data
      this.service.saveUserCustomerAddress(data).subscribe(response => {
        if (response.status === 200) {
          this.hideModal('edit-address', this.newAddress);
          this.newAddress.reset();
          // window.location.reload();
          this.addresslist.ngOnChanges();
        }
      });
    }
  }

  showCustomerContact(data: any): void {
    this.selectedCustomerContact = data;
    console.log('selected', this.selectedCustomerContact);
    this.newContact.patchValue({
      type: this.selectedCustomerContact[0].mainContact,
      name: this.selectedCustomerContact[0].name,
      tel1: this.selectedCustomerContact[0].phone,
      tel2: this.selectedCustomerContact[0].phone2,
      email: this.selectedCustomerContact[0].email,
      position: this.selectedCustomerContact[0].position
    });
    this.showModal('edit-contact');
  }

  editContact(): void {
    // Read fields from popup
    const data = {
      customerAddressId: this.customerAddressId,
      email: this.newContact.value.email as string,
      id: this.selectedCustomerContact[0].id,
      mainContact: this.newContact.value.type as boolean,
      name: this.newContact.value.name as string,
      phone: this.newContact.value.tel1 as string,
      phone2: this.newContact.value.tel2 as string,
      position: this.newContact.value.position as string
    };
    // Post to backend
    this.service.saveUserCustomerContact(data).subscribe(response => {
      if (response.status === 200) {
        this.hideModal('edit-contact', this.newContact);
        this.contactslist.ngOnChanges();
      }
    });
  }

  cityShow(city: any): any {
    return city.fullName;
  }

  streetShow(street: any): any {
    return street.name;
  }
}
