import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {TemplateComponent} from './template.component';
import {MatSelectModule} from '@angular/material/select';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    MatSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class TemplateModule { }
