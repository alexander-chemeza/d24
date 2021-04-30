import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AddressModule} from './address/address.module';
import {ContactsModule} from './contacts/contacts.module';
import {ContragentsModule} from './contragents/contragents.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AddressModule,
    ContactsModule,
    ContragentsModule
  ]
})
export class BookModule { }
