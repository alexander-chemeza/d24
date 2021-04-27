import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RecoverComponent} from './pages/recover/recover.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {CalculatorComponent} from './pages/calculator/calculator.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'recover', component: RecoverComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
