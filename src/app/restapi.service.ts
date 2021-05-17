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

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<any> {
    // Headers that contains form fields data
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    // GET method to login, that returns an object {"name": "value", role: "value"}
    return this.http.get<User>('http://localhost:8080/login', {headers, responseType: 'json', withCredentials: true});
  }

  public register(data: UserRegistration): Observable<any> {
    return this.http.post('http://localhost:8080/registration', data, {observe: 'response', withCredentials: true});
  }

  public addManager(data: UserRegistration): Observable<any> {
    return this.http.post('http://localhost:8080/adminUser/addManager', data, {observe: 'response', withCredentials: true});
  }

  public deliveryTypes(): Observable<any> {
    // const headers = new HttpHeaders({});
    // headers.append('Set-Cookies', 'JSESSIONID=<jsessionid>');
    // console.log(headers);
    return this.http.get('http://localhost:8080/user/deliveryType/getAll', {responseType: 'json', withCredentials: true});
  }

  public logout(): Observable<any> {
    return this.http.get('http://localhost:8080/logout', {withCredentials: true});
  }

  public feedback(data: Feedback): Observable<any> {
    return  this.http.post('http://localhost:8080/user/sendFeedback', data, {observe: 'response', withCredentials: true});
  }

  public contracts(): Observable<any> {
    return this.http.get('http://localhost:8080/user/contracts', {observe: 'response', withCredentials: true});
  }
  // Redundant
  public address(): Observable<any> {
    return this.http.get('http://localhost:8080/user/address/getAddressList', {observe: 'response', withCredentials: true});
  }
  // Address controller cities
  public cities(): Observable<any> {
    return this.http.get('http://localhost:8080/user/address/getAllCities', {observe: 'response', withCredentials: true});
  }
  // Address controller streets
  public streets(data: Street): Observable<any> {
    return this.http.post('http://localhost:8080/user/address/getAllStreet', data, {observe: 'response', withCredentials: true});
  }
}
