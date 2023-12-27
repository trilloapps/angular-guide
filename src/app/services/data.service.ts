import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){

  }
  // API of CustomerList
  GetCustomerLists(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetCustomers",
      body
    );
  }
  // API of OderList
  GetOderList(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetCustomerOrders",
      body
    );
  }
  //API of ItemList
  GetItemList(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetOrderItems",
      body
    );
  }
  //API of ItemDetails
  GetItemDetail(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetItemDetails",
      body
    );
  }
  //API of EditItem
  EditItem(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/EditLineItem",
      body
    );
  }
  //API of ProfileUpload
  ProfileFileUpload(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/foldersvc/cloudstorage/upload",
      body
    );
  }
  GetUserDetails(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetUserDetails",
      body
    );
  }
  
}

