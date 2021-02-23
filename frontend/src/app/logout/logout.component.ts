import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private loginservice: AuthenticateService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(){
    if(sessionStorage.getItem("user")!=null){
      sessionStorage.removeItem("user");

      sessionStorage.removeItem("token");
      this.router.navigate(['login-user']);
      console.log("in userlogout");
    }
   
  }
}