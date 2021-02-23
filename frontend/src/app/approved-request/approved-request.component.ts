import { Component, OnInit } from '@angular/core';
import { DonationRequestService } from '../donation-request.service';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {

  dlist: any;
  admin1: any = sessionStorage.getItem("admin");
  admin: any = JSON.parse(this.admin1);
  error: any;
  result: any;
  ulist:any;

  constructor(private dService: DonationRequestService) { }

  ngOnInit(): void {
    console.log(this.admin);
    this.loadData();
  }

  loadData() {
    this.dService.fetchRequestByOrgId(this.admin.id).subscribe(data => {this.dlist = data;console.log(this.dlist);});
  }
  userDetails(id:number){
    this.dService.fetchRequestByReqId(id).subscribe(data => {this.ulist = data;console.log(this.ulist);});
  }

}