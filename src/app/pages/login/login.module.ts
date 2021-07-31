import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {SharedModule} from '../../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class LoginModule { }
