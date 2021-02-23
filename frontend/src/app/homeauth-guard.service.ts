import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class HomeauthGuardService {

  constructor(private authService:AuthenticateService,private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (this.authService.isAdminLoggedIn())
      return false;

    //this.router.navigate(['myorg']);
    return true;

  }
}
