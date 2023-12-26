import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit{
  items: any;
  details: any;
  customerId: any;
  orderId: any;
  quantity: any;
 constructor(private modalService: NgbModal, private dataService: DataService, private route: ActivatedRoute,private router :Router){  
 }
 ngOnInit(): void {
  this.orderId = this.route.snapshot.queryParams['orderId'];
  this.customerId = this.route.snapshot.queryParams['customerId'];
  this.items = this.route.snapshot.queryParams['items'];

  const itemId= this.route.snapshot.queryParams['itemId']
   if(itemId) this.GetItemListDetails(itemId);
}
GetItemListDetails( itemId) {
  let body = {
    itemId: itemId,
  }
  this.dataService.GetItemDetail(body).subscribe({
    next: (result: any) => {
      console.log("error")
      if (result.status === "success") {
        this.items = result.data
      }

  },
  error: (error) => {
    console.error(" ERROR ==> ", error);
  },
  complete: () => { },
  }
)
}
  open(content:any){
    this.modalService.open(content, {centered:true})
  }
  backtoitems() {
    this.router.navigate(['/app/line-items'], {
      queryParams: {
        orderId: this.orderId,
        customerId: this.customerId,
       
      }
    });
  }
  EditItemsList(item) {
    let body = {
      lineItemId: item.id.toString(),
      quantity: this.quantity, 
    };
  
    this.dataService.EditItem(body).subscribe({
      next: (result: any) => {
        console.log("Result: ", result);
        if (result.status === "success") {
          this.items = {
            quantity: result.data.quantity,
            itemCode: result.data.itemCode,
            weight: result.data.weight,
          };
          this.modalService.dismissAll()
        } else {
          console.error("API Error: ", result.message);
        }
      },
      error: (error) => {
        console.error("ERROR: ", error);
      },
      complete: () => {},
    });
  }

  getQuantityValue(e)
  {
    this.quantity = e.target.value
    console.log(this.quantity);
    
  }
  
}
