import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestapiService, UserInfo} from '../../restapi.service';

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

  constructor(private service: RestapiService) { }

  ngOnInit(): void {
    const userInfo: any = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
    this.commonForm.patchValue({
      userName: user.userName,
      userEmail: user.email,
      userPhone: user.phone
    });
  }

  updateCommon($event: any): void {
    const userInfo: any = sessionStorage.getItem('currentUser');
    let user: any;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }

    user.userName = this.commonForm.value.userName;
    user.email = this.commonForm.value.userEmail;
    user.phone = this.commonForm.value.userPhone;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    delete user.password;
    console.log(user);

    const data = {
      adminUserId: user.adminUserId,
      id: user.id,
      userName: user.userName as string,
      email: user.email as string,
      phone: user.phone as string
    }

    console.log('Data', data)

    this.service.updateUser(user).subscribe(response => {
      if (response.status === 200) {
        console.log('OK');
      }
    });
  }
}
