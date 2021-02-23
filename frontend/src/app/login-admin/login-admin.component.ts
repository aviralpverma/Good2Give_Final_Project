import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})

export class LoginAdminComponent implements OnInit {
  username: any;
  password: any;
  invalidLogin = false;
  admin: any;
  error:any;

  constructor(private router: Router,
    private loginservice: AuthenticateService) { }

  ngOnInit(): void {
  }


  authuser(){
    if (this.admin != null) {

      console.log(this.admin);
      sessionStorage.setItem("admin", JSON.stringify(this.admin));
      sessionStorage.setItem('token', this.admin.jwtToken);
         
      this.router.navigate(['admin'])
     // this.invalidLogin = false
    }
    else {
      console.log("fail");
      //this.invalidLogin = true;
      this.error="Invalid credentials";

    }
  }

  

  checkLogin(user:NgForm) {
    this.loginservice.authenticateAdmin(user.value.username, user.value.password).subscribe(data => { this.admin = data,console.log(data),this.authuser();},err=>this.error=err);
    
  }


}
