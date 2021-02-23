import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DonationRequestService } from '../donation-request.service';

@Component({
  selector: 'app-user-donation',
  templateUrl: './user-donation.component.html',
  styleUrls: ['./user-donation.component.css']
})
export class UserDonationComponent implements OnInit {
  user:any;
  user1:any;
  id:number;
  donation:any[];

  constructor(private donSer:DonationRequestService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user=sessionStorage.getItem("user");
    console.log(JSON.parse(this.user).uid);
    this.donSer.fetchUserDonation(JSON.parse(this.user).uid).subscribe(data=>{this.donation=data;console.log(data)});
  }

}
