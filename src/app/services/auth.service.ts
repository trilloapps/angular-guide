import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // API For Login
  AuthService_Login(credentials:any): Observable<any> {
    return this.http.post(environment.BaseURL+'/_preauthsvc/user/authenticate',credentials
);
  }
    // API For Login
    AuthService_Signup(credentials:any): Observable<any> {
      return this.http.post(environment.BaseURL+'/_preauthsvc/user/signup',credentials
  );
    }
}
