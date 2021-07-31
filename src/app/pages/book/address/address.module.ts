import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {AddressComponent} from './address.component';
import { AddressButtonsComponent } from './address-buttons/address-buttons.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../../AuthInterceptor';



@NgModule({
  declarations: [AddressComponent, AddressButtonsComponent],
  exports: [AddressComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([AddressButtonsComponent])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AddressModule { }
