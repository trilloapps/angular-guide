import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  userDetails:any;
  constructor(private sessionService: SessionService,private oDataService:DataService,private oRoute:Router) { }
  checkValidity(result,action): void {
    this.userDetails = this.sessionService.SessionService_GetUserDetails();
  if (action === 'logOut') {
    this.handleLogout(result);
  } else if (action === 'edit') {
    this.handleEdit(result);
  }
}
private handleLogout(result): void {
  if (this.userDetails.id === result) {
    this.logout();
  }
}
private handleEdit(result): void {
  const userHasSameId = this.userDetails.id === result?.id;
  if (userHasSameId) {
    if (this.userDetails.role !== result?.role) {
      this.logout();
    } else {
      result.fullName = `${result.firstName} ${result.lastName}`;
      this.sessionService.SessionService_SetUserDetails(result);
    }
  }
  }
  logout()
  {
    setTimeout(() => {
      localStorage.clear();
      this.oRoute.navigate(['/auth/login']);
    }, 2000);
  }
}
