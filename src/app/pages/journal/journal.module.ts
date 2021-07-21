import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {JournalComponent} from './journal.component';
import { JournalButtonsComponent } from './journal-buttons/journal-buttons.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {QRCodeModule} from 'angularx-qrcode';



@NgModule({
  declarations: [JournalComponent, JournalButtonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([JournalButtonsComponent]),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    QRCodeModule
  ]
})
export class JournalModule { }
