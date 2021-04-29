import { Component, OnInit } from '@angular/core';
import {
  // EntityWithAgreement,
  // EntityWithoutAgreement,
  // IndividualWithAgreement,
  // IndividualWithoutAgreement,
  RestapiService, UserRegistration
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
        // companyName: this.companyNameEntityWithAgreement,
        // email: this.emailEntityWithAgreement,
        // login: this.loginEntityWithAgreement,
        // password: this.passwordEntityWithAgreement,
        // phone: this.phoneEntityWithAgreement,
        // unp: this.unpEntityWithAgreement,
        // userName: this.userNameEntityWithAgreement

        // passportNumber: '',
        userName: this.userNameEntityWithAgreement,
        email: this.emailEntityWithAgreement,
        phone: this.phoneEntityWithAgreement,
        login: this.loginEntityWithAgreement,
        password: this.passwordEntityWithAgreement,
        companyName: this.companyNameEntityWithAgreement,
        unp: this.unpEntityWithAgreement,
        // documentType: '',
        // passportSeries: '',
        // issueAddress: '',
        // issueDate: '',
        // personalNumber: '',
        // homeAddress: '',
        // deliveryFrequency: '',
        // cargoDescription: '',
        // clientName: '',
        // legalAddress: '',
        // postAddress: '',
        // okpo: '',
        // authorizedPerson: '',
        // groundsForSigning: '',
        // bankName: '',
        // bankAddress: '',
        // bankCode: '',
        // account: '',
        // settlementPerson: '',
        // settlementPersonEmail: ''
      };
    } else if (this.agreement && !this.personWithoutAgreement) {
      data = {
        // clientName_EntityWithoutAgreement: this.clientNameEntityWithoutAgreement,
        // legalAddress_EntityWithoutAgreement: this.legalAddressEntityWithoutAgreement,
        // postAddress_EntityWithoutAgreement: this.postAddressEntityWithoutAgreement,
        // unp_EntityWithoutAgreement: this.unpEntityWithoutAgreement,
        // okpo_EntityWithoutAgreement: this.okpoEntityWithoutAgreement,
        // authorizedPerson_EntityWithoutAgreement: this.authorizedPersonEntityWithoutAgreement,
        // groundsForSigning_EntityWithoutAgreement: this.groundsForSigningEntityWithoutAgreement,
        // phone_EntityWithoutAgreement: this.phoneEntityWithoutAgreement,
        // email_EntityWithoutAgreement: this.emailEntityWithoutAgreement,
        // bankName_EntityWithoutAgreement: this.bankAddressEntityWithoutAgreement,
        // bankAddress_EntityWithoutAgreement: this.bankAddressEntityWithoutAgreement,
        // bankCode_EntityWithoutAgreement: this.bankCodeEntityWithoutAgreement,
        // account_EntityWithoutAgreement: this.accountEntityWithoutAgreement,
        // deliveryFrequency_EntityWithoutAgreement: this.deliveryFrequencyEntityWithoutAgreement,
        // cargoDescription_EntityWithoutAgreement: this.cargoDescriptionEntityWithoutAgreement,
        // settlementPerson_EntityWithoutAgreement: this.settlementPersonEntityWithoutAgreement,
        // settlementPersonEmail_EntityWithoutAgreement: this.settlementPersonEmailEntityWithoutAgreement

        // passportNumber: '',
        // userName: '',
        email: this.emailEntityWithoutAgreement,
        phone: this.phoneEntityWithoutAgreement,
        // login: '',
        // password: '',
        // companyName: '',
        unp: this.unpEntityWithoutAgreement,
        // documentType: '',
        // passportSeries: '',
        // issueAddress: '',
        // issueDate: '',
        // personalNumber: '',
        // homeAddress: '',
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
        // passportNumber_IndividualWithAgreement: this.passportNumberIndividualWithAgreement,
        // name_IndividualWithAgreement: this.nameIndividualWithAgreement,
        // email_IndividualWithAgreement: this.emailIndividualWithAgreement,
        // phone_IndividualWithAgreement: this.phoneIndividualWithAgreement,
        // login_IndividualWithAgreement: this.loginIndividualWithAgreement,
        // password_IndividualWithAgreement: this.passwordIndividualWithAgreement

        passportNumber: this.passportNumberIndividualWithAgreement,
        userName: this.nameIndividualWithAgreement,
        email: this.emailIndividualWithAgreement,
        phone: this.phoneIndividualWithAgreement,
        login: this.loginIndividualWithAgreement,
        password: this.passwordIndividualWithAgreement,
        // companyName: '',
        // unp: '',
        // documentType: '',
        // passportSeries: '',
        // issueAddress: '',
        // issueDate: '',
        // personalNumber: '',
        // homeAddress: '',
        // deliveryFrequency: '',
        // cargoDescription: '',
        // clientName: '',
        // legalAddress: '',
        // postAddress: '',
        // okpo: '',
        // authorizedPerson: '',
        // groundsForSigning: '',
        // bankName: '',
        // bankAddress: '',
        // bankCode: '',
        // account: '',
        // settlementPerson: '',
        // settlementPersonEmail: '',
      };
    } else if (this.agreement && this.personWithoutAgreement) {
      data = {
        // name_IndividualWithoutAgreement: this.nameIndividualWithoutAgreement,
        // documentType_IndividualWithoutAgreement: this.documentTypeIndividualWithoutAgreement,
        // passportSeries_IndividualWithoutAgreement: this.passportSeriesIndividualWithoutAgreement,
        // passportNumber_IndividualWithoutAgreement: this.passportNumberIndividualWithoutAgreement,
        // issueAddress_IndividualWithoutAgreement: this.issueAddressIndividualWithoutAgreement,
        // issueDate_IndividualWithoutAgreement: this.issueDateIndividualWithoutAgreement,
        // personalNumber_IndividualWithoutAgreement: this.personalNumberIndividualWithoutAgreement,
        // homeAddress_IndividualWithoutAgreement: this.homeAddressIndividualWithoutAgreement,
        // phone_IndividualWithoutAgreement: this.phoneIndividualWithoutAgreement,
        // email_IndividualWithoutAgreement: this.emailIndividualWithoutAgreement,
        // deliveryFrequency_IndividualWithoutAgreement: this.deliveryFrequencyIndividualWithoutAgreement,
        // cargoDescription_IndividualWithoutAgreement: this.cargoDescriptionIndividualWithoutAgreement

        passportNumber: this.passportNumberIndividualWithoutAgreement,
        userName: this.nameIndividualWithoutAgreement,
        email: this.emailIndividualWithoutAgreement,
        phone: this.phoneIndividualWithoutAgreement,
        // login: '',
        // password: '',
        // companyName: '',
        // unp: '',
        documentType: this.documentTypeIndividualWithoutAgreement,
        passportSeries: this.passportSeriesIndividualWithoutAgreement,
        issueAddress: this.issueAddressIndividualWithoutAgreement,
        issueDate: this.issueDateIndividualWithoutAgreement,
        personalNumber: this.personalNumberIndividualWithoutAgreement,
        homeAddress: this.homeAddressIndividualWithoutAgreement,
        deliveryFrequency: this.deliveryFrequencyIndividualWithoutAgreement,
        cargoDescription: this.cargoDescriptionIndividualWithoutAgreement,
        // clientName: '',
        // legalAddress: '',
        // postAddress: '',
        // okpo: '',
        // authorizedPerson: '',
        // groundsForSigning: '',
        // bankName: '',
        // bankAddress: '',
        // bankCode: '',
        // account: '',
        // settlementPerson: '',
        // settlementPersonEmail: ''
      };
    }
    console.log(data); // Вот вывод в консоль идет
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
