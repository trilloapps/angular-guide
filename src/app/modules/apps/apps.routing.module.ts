import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { LineItemsComponent } from './line-items/line-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

export const IntroRoutes: Routes = [
  {
    path:'customers', component: CustomersComponent
  },

  {
    path:'orders', component: OrdersComponent
  },

  {
    path:'line-items', component: LineItemsComponent
  },
  {
    path:'item-details', component: ItemDetailsComponent
  },

];

