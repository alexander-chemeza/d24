import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecoverComponent} from './recover.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [RecoverComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RecoverModule { }
