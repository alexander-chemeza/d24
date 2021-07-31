import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Feedback, RestapiService} from './restapi.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'd24';

  state: boolean;

  feedbackForm: any;

  constructor(private router: Router, private service: RestapiService) {
    this.state = false;
  }

  ngOnInit(): void {
    // On hashchange check if user have this item in the sessionStorage, true - full sidebar, false - basic
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (sessionStorage.getItem('currentUser')) {
          this.state = true;
        } else {
          this.state = false;
        }
      }
    });

    this.feedbackForm = new FormGroup({
      description: new FormControl('', [
        Validators.required
      ])
    });
  }

  doLogout(): void {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['login']);
    this.service.logout().subscribe(data => {
      return;
    });
    this.hideModal('ask-if-logout');
  }

  showModal(event: any, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }

  sendFeedback(): void {
    const data: Feedback = {
      description: this.feedbackForm.value.description as string
    };
    this.service.feedback(data).subscribe(response => {
      if (response.status === 200) {
        this.feedbackForm.setValue({description: ''});
      }
    });
    this.hideModal('to-be-better');
  }
}
