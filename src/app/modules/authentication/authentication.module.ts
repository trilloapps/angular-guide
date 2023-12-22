import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
  ]
})
export class AuthenticationModule { }
