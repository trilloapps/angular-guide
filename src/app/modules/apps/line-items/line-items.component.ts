import { Component, OnDestroy, OnInit } from '@angular/core';
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

  items : Items[] = []
  searchInput: any;
  size = 10
  start = 1;
  temp: Items[]=[...this.items];
  customerId: any;
  orderId: any;
  constructor(private dataService: DataService, private route: ActivatedRoute,private router :Router ) { }
  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParams['orderId'];
    this.customerId = this.route.snapshot.queryParams['customerId'];
     if(orderId) this.GetItemLists(this.start, this.size, orderId);
  }
  GetItemLists(start: number, size: number, orderId: string) {
    let body = {
      orderId: orderId,
      start: 1,
      size: 20000,
    }
    this.dataService.GetItemList(body).subscribe({
      next: (result: any) => {
        console.log("error")
        if (result.status === "success") {
          this.items = result.data.items;
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
  // constructor(private router : Router){}
  searchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.itemName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.items = temp;

  }
  navigateToDetails(item)
  {
    this.router.navigate(['/app/item-details'],  {
      queryParams: { itemId: item.id, customerId: this.customerId, orderId: this.orderId},
    });
  }
  backToOrders()
  {
    this.router.navigate(['/app/orders'],  {
      queryParams: { customerId: this.customerId },
    });
  }
}
