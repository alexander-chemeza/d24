import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // Forms swithicng
  agreement: boolean;
  personWithAgreement: boolean;
  personWithoutAgreement: boolean;

  constructor() {
    // Forms switching
    this.agreement = false;
    this.personWithAgreement = false;
    this.personWithoutAgreement = false;
  }

  ngOnInit(): void {
  }

  toggleWithAgreement(event: any): void {
    const btns = document.getElementsByClassName('with-agreement-control-btn') as HTMLCollectionOf<HTMLLinkElement>;
    for (const btn of Array.from(btns)) {
      btn.disabled = false;
      btn.classList.remove('active-btn');
      btn.classList.add('white-btn');
    }
    event.target.classList.add('active-btn');
    event.target.disabled = true;
    this.personWithAgreement = !this.personWithAgreement;
  }

  toggleWithoutAgreement(event: any): void {
    const btns = document.getElementsByClassName('without-agreement-control-btn') as HTMLCollectionOf<HTMLLinkElement>;
    for (const btn of Array.from(btns)) {
      btn.disabled = false;
      btn.classList.remove('active-btn');
      btn.classList.add('white-btn');
    }
    event.target.classList.add('active-btn');
    event.target.disabled = true;
    this.personWithoutAgreement = !this.personWithoutAgreement;
  }
}
