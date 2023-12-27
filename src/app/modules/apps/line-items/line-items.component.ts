import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface Items {
  picture: string;
  itemName: string;
  itemDescription: string;
  itemCode: string;
  weight: string;
  quantity: string;
}
@Component({
  selector: 'app-line-items',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss']
})
export class LineItemsComponent implements OnInit {

  items: Items[] = []
  searchInput: any;
  size = 10
  start = 1;
  page = 1;
  pageSize = 10;
  totalSize: any;
  temp: Items[] = [...this.items];
  customerId: any;
  orderId: any;
  bLoader: boolean = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private DataService: DataService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParams['orderId'];
    this.customerId = this.route.snapshot.queryParams['customerId'];
    if (this.orderId) this.getItemLists(this.start, this.size, this.orderId);
  }


  //---------- GET LIST ITEMS ----------
  getItemLists(start: number, size: number, orderId: string) {
    this.bLoader= true;
    let body = {
      orderId: orderId,
      start: start,
      size: size,
    }
    this.dataService.GetItemList(body).subscribe({
      next: (result: any) => {
        console.log("error")
        if (result.status === "success") {
          this.items = result.data.items;
          this.totalSize = result.data.totalData
          this.bLoader = false
          this.temp = [...this.items]
        }

      },
      error: (error) => {
        console.error(" ERROR ==> ", error);
      },
      complete: () => { },
    }
    )
  }


  //---------- SEARCH FILTER ----------
  searchFilter(event: any) {
    this.searchInput = event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.itemName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.items = temp;

  }

  //---------- NAVIGATE TO DETAILS SCREEN ----------
  navigateToDetails(item) {
    this.router.navigate(['/app/item-details'], {
      queryParams: { itemId: item.id, customerId: this.customerId, orderId: this.orderId },
    });
  }


  //---------- BACK TO ORDERS SCREEN ----------
  backToOrders() {
    this.router.navigate(['/app/orders'], {
      queryParams: { customerId: this.customerId },
    });
  }


  //---------- PAGINATION ----------
  getPaginationFromServer(oIncomingEvent: any) {
    let incommingPage = oIncomingEvent;
    let start = (incommingPage - 1) * this.size + 1;
    this.getItemLists(start, this.size, this.customerId);
  }
}
