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
}

export interface Feedback {
  description: string;
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
    return this.http.post('http://localhost:8080/registration', data);
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
}
