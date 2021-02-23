import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { Requirement } from '../Requirement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { DonationRequestService } from '../donation-request.service';
declare var $: any;

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.css']
})
export class ReqDetailsComponent implements OnInit {

  @Input() oneReq: Requirement;

  imgurl:string;
  count: number = 0;
  user1: any = sessionStorage.getItem('user');
  user = JSON.parse(this.user1);
  donReq: any;
  result:any;

  constructor(private authService: AuthenticateService, private router: Router, private modalService: NgbModal, private donReqService: DonationRequestService) { }

  ngOnInit(): void {

  }

  calProgress(curr: number, max: number): number {
    return curr / max * 100;
  }

  rangeDiff(): number {
    return this.oneReq.itemMaxCount - this.oneReq.itemCurrentCount;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  donateModal(content: any) {
    if (!this.authService.isUserLoggedIn()) {
      alert("Please login first!");
      this.router.navigate(["/login-user"]);
    }
    else {
      // console.log("here");
      this.open(content);
    }
  }

  onSubmit() {
    this.donReq = { itemDonationCount: this.count, assocUser: { uid: this.user.uid }, assocReq: { id: this.oneReq.id }, approved: false };
    console.log(this.donReq);
    this.donReqService.saveNewDonRequest(this.donReq).subscribe(data => 
      {
        console.log(data);
        this.result = data;
      },
      err => {
        console.log(err);
      });
  }
}
