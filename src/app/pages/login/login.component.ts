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

  username: string;
  password: string;

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ])
  });

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
    this.username = this.loginForm.value.userName as string;
    this.password = this.loginForm.value.password as string;
    console.log(this.username);
    console.log(this.password);

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
