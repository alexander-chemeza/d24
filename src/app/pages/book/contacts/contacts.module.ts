import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([])
  ]
})
export class ContactsModule { }
