import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import { Organisation } from '../Organisation';
import { ReqService } from '../req.service';
import { Require } from '../Requirement1';

@Component({
  selector: 'app-register-req',
  templateUrl: './register-req.component.html',
  styleUrls: ['./register-req.component.css']
})
export class RegisterReqComponent implements OnInit {
  items:boolean;
  money:boolean;
  todDate:string;
  today:Date;
  res:any;
  requirement=new Require();
  org:any;
  

  constructor(private rs:ReqService) { 
    this.org=sessionStorage.getItem("admin");
    this.today=new Date();
    this.requirement.creationDate=this.today
    this.requirement.categoryId=new Category();
    this.todDate=this.today.toDateString()
    this.requirement.assocOrg=new Organisation();
    this.requirement.assocOrg=(JSON.parse(this.org));
  }

  ngOnInit(): void {
    this.requirement.assocOrg.id=(JSON.parse(this.org)).id;
    console.log((JSON.parse(this.org)).id);
  }
  checkItems(input: HTMLInputElement) {
    console.log(input)
    if(input.checked==true){
      this.items=true;
    }
    else{
      this.items=false;
    }
  }
  checkMoney(input: HTMLInputElement) {
    console.log(input)
    if(input.checked==true){
      this.money=true;
    }
    else{
      this.money=false;
    }
  }
  onSubmit(req:Require){
    if(req.categoryId.id==null)
      req.categoryId.id=5
    console.log(req);
    this.rs.addreq(req).subscribe(data=>{this.res=data,console.log(data)});
  }
}