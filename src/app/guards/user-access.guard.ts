import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sessionService = new SessionService(); // Instantiate the SessionService
  const router = new Router(); // Instantiate the Router

  const user = sessionService.SessionService_GetUserDetails(); // Correct method invocation

  if (user && user.role === 'admin') {
    return true;
  } else {
    const accessToken = sessionService.SessionService_GetAccessToken(); 
    if(accessToken)
    {
      router.navigate(['/app/customers']);
      return true;
    }
    else
    {
      router.navigate(['/auth/login']);
      return false;
    }
  }
};

export const userAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return canActivate(route, state);
};