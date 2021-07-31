import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecoverComponent} from './recover.component';
import {SharedModule} from '../../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [RecoverComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class RecoverModule { }
