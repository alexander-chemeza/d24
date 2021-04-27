import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RecoverComponent} from './pages/recover/recover.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {CalculatorComponent} from './pages/calculator/calculator.component';
import {OrderComponent} from './pages/order/order.component';
import {JournalComponent} from './pages/journal/journal.component';
import {TemplateComponent} from './pages/template/template.component';
import {BookComponent} from './pages/book/book.component';
import {UsersComponent} from './pages/users/users.component';
import {DocumentsComponent} from './pages/documents/documents.component';
import {InstructionComponent} from './pages/instruction/instruction.component';
import {ProfileComponent} from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'recover', component: RecoverComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'home', component: HomeComponent},
  {path: 'order', component: OrderComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'template', component: TemplateComponent},
  {path: 'book', component: BookComponent},
  {path: 'users', component: UsersComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'instruction', component: InstructionComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
