import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports:[ HeaderComponent ]
})
export class SharedModule { }
