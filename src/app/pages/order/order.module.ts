import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {OrderComponent} from './order.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule
  ]
})
export class OrderModule { }
