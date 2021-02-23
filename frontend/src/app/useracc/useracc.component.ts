import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useracc',
  templateUrl: './useracc.component.html',
  styleUrls: ['./useracc.component.css']
})
export class UseraccComponent implements OnInit {
  user1:any;
  user:any;

  constructor() { 
    this.user1=sessionStorage.getItem("user");
    this.user=JSON.parse(this.user1);
   // console.log(JSON.parse(this.user));
    
  }

  ngOnInit(): void {
  }

}