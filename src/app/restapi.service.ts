import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// login user data interface
interface User {
  name: string;
  role: string;
}

// Registration of entity with agreement
export interface EntityWithAgreement {
  companyName: string;
  email: string;
  login: string;
  password: string;
  phone: string;
  unp: string;
  userName: string;
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
    return this.http.get<User>('http://localhost:8080/user/getUserInfo', {headers, responseType: 'json'});
  }

  public registerEntityWithAgreement(data: EntityWithAgreement): Observable<any> {
    return this.http.post('http://localhost:8080/registration', data);
  }
}
