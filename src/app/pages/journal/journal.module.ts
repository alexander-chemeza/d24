import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {JournalComponent} from './journal.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { JournalButtonsComponent } from './journal-buttons/journal-buttons.component';



@NgModule({
  declarations: [JournalComponent, JournalButtonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([JournalButtonsComponent]),
    NgxQRCodeModule
  ]
})
export class JournalModule { }
