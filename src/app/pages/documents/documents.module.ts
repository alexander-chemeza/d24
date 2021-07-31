import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {DocumentsComponent} from './documents.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class DocumentsModule { }
