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
  noUser = false;
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

  doLogin(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.loginForm.value.userName !== null &&
        this.loginForm.value.userName !== '' &&
        this.loginForm.value.password !== null &&
        this.loginForm.value.password !== '') {
      this.incorrect = false;
      this.noUser = false;
      this.service.login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe(data => {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          if (!localStorage.getItem('defaultSender')) {
            localStorage.setItem('defaultSender', JSON.stringify(false));
          }
          if (!localStorage.getItem('defaultRecipient')) {
            localStorage.setItem('defaultRecipient', JSON.stringify(false));
          }
          if (!localStorage.getItem('journal')) {
            const journalDefault = [
              {
                "colId": "0",
                "width": 150,
                "hide": false,
                "pinned": "right",
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": 1
              },
              {
                "colId": "select",
                "width": 50,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": 1
              },
              {
                "colId": "number",
                "width": 124,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "status",
                "width": 117,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "orderDate",
                "width": 251,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "service",
                "width": 212,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "delivery",
                "width": 137,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "ttn",
                "width": 66,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "sender",
                "width": 139,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "recipient",
                "width": 116,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "place",
                "width": 169,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "amount",
                "width": 116,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "address1",
                "width": 175,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "date1",
                "width": 160,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "time11",
                "width": 179,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "time12",
                "width": 187,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "address2",
                "width": 183,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "date2",
                "width": 175,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "time21",
                "width": 199,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "time22",
                "width": 200,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              },
              {
                "colId": "author",
                "width": 161,
                "hide": false,
                "pinned": null,
                "sort": null,
                "sortIndex": null,
                "aggFunc": null,
                "rowGroup": false,
                "rowGroupIndex": null,
                "pivot": false,
                "pivotIndex": null,
                "flex": null
              }
            ];
            localStorage.setItem('journal', JSON.stringify(journalDefault));
          }
          this.router.navigate(['home']);
        }, error => {
          console.error(error);
          this.noUser = true;
      });
    } else {
      this.incorrect = true;
    }
  }
}
