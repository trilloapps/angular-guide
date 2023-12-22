import { Component } from '@angular/core';

interface Orders {
  orderNo: string;
  title: string;
  description: string;
  bookingDate: any;
  deliveryTime: string;
  status: string;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders : Orders[] = [
    {orderNo: 'o-456', title: 'Smartphone', description: 'High-end mobile device', bookingDate: this.getRandomDate(), deliveryTime: '2 days', status: 'Pending'},
    {orderNo: 'o-457', title: 'Laptop', description: 'Powerful laptop for productivity', bookingDate: this.getRandomDate(), deliveryTime: '4 days', status: 'Delivered'},
    {orderNo: 'o-458', title: 'Smartwatch', description: 'Fitness and health tracking', bookingDate: this.getRandomDate(), deliveryTime: '1 day', status: 'Pending'},
    {orderNo: 'o-459', title: 'Headphones', description: 'Premium audio experience', bookingDate: this.getRandomDate(), deliveryTime: '3 days', status: 'In Transit'},
    {orderNo: 'o-460', title: 'Camera', description: 'High-resolution digital camera', bookingDate: this.getRandomDate(), deliveryTime: '5 days', status: 'Cancel'},
    {orderNo: 'o-461', title: 'Tablet', description: 'Portable computing device', bookingDate: this.getRandomDate(), deliveryTime: '2 days', status: 'In Transit'},
    {orderNo: 'o-462', title: 'Smart Speaker', description: 'Voice-controlled home assistant', bookingDate: this.getRandomDate(), deliveryTime: '3 days', status: 'In Transit'}
  ]
  searchInput: any;
  temp: Orders[] = [...this.orders];

  getStatusClass(item: any): string {
    switch (item.status) {
      case 'Delivered':
        return 'text-bg-success';
      case 'Cancel':
        return 'text-bg-danger';
      case 'In Transit':
        return 'text-bg-warning';
      default:
        return 'text-bg-secondary';
    }
  }

  searchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.orders = temp;

  }
  getRandomDate() {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 30); // Adjust the range as needed
    currentDate.setDate(currentDate.getDate() - randomDaysAgo);
    return currentDate.getTime();
}
}
