import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HomeComponent } from './pages/home/home.component';
import { JournalComponent } from './pages/journal/journal.component';
import { TemplateComponent } from './pages/template/template.component';
import { BookComponent } from './pages/book/book.component';
import { UsersComponent } from './pages/users/users.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { InstructionComponent } from './pages/instruction/instruction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import {LoginModule} from './pages/login/login.module';
import {RecoverModule} from './pages/recover/recover.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CalculatorComponent,
    HomeComponent,
    JournalComponent,
    TemplateComponent,
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
    RecoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
