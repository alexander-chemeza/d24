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

  getPassCode(): void {
    console.log('sending');

    this.service.getPassCode(this.getPassCodeForm.value.login, this.getPassCodeForm.value.email).subscribe(response => {
      if(response.status === 200) {
        this.recover = !this.recover;
      }
    });
  }

  doRecover(): void {
    const data = {passCode: this.recoverForm.value.passCode, password: this.recoverForm.value.password};
    this.service.recover(data).subscribe(response => {
      if(response.status === 200) {
        this.router.navigate(['login']);
      }
    });
  }

}
