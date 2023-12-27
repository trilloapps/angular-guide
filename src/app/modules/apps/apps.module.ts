import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsRoutes } from './apps.routing.module';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { LineItemsComponent } from './line-items/line-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomersComponent,
    OrdersComponent,
    LineItemsComponent,
    ItemDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(AppsRoutes),
    NgbModule
  ]
})
export class AppsModule { }
