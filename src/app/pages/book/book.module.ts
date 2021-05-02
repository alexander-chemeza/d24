import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AddressModule} from './address/address.module';
import {ContactsModule} from './contacts/contacts.module';
import {ContragentsModule} from './contragents/contragents.module';
import {BookComponent} from './book.component';




@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressModule,
    ContactsModule,
    ContragentsModule
  ]
})
export class BookModule { }