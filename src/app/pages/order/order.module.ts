import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {OrderComponent} from './order.component';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule
  ]
})
export class OrderModule { }
