import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'd24';

  state: boolean;

  constructor(private router: Router) {
    this.state = false;
  }

  ngOnInit(): void {
    // On hashchange check if user have this item in the localStorage, true - full sidebar, false - basic
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('currentUser')) {
          this.state = true;
        } else {
          this.state = false;
        }
      }
    });
  }

  doLogout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
