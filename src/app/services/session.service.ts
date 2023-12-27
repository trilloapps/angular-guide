import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  SessionService_GetAccessToken() {
    return JSON.parse(localStorage.getItem(environment.AccessToken))
  }}
