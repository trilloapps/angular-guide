import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
  bLoader: boolean = false;


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerList(this.start, this.size);
  }

  //---------- GET CUSTOMERS LIST ----------
  getCustomerList(incommingStart, incommingSize) {
    this.bLoader = true;
    let body = {
      start: incommingStart,
      size: incommingSize
    }
    this.dataService.GetCustomerLists(body).subscribe({
      next: (result: any) => {
        if (result.status === "success") {
          this.customersList = result.data.customers;
          this.totalSize = result.data.totalData;
          this.temp = [...this.customersList]
          this.bLoader = false;
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { },
    });
  }


  //---------- SEARCH FILTER ----------
  searchFilter(event: any) {
    this.searchInput = event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || d.lastName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.customersList = temp;
  }


  //---------- PAGINATION ----------
  getPaginationFromServer(oIncomingEvent: any) {
    let incommingPage = oIncomingEvent;
    let start = (incommingPage - 1) * this.size + 1;
    this.getCustomerList(start, this.size);
  }


  //---------- NAVIGATION ----------
  navigateToOder(item) {
    this.router.navigate(['/app/orders'], {
      queryParams: { customerId: item.id },
    });
  }
}
