import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {UsersComponent} from './users.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class UsersModule { }
