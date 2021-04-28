import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// login user data interface
interface User {
  name: string;
  role: string;
}
// Object for registration of individual with agreement
export interface IndividualWithAgreement {
  passportNumber_IndividualWithAgreement: string;
  name_IndividualWithAgreement: string;
  email_IndividualWithAgreement: string;
  phone_IndividualWithAgreement: string;
  login_IndividualWithAgreement: string;
  password_IndividualWithAgreement: string;
}
// Object for registration of entity with agreement
export interface EntityWithAgreement {
  companyName_EntityWithAgreement: string;
  email_EntityWithAgreement: string;
  login_EntityWithAgreement: string;
  password_EntityWithAgreement: string;
  phone_EntityWithAgreement: string;
  unp_EntityWithAgreement: string;
  userName_EntityWithAgreement: string;
}
// Object for registration of individual without agreement
export interface IndividualWithoutAgreement {
  name_IndividualWithoutAgreement: string;
  documentType_IndividualWithoutAgreement: string;
  passportSeries_IndividualWithoutAgreement: string;
  passportNumber_IndividualWithoutAgreement: string;
  issueAddress_IndividualWithoutAgreement: string;
  issueDate_IndividualWithoutAgreement: string;
  personalNumber_IndividualWithoutAgreement: string;
  homeAddress_IndividualWithoutAgreement: string;
  phone_IndividualWithoutAgreement: string;
  email_IndividualWithoutAgreement: string;
  deliveryFrequency_IndividualWithoutAgreement: string;
  cargoDescription_IndividualWithoutAgreement: string;
}
// Object for registration of entity without agreement
export interface EntityWithoutAgreement {
  clientName_EntityWithoutAgreement: string;
  legalAddress_EntityWithoutAgreement: string;
  postAddress_EntityWithoutAgreement: string;
  unp_EntityWithoutAgreement: string;
  okpo_EntityWithoutAgreement: string;
  authorizedPerson_EntityWithoutAgreement: string;
  groundsForSigning_EntityWithoutAgreement: string;
  phone_EntityWithoutAgreement: string;
  email_EntityWithoutAgreement: string;
  bankName_EntityWithoutAgreement: string;
  bankAddress_EntityWithoutAgreement: string;
  bankCode_EntityWithoutAgreement: string;
  account_EntityWithoutAgreement: string;
  deliveryFrequency_EntityWithoutAgreement: string;
  cargoDescription_EntityWithoutAgreement: string;
  settlementPerson_EntityWithoutAgreement: string;
  settlementPersonEmail_EntityWithoutAgreement: string;
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
    return this.http.get<User>('http://localhost:8080/login', {headers, responseType: 'json'});
  }

  public register(data: IndividualWithAgreement |
                        EntityWithAgreement |
                        IndividualWithoutAgreement |
                        EntityWithoutAgreement): Observable<any> {
    return this.http.post('http://localhost:8080/registration', data);
  }
}
