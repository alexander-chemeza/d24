import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// New order
export interface NewOrder {
  client_type?: number; // on backend
  contact_customer?: string; // on backend
  cost?: number;
  credit?: number;
  credit_type?: number;
  email_customer?: string; // on backend
  identification_number?: string; // on backend
  number?: string; // optional
  payment_status?: number;
  payment_type?: number;
  phone_customer?: string; // on backend

  recipient_address?: string;
  recipient_apartment?: string;
  recipient_city?: string;
  recipient_contact_phone?: string;

  recipient_district?: string;
  recipient_email?: string;
  recipient_house?: string;
  recipient_house_segment?: string;
  recipient_latitude?: string;
  recipient_longitude?: string;
  recipient_name?: string;
  recipient_region?: string;
  recipient_street?: string;
  sender_address?: string;
  sender_apartment?: string;
  sender_city?: string;
  sender_contact_phone?: string;

  sender_district?: string;
  sender_email?: string;
  sender_house?: string;
  sender_house_segment?: string;
  sender_latitude?: string;
  sender_longitude?: string;
  sender_name?: string;
  sender_region?: string;
  sender_street?: string;
  status?: string;

  // Step 1
  deal_type?: number;
  delivery_type?: string;
  senderCustomerId: number;
  senderCustomerAddressId: number;
  senderCustomerContactId: number;
  recipientCustomerId: number;
  recipientCustomerAddressId: number;
  recipientCustomerContactId: number;
  sender_delivery_from?: string;
  sender_delivery_to?: string;
  recipient_accept_from?: string;
  recipient_accept_to?: string;
  sender_description?: string;
  recipient_description?: string;
  // express TTN, email notification, email for notification, email, notification are missed

  // Step 2
  description_delivery?: string;
  delivery_placing_type?: number;
  amount_packages?: number;
  delivery_weight?: number;
  delivery_volume?: number;
  delivery_size_x?: number;
  delivery_size_y?: number;
  delivery_size_z?: number;
  // checkboxes fields are missed
}

// Login user data interface
export interface User {
  name: string;
  role: string;
}

export interface UserInfo {
  userName: string;
  userEmail: string;
  userPhone: string;
}

// Registration user data interface
export interface UserRegistration {
  id?: string;
  passportNumber?: string;
  userName?: string;
  email?: string;
  phone?: string;
  login?: string;
  password?: string;
  companyName?: string;
  unp?: string;
  documentType?: string;
  passportSeries?: string;
  issueAddress?: string;
  issueDate?: string;
  personalNumber?: string;
  homeAddress?: string;
  deliveryFrequency?: string;
  cargoDescription?: string;
  clientName?: string;
  legalAddress?: string;
  postAddress?: string;
  okpo?: string;
  authorizedPerson?: string;
  groundsForSigning?: string;
  bankName?: string;
  bankAddress?: string;
  bankCode?: string;
  account?: string;
  settlementPerson?: string;
  settlementPersonEmail?: string;
  agreement?: string;
  phone2?: string;
  groupName?: string;
  userType?: string;
}

export interface Feedback {
  description: string;
}

export interface Street {
  cityCode: string;
  regionCode: string;
}

// Interface to delete customer
export interface GetUserCustomer {
  id: number;
}

// Interface to delete customer address
export interface GetUserCustomerAddress {
  id: number;
}

// Interface to delete customer contact
export interface GetUserCustomerContact {
  id: number;
}

// Interface to save address book contagent
export interface SaveUserCustomer {
  customerName: string;
  customerType: string;
  id?: number;
  userId?: number;
}

// Interface to save address book address
export interface SaveUserCustomerAddress {
  building: string;
  cityId?: number;
  cityName: string;
  customerId?: number;
  deliveryZoneId?: string;
  description: string;
  house: string;
  housing: string;
  id?: number;
  mainAddress: boolean;
  office: string;
  pauseFrom: string;
  pauseTo: string;
  room: string;
  streetId?: number;
  streetName: string;
  timeFrom: string;
  timeTo: string;
  fullName?: string;
}

