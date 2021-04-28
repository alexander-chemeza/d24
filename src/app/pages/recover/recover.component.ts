import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../restapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  login: string;
  email: string;

  constructor(private service: RestapiService, private router: Router) {
    this.login = '';
    this.email = '';
  }

  ngOnInit(): void {
  }

  doRecover(): void {
    console.log('recover');
  }

}
