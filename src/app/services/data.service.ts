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
  GetCustomerList(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetCustomers",
      body
    );
  }
  GetOderList(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetCustomerOrders",
      body
    );
  }
  GetItemList(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetOrderItems",
      body
    );
  }
  GetItemDetail(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/GetItemDetails",
      body
    );
  }
  EditItem(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/ds/function/shared/EditLineItem",
      body
    );
  }
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

