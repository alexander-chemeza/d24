import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AddressModule} from './address/address.module';
import {ContactsModule} from './contacts/contacts.module';
import {ContragentsModule} from './contragents/contragents.module';
import {BookComponent} from './book.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgxMaskModule} from 'ngx-mask';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';




@NgModule({
  declarations: [BookComponent],
  exports: [BookComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressModule,
    ContactsModule,
    ContragentsModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    NgxMaskModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class BookModule { }
