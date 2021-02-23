import { Component, OnInit } from '@angular/core';
import { DonationRequestService } from '../donation-request.service';

@Component({
  selector: 'app-don-req-list',
  templateUrl: './don-req-list.component.html',
  styleUrls: ['./don-req-list.component.css']
})
export class DonReqListComponent implements OnInit {

  dlist: any;
  admin1: any = sessionStorage.getItem("admin");
  admin: any = JSON.parse(this.admin1);
  error: any;
  result: any;

  constructor(private dService: DonationRequestService) { }

  ngOnInit(): void {
    console.log(this.admin);
    this.loadData();
  }

  loadData() {
    this.dService.fetchDonRequestByOrgId(this.admin.id).subscribe(data => {this.dlist = data;console.log(this.dlist);});
  }

  approve(id: any) {
    console.log(id);
    this.dService.approveDonRequest(id).subscribe(data => {
      console.log(data); this.result = data; if (this.result) {
        alert("Approved!");
      } this.loadData()
    }, err => {
      this.error = err; console.log(err)
    });
  }
}
