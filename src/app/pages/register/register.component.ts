import { Component, OnInit } from '@angular/core';
import {
  RestapiService,
  UserRegistration
} from '../../restapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // Forms switching
  agreement = false;
  personWithAgreement = false;
  personWithoutAgreement = false;
  // Entity user with agreement options
  companyNameEntityWithAgreement = '';
  emailEntityWithAgreement = '';
  loginEntityWithAgreement = '';
  passwordEntityWithAgreement = '';
  phoneEntityWithAgreement = '';
  unpEntityWithAgreement = '';
  userNameEntityWithAgreement = '';
  // Entity user without agreement options
  clientNameEntityWithoutAgreement = '';
  legalAddressEntityWithoutAgreement = '';
  postAddressEntityWithoutAgreement = '';
  unpEntityWithoutAgreement = '';
  okpoEntityWithoutAgreement = '';
  authorizedPersonEntityWithoutAgreement = '';
  groundsForSigningEntityWithoutAgreement = '';
  phoneEntityWithoutAgreement = '';
  emailEntityWithoutAgreement = '';
  bankNameEntityWithoutAgreement = '';
  bankAddressEntityWithoutAgreement = '';
  bankCodeEntityWithoutAgreement = '';
  accountEntityWithoutAgreement = '';
  deliveryFrequencyEntityWithoutAgreement = '';
  cargoDescriptionEntityWithoutAgreement = '';
  settlementPersonEntityWithoutAgreement = '';
  settlementPersonEmailEntityWithoutAgreement = '';
  // Individual user with agreement options
  passportNumberIndividualWithAgreement = '';
  nameIndividualWithAgreement = '';
  emailIndividualWithAgreement = '';
  phoneIndividualWithAgreement = '';
  loginIndividualWithAgreement = '';
  passwordIndividualWithAgreement = '';
  // Individual user without agreement options
  nameIndividualWithoutAgreement = '';
  documentTypeIndividualWithoutAgreement = '';
  passportSeriesIndividualWithoutAgreement = '';
  passportNumberIndividualWithoutAgreement = '';
  issueAddressIndividualWithoutAgreement = '';
  issueDateIndividualWithoutAgreement = '';
  personalNumberIndividualWithoutAgreement = '';
  homeAddressIndividualWithoutAgreement = '';
  phoneIndividualWithoutAgreement = '';
  emailIndividualWithoutAgreement = '';
  deliveryFrequencyIndividualWithoutAgreement = '';
  cargoDescriptionIndividualWithoutAgreement = '';

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
  }

  doRegistration(): void {
    let data: UserRegistration = {} as any;
    if (!this.agreement && !this.personWithAgreement) {
      data = {
        userName: this.userNameEntityWithAgreement,
        email: this.emailEntityWithAgreement,
        phone: this.phoneEntityWithAgreement,
        login: this.loginEntityWithAgreement,
        password: this.passwordEntityWithAgreement,
        companyName: this.companyNameEntityWithAgreement,
        unp: this.unpEntityWithAgreement,
      };
    } else if (this.agreement && !this.personWithoutAgreement) {
      data = {
        email: this.emailEntityWithoutAgreement,
        phone: this.phoneEntityWithoutAgreement,
        unp: this.unpEntityWithoutAgreement,
        deliveryFrequency: this.accountEntityWithoutAgreement,
        cargoDescription: this.settlementPersonEmailEntityWithoutAgreement,
        clientName: this.clientNameEntityWithoutAgreement,
        legalAddress: this.legalAddressEntityWithoutAgreement,
        postAddress: this.postAddressEntityWithoutAgreement,
        okpo: this.okpoEntityWithoutAgreement,
        authorizedPerson: this.authorizedPersonEntityWithoutAgreement,
        groundsForSigning: this.groundsForSigningEntityWithoutAgreement,
        bankName: this.bankNameEntityWithoutAgreement,
        bankAddress: this.bankAddressEntityWithoutAgreement,
        bankCode: this.bankCodeEntityWithoutAgreement,
        account: this.accountEntityWithoutAgreement,
        settlementPerson: this.settlementPersonEntityWithoutAgreement,
        settlementPersonEmail: this.settlementPersonEmailEntityWithoutAgreement
      };
    } else if (!this.agreement && this.personWithAgreement) {
      data = {
        passportNumber: this.passportNumberIndividualWithAgreement,
        userName: this.nameIndividualWithAgreement,
        email: this.emailIndividualWithAgreement,
        phone: this.phoneIndividualWithAgreement,
        login: this.loginIndividualWithAgreement,
        password: this.passwordIndividualWithAgreement,
      };
    } else if (this.agreement && this.personWithoutAgreement) {
      data = {
        passportNumber: this.passportNumberIndividualWithoutAgreement,
        userName: this.nameIndividualWithoutAgreement,
        email: this.emailIndividualWithoutAgreement,
        phone: this.phoneIndividualWithoutAgreement,
        documentType: this.documentTypeIndividualWithoutAgreement,
        passportSeries: this.passportSeriesIndividualWithoutAgreement,
        issueAddress: this.issueAddressIndividualWithoutAgreement,
        issueDate: this.issueDateIndividualWithoutAgreement,
        personalNumber: this.personalNumberIndividualWithoutAgreement,
        homeAddress: this.homeAddressIndividualWithoutAgreement,
        deliveryFrequency: this.deliveryFrequencyIndividualWithoutAgreement,
        cargoDescription: this.cargoDescriptionIndividualWithoutAgreement,
      };
    }
    console.log(data);
    this.service.register(data)
      .subscribe(response => {
        console.log(response);
        if (response === 0) {
          this.router.navigate(['login']);
        }
      });
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
