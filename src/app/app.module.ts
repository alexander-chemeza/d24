import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { BookComponent } from './pages/book/book.component';
import { UsersComponent } from './pages/users/users.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { InstructionComponent } from './pages/instruction/instruction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import {LoginModule} from './pages/login/login.module';
import {RecoverModule} from './pages/recover/recover.module';
import {RegisterModule} from './pages/register/register.module';
import {HomeModule} from './pages/home/home.module';
import {JournalModule} from './pages/journal/journal.module';
import {TemplateModule} from './pages/template/template.module';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    BookComponent,
    UsersComponent,
    DocumentsComponent,
    InstructionComponent,
    ProfileComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RecoverModule,
    RegisterModule,
    HomeModule,
    JournalModule,
    TemplateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
