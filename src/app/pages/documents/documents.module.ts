import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {DocumentsComponent} from './documents.component';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([])
  ]
})
export class DocumentsModule { }
