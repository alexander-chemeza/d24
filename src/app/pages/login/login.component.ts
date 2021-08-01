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
  incorrect = false;
  loginForm: any;

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ])
    });

    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  doLogin(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.service.login(this.loginForm.value.userName as string, this.loginForm.value.password as string)
      .subscribe(data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['home']);
      }, error => {
        if (error.status === 401) {
          console.log('401');
          this.incorrect = true;
        }
      });
    if (!localStorage.getItem('defaultSender')) {
      localStorage.setItem('defaultSender', JSON.stringify(false));
    }
    if (!localStorage.getItem('defaultRecipient')) {
      localStorage.setItem('defaultRecipient', JSON.stringify(false));
    }
  }

  get userName(): any {
    return this.loginForm.get('userName');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  togglePasswordType(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const passwordField: any = document.getElementById('password');
    const type = passwordField.getAttribute('type');
    if (type === 'password') {
      event.target.classList.remove('pswd-hide');
      event.target.classList.add('pswd-show');
      passwordField.setAttribute('type', 'text');
    } else {
      event.target.classList.add('pswd-hide');
      event.target.classList.remove('pswd-show');
      passwordField.setAttribute('type', 'password');
    }
  }

}
