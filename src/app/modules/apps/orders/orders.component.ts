import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Orders {
  orderNo: string;
  title: string;
  description: string;
  bookingDateTime: any;
  deliverDateTime: string;
  status: string;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = []
  searchInput: any;
  size = 10
  start = 1;
  totalSize: number;
  page = 1;
  pageSize = 10;
  temp: Orders[] = [...this.orders];
  customerId: any;
  bLoader: boolean = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.customerId = this.route.snapshot.queryParams['customerId'];
    if (this.customerId) this.getOderLists(this.start, this.size, this.customerId);
  }


  //---------- GET ORDERS LIST ----------
  getOderLists(start: number, size: number, customerId: string) {
    this.bLoader = true;
    let body = {
      customerId: customerId,
      start: start,
      size: size,
    }
    this.dataService.GetOderList(body).subscribe({
      next: (result: any) => {
        console.log("error")
        if (result.status === "success") {
          this.orders = result.data.orders;
          this.totalSize = result.data.totalData;
          this.bLoader = false;
          this.temp = [...this.orders]
        }
      },
      error: (error) => {
        console.error(" ERROR ==> ", error);
      },
      complete: () => { },
    }
    )
  }


  //---------- GET STATUS CLASS ----------
  getStatusClass(item: any): string {
    switch (item.status) {
      case 'delivered':
        return 'text-bg-success';
      case 'Cancel':
        return 'text-bg-danger';
        case 'processing':
        return 'text-bg-warning';
      case 'shipped':
        return 'text-bg-info';
      default:
        return 'text-bg-secondary';
    }
  }


  //---------- SEARCH FILTER ----------
  searchFilter(event: any) {
    this.searchInput = event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.orders = temp;
  }


  //---------- NAVIGATE TO LINE ITEMS ----------
  navigatetoitem(item) {
    this.router.navigate(['/app/line-items'], {
      queryParams: { orderId: item.id, customerId: this.customerId },
    });
  }


  //---------- PAGINATION ----------
  getPaginationFromServer(oIncomingEvent: any) {
    let incommingPage = oIncomingEvent;
    let start = (incommingPage - 1) * this.size + 1;
    this.getOderLists(start, this.size, this.customerId);

  }
}
