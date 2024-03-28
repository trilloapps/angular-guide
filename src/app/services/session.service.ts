import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  cSessionService_set(key, oData) {
    localStorage.setItem(key, JSON.stringify(oData))
  }

  cSessionService_get(key) {
    let str = localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }
    return {};
  }
  SessionService_GetAccessToken() {
    return JSON.parse(localStorage.getItem(environment.AccessToken))
  }
  SessionService_SetUserDetails(oData: any) {
    this.cSessionService_set('userDetails', oData);
  }
  SessionService_GetUserDetails() {
    return this.cSessionService_get('userDetails');
  }

}
