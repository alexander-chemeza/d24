import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {HomeComponent} from './home.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class HomeModule { }
