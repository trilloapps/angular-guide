import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsermanagerRoutes } from './usermanager.routing.module';
import { UsersComponent } from './users/users.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    UsersComponent,
  ],
  providers: [DatePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(UsermanagerRoutes),
    NgbModule,
    NgbDropdownModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    AutocompleteLibModule,
    TooltipModule.forRoot(),
  ]
})
export class UsermanagerModule { }
