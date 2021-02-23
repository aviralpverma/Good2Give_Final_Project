import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  username: any;
  password: any;
  invalidLogin = false;
  user: any;
  error:any;

  constructor(private router: Router,
    private loginservice: AuthenticateService) { }

  ngOnInit(): void {
  }

  authuser(){
    if (this.user != null) {
      console.log(this.user);
      sessionStorage.setItem("user", JSON.stringify(this.user));

      sessionStorage.setItem("token",this.user.jwtToken)
      this.router.navigate([''])
     // this.invalidLogin = false
    }
    else {
      console.log("fail");
      //this.invalidLogin = true;
      this.error="Invalid credentials";
    }
  }

  checkLogin(user:NgForm) {
    this.loginservice.authenticateUser1(user.value.username, user.value.password).subscribe(data => { this.user = data,this.authuser();},err=>this.error=err);  
    //this.loginservice.authenticate({ "uname": this.username, "password": this.password }).subscribe(data => { console.log(data) })
    
  }
}
