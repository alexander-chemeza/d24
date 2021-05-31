import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {JournalComponent} from './journal.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';



@NgModule({
  declarations: [JournalComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    NgxQRCodeModule
  ]
})
export class JournalModule { }
