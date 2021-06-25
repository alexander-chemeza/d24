import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {UsersComponent} from './users.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    AgGridModule.withComponents([])
  ]
})
export class UsersModule { }
