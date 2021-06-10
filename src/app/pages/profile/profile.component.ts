import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfo} from '../../restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  commonForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ]),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    userPhone: new FormControl('', [
      Validators.required
    ])
  });

  constructor() { }

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(user);
    }

    if (user.userName && user.userEmail) {
      this.commonForm.patchValue({
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone
      });
    }
  }

}
