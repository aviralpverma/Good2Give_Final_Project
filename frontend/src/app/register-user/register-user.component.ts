import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  latitude:number;
  longitute:number;
  res:any;
  constructor(private regser:RegistrationService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(user:NgForm){
    //console.log(user.value);
    this.regser.addUser(user.value).subscribe(data=>{this.res=data,console.log(data)});
    user.reset();
    //setTimeout(() => {this.route.navigate(['login-user']);},10000);




  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.latitude = position.coords.latitude;
          this.longitute = position.coords.longitude;
          console.log(this.latitude+" "+this.longitute);
          }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
