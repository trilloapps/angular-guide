import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { PageService } from 'src/app/services/page.service';

interface Customers {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  status: string;
}
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customersList: Customers[] = []
  temp: Customers[] = []
  searchInput: any;
  searchControl: FormControl = new FormControl("");
  size = 10
  start = 1;
  page = 1;
  pageSize = 10;
  totalSize: number;

  constructor(private dataService: DataService, private pageService: PageService) { }

  ngOnInit(): void {
    this.getCustomerList(this.start, this.size);
  }


  getCustomerList(incommingStart, incommingSize) {
    let body = {
      start: incommingStart,
      size: incommingSize

    }
    this.dataService.GetCustomerList(body).subscribe({
      next: (result: any) => {
        if (result.status === "success") {
          this.customersList = result.data.customers;
          this.totalSize = result.data.totalData;
          this.temp = [...this.customersList]
        }
      },
      error: (error) => {
        console.error(error);

      },
      complete: () => { },
    });

  }


  searchFilter(event: any) {
    this.searchInput = event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.customersList = temp;

  }
  getPaginationFromServer(oIncomingEvent: any) {
    let incommingPage = oIncomingEvent;
    let start = (incommingPage - 1) * this.size + 1;
    this.getCustomerList(start, this.size);

  }

}
