import { Component, OnInit } from '@angular/core';
import {
  RestapiService,
  UserRegistration
} from '../../restapi.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  entityUserWithAgreementForm: any;
  entityUserWithoutAgreementForm: any;
  individualUserWithAgreementForm: any;
  individualUserWithoutAgreementForm: any;

  passwordEquality = false;

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    // Entity User With Agreement Form Group Fields
    this.entityUserWithAgreementForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      unp: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required
      ])
    });
    // Entity User Without Agreement Form Group Fields
    this.entityUserWithoutAgreementForm = new FormGroup({
      clientName: new FormControl('', [
        Validators.required
      ]),
      legalAddress: new FormControl('', [
        Validators.required
      ]),
      postAddress: new FormControl('', [
        Validators.required
      ]),
      unp: new FormControl('', [
        Validators.required
      ]),
      okpo: new FormControl('', [
        Validators.required
      ]),
      authorizedPerson: new FormControl('', [
        Validators.required
      ]),
      groundsForSigning: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      bankName: new FormControl('', [
        Validators.required
      ]),
      bankAddress: new FormControl('', [
        Validators.required
      ]),
      bankCode: new FormControl('', [
        Validators.required
      ]),
      account: new FormControl('', [
        Validators.required
      ]),
      deliveryFrequency: new FormControl('', [
        Validators.required
      ]),
      cargoDescription: new FormControl('', [
        Validators.required
      ]),
      settlementPerson: new FormControl('', [
        Validators.required
      ]),
      settlementPersonEmail: new FormControl('', [
        Validators.required
      ]),
    });
    // Individual User With Agreement Form Group Fields
    this.individualUserWithAgreementForm = new FormGroup({
      passportNumber: new FormControl('', [
        Validators.required
      ]),
      userName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      login: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required
      ])
    });
    // Individual User Without Agreement Form Group Fields
    this.individualUserWithoutAgreementForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required
      ]),
      documentType: new FormControl('', [
        Validators.required
      ]),
      passportSeries: new FormControl('', [
        Validators.required
      ]),
      passportNumber: new FormControl('', [
        Validators.required
      ]),
      issueAddress: new FormControl('', [
        Validators.required
      ]),
      issueDate: new FormControl('', [
        Validators.required
      ]),
      personalNumber: new FormControl('', [
        Validators.required
      ]),
      homeAddress: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      deliveryFrequency: new FormControl('', [
        Validators.required
      ]),
      cargoDescription: new FormControl('', [
        Validators.required
      ])
    });
  }

  showModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  }

  hideModal(id: string): void {
    const modal: any = document.getElementById(id);
    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');
  }

  doRegistration(): void {
    let data: UserRegistration = {} as any;
    const passwordRepeat: string = this.entityUserWithAgreementForm.value.passwordRepeat;
    const items: any = document.getElementsByClassName('entity-with-agreement-control');
    console.log('Password repeat', passwordRepeat);
    if (!this.agreement && !this.personWithAgreement) {
      data = {
        userName: this.entityUserWithAgreementForm.value.userName as string,
        email: this.entityUserWithAgreementForm.value.email as string,
        phone: this.entityUserWithAgreementForm.value.phone as string,
        login: this.entityUserWithAgreementForm.value.login as string,
        password: this.entityUserWithAgreementForm.value.password as string,
        companyName: this.entityUserWithAgreementForm.value.companyName as string,
        unp: this.entityUserWithAgreementForm.value.unp as string,
        userType: 'Юр.лицо'
      };

      const ok = !Object.values(data).every(o => o === null && o === '');

      this.passwordEquality = data.password !== passwordRepeat;

      if (this.entityUserWithAgreementForm.valid && !this.passwordEquality && ok) {
        if (data.unp) {
          this.service.checkUNP(data.unp).subscribe(response => {
            if (response.status === 200) {
              if (response.body === true) {
                this.service.register(data)
                  .subscribe(r => {
                    if (r.status === 200) {
                      if (r.body === 0) {
                        for (const item of items) {
                          item.classList.remove('alert-input');
                        }
                        this.showModal('user-updated');
                        setTimeout(() => {
                          this.hideModal('user-updated');
                          this.router.navigate(['login']);
                        }, 3000);
                      } else {
                        this.showModal('user-forbidden');
                        setTimeout(() => {
                          this.hideModal('user-forbidden');
                        }, 3000);
                      }
                    }
                  });
              } else {
                this.showModal('user-wait-agreement');
              }
            }
          });
        }
      } else {
        for (const item of items) {
          if (item.value === '') {
            item.classList.add('alert-input');
          }
        }
      }
    } else if (this.agreement && !this.personWithoutAgreement) {
      data = {
        email: this.entityUserWithoutAgreementForm.value.email as string,
        phone: this.entityUserWithoutAgreementForm.value.phone as string,
        unp: this.entityUserWithoutAgreementForm.value.unp as string,
        deliveryFrequency: this.entityUserWithoutAgreementForm.value.deliveryFrequency as string,
        cargoDescription: this.entityUserWithoutAgreementForm.value.cargoDescription as string,
        clientName: this.entityUserWithoutAgreementForm.value.clientName as string,
        legalAddress: this.entityUserWithoutAgreementForm.value.legalAddress as string,
        postAddress: this.entityUserWithoutAgreementForm.value.postAddress as string,
        okpo: this.entityUserWithoutAgreementForm.value.okpo as string,
        authorizedPerson: this.entityUserWithoutAgreementForm.value.authorizedPerson as string,
        groundsForSigning: this.entityUserWithoutAgreementForm.value.groundsForSigning as string,
        bankName: this.entityUserWithoutAgreementForm.value.bankName as string,
        bankAddress: this.entityUserWithoutAgreementForm.value.bankAddress as string,
        bankCode: this.entityUserWithoutAgreementForm.value.bankCode as string,
        account: this.entityUserWithoutAgreementForm.value.account as string,
        settlementPerson: this.entityUserWithoutAgreementForm.value.settlementPerson as string,
        settlementPersonEmail: this.entityUserWithoutAgreementForm.value.settlementPersonEmail as string,
        userType: 'Юр.лицо'
      };

      if (this.entityUserWithoutAgreementForm.valid) {
        console.log(data);
        // RestAPI service usage
      }
    } else if (!this.agreement && this.personWithAgreement) {
      data = {
        passportNumber: this.individualUserWithAgreementForm.value.passportNumber as string,
        userName: this.individualUserWithAgreementForm.value.userName as string,
        email: this.individualUserWithAgreementForm.value.email as string,
        phone: this.individualUserWithAgreementForm.value.phone as string,
        login: this.individualUserWithAgreementForm.value.login as string,
        password: this.individualUserWithAgreementForm.value.password as string,
        userType: 'Физ.лицо'
      };

      if (this.individualUserWithAgreementForm.valid) {
        console.log(data);
        // RestAPI service usage
      }
    } else if (this.agreement && this.personWithoutAgreement) {
      data = {
        passportNumber: this.individualUserWithoutAgreementForm.value.passportNumber,
        userName: this.individualUserWithoutAgreementForm.value.userName,
        email: this.individualUserWithoutAgreementForm.value.email,
        phone: this.individualUserWithoutAgreementForm.value.phone,
        documentType: this.individualUserWithoutAgreementForm.value.documentType,
        passportSeries: this.individualUserWithoutAgreementForm.value.passportSeries,
        issueAddress: this.individualUserWithoutAgreementForm.value.issueAddress,
        issueDate: this.individualUserWithoutAgreementForm.value.issueDate,
        personalNumber: this.individualUserWithoutAgreementForm.value.personalNumber,
        homeAddress: this.individualUserWithoutAgreementForm.value.homeAddress,
        deliveryFrequency: this.individualUserWithoutAgreementForm.value.deliveryFrequency,
        cargoDescription: this.individualUserWithoutAgreementForm.value.cargoDescription,
        userType: 'Физ.лицо'
      };

      if (this.individualUserWithoutAgreementForm.valid) {
        console.log(data);
        // RestAPI service usage
      }
    }
  }

  toggleWithAgreement(): void {
    this.personWithAgreement = !this.personWithAgreement;
  }

  toggleWithoutAgreement(): void {
    this.personWithoutAgreement = !this.personWithoutAgreement;
  }

  keyPress(event: any): void {
    const pattern = /[0-9+\- ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
