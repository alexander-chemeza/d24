import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContragentsComponent} from './contragents.component';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import { ContragentButtonsComponent } from './contragent-buttons/contragent-buttons.component';



@NgModule({
  declarations: [ContragentsComponent, ContragentButtonsComponent],
  exports: [ContragentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([ContragentButtonsComponent])
  ]
})
export class ContragentsModule { }
