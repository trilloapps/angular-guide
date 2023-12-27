import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';


const canActivate = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => 
{
  const sessionService = inject(SessionService);
  const router = inject(Router);
   if(sessionService.SessionService_GetAccessToken() != null) 
    {
      return true;
    } 
    else
    {
      router.navigate(['auth/login']);
      return false;
    }
};
export const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {return canActivate(route, state);}
