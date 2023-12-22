import { Component } from '@angular/core';

interface Customers {
  id: string;
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
export class CustomersComponent {

  customersList : Customers[] = [
    {id:'c-456', firstName:'John', lastName:'Doe', email:'john@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-451', firstName:'Adam', lastName:'Smith', email:'adam@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-452', firstName:'Johnson', lastName:'Charles', email:'johnson@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-453', firstName:'Kane', lastName:'William', email:'kane@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-455', firstName:'Joe', lastName:'Root', email:'joe@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-456', firstName:'James', lastName:'Andy', email:'james@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Inactive'},
    {id:'c-466', firstName:'Andy', lastName:'Flower', email:'andt@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-476', firstName:'Greame', lastName:'Smith', email:'greame@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-446', firstName:'David', lastName:'Warner', email:'marnus@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-356', firstName:'Marnus', lastName:'Labuchange', email:'john@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-256', firstName:'Mith', lastName:'Starc', email:'starc@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-156', firstName:'Kane', lastName:'Richarson', email:'john@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Active'},
    {id:'c-466', firstName:'Morne', lastName:'Morkel', email:'john@gmail.com', phone:+92786546865, address:'Street 1 ,Harley', status:'Inactive'},
  ]
  searchInput: any;
  temp: Customers[]=[...this.customersList];

  searchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.customersList = temp;

  }

}
