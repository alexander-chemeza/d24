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
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { JournalOnlyCopyComponent } from './journal-only-copy/journal-only-copy.component';



@NgModule({
  declarations: [JournalComponent, JournalButtonsComponent, JournalOnlyCopyComponent],
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
    QRCodeModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class JournalModule { }
