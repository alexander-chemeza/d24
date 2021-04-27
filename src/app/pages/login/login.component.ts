import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../restapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private service: RestapiService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  doLogin(): void {
    this.service.login(this.username, this.password)
      .subscribe(data => {
        if (data) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.router.navigate(['home']);
        } else {
          alert('No such user or invalid password');
        }
      });
  }

}
