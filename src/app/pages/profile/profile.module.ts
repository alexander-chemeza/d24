import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../AuthInterceptor';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class ProfileModule { }
