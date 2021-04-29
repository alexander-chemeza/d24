import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../restapi.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  doLogin(): void {
    this.service.login(this.loginForm.value.userName as string, this.loginForm.value.password as string)
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
