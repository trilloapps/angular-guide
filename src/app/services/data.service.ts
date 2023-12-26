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
  ProfileFileUpload(body): Observable<any> {
    return this.http.post<any>(
      environment.BaseURL + "/foldersvc/cloudstorage/upload",
      body
    );
  }
}

