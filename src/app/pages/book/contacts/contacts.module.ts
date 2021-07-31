import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import { ContactsButtonsComponent } from './contacts-buttons/contacts-buttons.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../../AuthInterceptor';



@NgModule({
  declarations: [ContactsComponent, ContactsButtonsComponent],
  exports: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([ContactsButtonsComponent])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class ContactsModule { }
