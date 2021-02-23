import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class LogingaurdService {

  

  constructor(private authService:AuthenticateService,private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (this.authService.isAdminLoggedIn() || this.authService.isUserLoggedIn)
      return true;

    //this.router.navigate(['myorg']);
    return false;

  }
}
