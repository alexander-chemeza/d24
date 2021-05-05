import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {TemplateComponent} from './template.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    MatSelectModule
  ]
})
export class TemplateModule { }
