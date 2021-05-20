import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// Login user data interface
export interface User {
  name: string;
  role: string;
}

// Registration user data interface
export interface UserRegistration {
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
}

export interface Feedback {
  description: string;
}

export interface Street {
  cityCode: string;
  regionCode: string;
}

export interface GetUserCustomerAddress {
  id: string;
}

export interface SaveUserCustomerAddress {
  building: string;
  cityId?: number;
  cityName: string;
  customerId?: number;
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
}

export interface GetUserCustomer {
  id: number;
}


interface SaveUserCustomer {
  customerName: string;
  customerType: string;
  id?: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
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
  public getAllManagers(): Observable<any> {
    return this.http.get(`${this.url}/adminUser/getAllManagers`, {observe: 'response', withCredentials: true});
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
  public deleteUserCustomerAddress(data: GetUserCustomerAddress): Observable<any> {
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
  public deleteUserCustomer(data: GetUserCustomer): Observable<any> {
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
}
