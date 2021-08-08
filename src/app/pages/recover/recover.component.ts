import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../restapi.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  recover = false;
  incorrect = false;
  noUser = false;

  getPassCodeForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  recoverForm = new FormGroup({
    passCode: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
  }

  get login(): any {
    return this.getPassCodeForm.get('login');
  }

  get email(): any {
    return this.getPassCodeForm.get('email');
  }

  get password(): any {
    return this.recoverForm.get('password');
  }

  get passCode(): any {
    return this.recoverForm.get('passCode');
  }

  getPassCode(): void {
    if (this.getPassCodeForm.value.login && this.getPassCodeForm.value.email) {
      this.incorrect = false;
      this.noUser = false;
      this.service.getPassCode(this.getPassCodeForm.value.login, this.getPassCodeForm.value.email).subscribe(response => {
        if (response.status === 200) {
          this.recover = !this.recover;
        }
      }, error => {
        console.log(error);
        this.noUser = true;
      });
    } else {
      this.incorrect = true;
    }
  }

  doRecover(): void {
    if (this.recoverForm.value.passCode && this.recoverForm.value.password) {
      this.incorrect = false;
      const data = {passCode: this.recoverForm.value.passCode, password: this.recoverForm.value.password};
      this.service.recover(data).subscribe(response => {
        if (response.status === 200) {
          this.showModal('user-updated');
          setTimeout(() => {
            this.hideModal('user-updated');
            this.router.navigate(['login']);
          }, 3000);
        }
      });
    } else {
      this.incorrect = true;
    }
  }

  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }
}
