import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import { ContactsButtonsComponent } from './contacts-buttons/contacts-buttons.component';



@NgModule({
  declarations: [ContactsComponent, ContactsButtonsComponent],
  exports: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([ContactsButtonsComponent])
  ]
})
export class ContactsModule { }
