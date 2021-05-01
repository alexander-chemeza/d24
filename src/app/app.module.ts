import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { UsersComponent } from './pages/users/users.component';
import { InstructionComponent } from './pages/instruction/instruction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import {LoginModule} from './pages/login/login.module';
import {RecoverModule} from './pages/recover/recover.module';
import {RegisterModule} from './pages/register/register.module';
import {HomeModule} from './pages/home/home.module';
import {JournalModule} from './pages/journal/journal.module';
import {TemplateModule} from './pages/template/template.module';
import {BookModule} from './pages/book/book.module';
import {DocumentsModule} from './pages/documents/documents.module';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    UsersComponent,
    InstructionComponent,
    ProfileComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RecoverModule,
    RegisterModule,
    HomeModule,
    JournalModule,
    TemplateModule,
    BookModule,
    DocumentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
