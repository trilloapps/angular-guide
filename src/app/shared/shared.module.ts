import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports:[ HeaderComponent,AlertComponent,LoaderComponent ]
})
export class SharedModule { }
