import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  myform:FormGroup
  latitude:number;
  longitute:number;
  res:any;
  constructor(private regser:RegistrationService,private route:Router) { }

  ngOnInit(): void {
  }


  onSubmit(admin:NgForm){
    console.log(admin.value);
    this.regser.addOrg(admin.value).subscribe(data=>{this.res=data,console.log(data)});
    admin.reset();
    setTimeout(() => {this.route.navigate(['login-admin']);}, 7000);



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
