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

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) {
  }
  // user-controller GET
  public login(username: string, password: string): Observable<any> {
    // Headers that contains form fields data
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    // GET method to login, that returns an object {"name": "value", role: "value"}
    return this.http.get<User>('http://localhost:8080/login', {headers, responseType: 'json', withCredentials: true});
  }
  // user-controller POST
  public register(data: UserRegistration): Observable<any> {
    return this.http.post('http://localhost:8080/registration', data, {observe: 'response', withCredentials: true});
  }
  // user-controller POST
  public addManager(data: UserRegistration): Observable<any> {
    return this.http.post('http://localhost:8080/adminUser/addManager', data, {observe: 'response', withCredentials: true});
  }
  // user-controller GET
  public getAllManagers(): Observable<any> {
    return this.http.get('http://localhost:8080/adminUser/getAllManagers', {observe: 'response', withCredentials: true});
  }
  // user-controller GET
  public logout(): Observable<any> {
    return this.http.get('http://localhost:8080/logout', {withCredentials: true});
  }
  // delivery-type-controller GET
  public deliveryTypes(): Observable<any> {
    // const headers = new HttpHeaders({});
    // headers.append('Set-Cookies', 'JSESSIONID=<jsessionid>');
    // console.log(headers);
    return this.http.get('http://localhost:8080/user/deliveryType/getAll', {responseType: 'json', withCredentials: true});
  }
  // feedback-controller GET
  public feedback(data: Feedback): Observable<any> {
    return  this.http.post('http://localhost:8080/user/sendFeedback', data, {observe: 'response', withCredentials: true});
  }
  // user-contract-controller GET
  public contracts(): Observable<any> {
    return this.http.get('http://localhost:8080/user/contracts', {observe: 'response', withCredentials: true});
  }
  // address-controller GET
  public cities(): Observable<any> {
    return this.http.get('http://localhost:8080/user/address/getAllCities', {observe: 'response', withCredentials: true});
  }
  // address-controller POST
  public streets(data: Street): Observable<any> {
    return this.http.post('http://localhost:8080/user/address/getAllStreet', data, {observe: 'response', withCredentials: true});
  }
  // user-customer-address-controller POST
  public deleteUserCustomerAddress(data: GetUserCustomerAddress): Observable<any> {
    return this.http.post('http://localhost:8080/user/customerAddress/delete', data, {observe: 'response', withCredentials: true});
  }
  // user-customer-address-controller GET
  public getAllUserCustomerAddress(): Observable<any> {
    return this.http.get('http://localhost:8080/user/customerAddress/getAll', {observe: 'response', withCredentials: true});
  }
  //  user-customer-address-controller POST
  public saveUserCustomerAddress(data: SaveUserCustomerAddress): Observable<any> {
    return this.http.post('http://localhost:8080/user/customerAddress/save', data, {observe: 'response', withCredentials: true});
  }
}