// Interface to save address book contact
export interface SaveUserCustomerContact {
  customerAddressId: number;
  email: string;
  mainContact: boolean;
  name: string;
  phone: string;
  phone2: string;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
    // this.url = 'http://31.130.201.42:8080';
  }
  // user-controller GET
  public login(username: string, password: string): Observable<any> {
    // Headers that contains form fields data
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    // GET method to login, that returns an object {"name": "value", role: "value"}
    return this.http.get<User>(`${this.url}/login`, {headers, responseType: 'json', withCredentials: true});
  }
  // user-controller POST
  public register(data: UserRegistration): Observable<any> {
    return this.http.post(`${this.url}/registration`, data, {observe: 'response', withCredentials: true});
  }
  // user-controller POST
  public addManager(data: UserRegistration): Observable<any> {
    return this.http.post(`${this.url}/adminUser/addManager`, data, {observe: 'response', withCredentials: true});
  }
  // user-controller GET
  public getAllManagers(params: any): Observable<any> {
    return this.http.get(`${this.url}/adminUser/getAllManagers`, {observe: 'response', withCredentials: true, params});
  }
  // user-controller GET
  public getUserById(params: any): Observable<any> {
    return this.http.get(`${this.url}/adminUser/getUserById`, {observe: 'response', withCredentials: true, params});
  }
  // user controller get groups GET
  public getGroups(): Observable<any> {
    return this.http.get(`${this.url}/user/group/getAll`, {observe: 'response', withCredentials: true});
  }
  // user-controller GET
  public logout(): Observable<any> {
    return this.http.get(`${this.url}/logout`, {withCredentials: true});
  }
  // delivery-type-controller GET
  public deliveryTypes(): Observable<any> {
    // const headers = new HttpHeaders({});
    // headers.append('Set-Cookies', 'JSESSIONID=<jsessionid>');
    // console.log(headers);
    return this.http.get(`${this.url}/user/deliveryType/getAll`, {responseType: 'json', withCredentials: true});
  }
  // feedback-controller POST
  public feedback(data: Feedback): Observable<any> {
    return  this.http.post(`${this.url}/user/sendFeedback`, data, {observe: 'response', withCredentials: true});
  }
  // user-contract-controller GET
  public contracts(): Observable<any> {
    return this.http.get(`${this.url}/user/contracts`, {observe: 'response', withCredentials: true});
  }
  // address-controller GET
  public cities(): Observable<any> {
    return this.http.get(`${this.url}/user/address/getAllCities`, {observe: 'response', withCredentials: true});
  }
  // address-controller POST
  public streets(data: Street): Observable<any> {
    return this.http.post(`${this.url}/user/address/getAllStreet`, data, {observe: 'response', withCredentials: true});
  }
  // user-customer-address-controller POST
  public deleteUserCustomerAddress(data: number): Observable<any> {
    return this.http.post(`${this.url}/user/customerAddress/delete`, data, {observe: 'response', withCredentials: true});
  }
  // user-customer-address-controller POST
  public getAllUserCustomerAddress(customerID: number): Observable<any> {
    return this.http.post(`${this.url}/user/customerAddress/getAll`, customerID, {observe: 'response', withCredentials: true});
  }
  //  user-customer-address-controller POST
  public saveUserCustomerAddress(data: SaveUserCustomerAddress): Observable<any> {
    return this.http.post(`${this.url}/user/customerAddress/save`, data, {observe: 'response', withCredentials: true});
  }

  // user-customer-controller POST
  public deleteUserCustomer(data: number): Observable<any> {
    return this.http.post(`${this.url}/user/customer/delete`, data, {observe: 'response', withCredentials: true});
  }
  // user-customer-address-controller GET
  public getAllUserCustomer(): Observable<any> {
    return this.http.get(`${this.url}/user/customer/getAll`, {observe: 'response', withCredentials: true});
  }
  //  user-customer-address-controller POST
  public saveUserCustomer(data: SaveUserCustomer): Observable<any> {
    return this.http.post(`${this.url}/user/customer/save`, data, {observe: 'response', withCredentials: true});
  }

  // user-customer-contact-controller POST
  public deleteUserCustomerContact(data: GetUserCustomerContact): Observable<any> {
    return this.http.post(`${this.url}/user/customerContact/delete`, data, {observe: 'response', withCredentials: true});
  }
  // user-customer-contact-controller POST
  public getAllUserCustomerContact(customerAddressId: number): Observable<any> {
    return this.http.post(`${this.url}/user/customerContact/getAll`, customerAddressId, {observe: 'response', withCredentials: true});
  }
  //  user-customer-contact-controller POST
  public saveUserCustomerContact(data: SaveUserCustomerContact): Observable<any> {
    return this.http.post(`${this.url}/user/customerContact/save`, data, {observe: 'response', withCredentials: true});
  }

  public getUserInfo(): Observable<any> {
    return this.http.get(`${this.url}/user/userInfo`, {observe: 'response', withCredentials: true});
  }

  public updateUser(data: any): Observable<any> {
    return this.http.post(`${this.url}/user/updateUser`, data, {observe: 'response', withCredentials: true});
  }

  // New order
  public placeNewOrder(data: NewOrder): Observable<any> {
    return this.http.post(`${this.url}/user/order/addNew`, data, {observe: 'response', withCredentials: true});
  }

  // Get delivery schedule
  public getDeliveryCalendar(deliveryZoneId: string): Observable<any> {
    return this.http.get(`${this.url}/user/deliveryCalendar/get?deliverZoneId=${deliveryZoneId}`, {observe: 'response', withCredentials: true});
  }
}
