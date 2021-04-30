import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {AddressComponent} from './address.component';



@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([])
  ]
})
export class AddressModule { }
