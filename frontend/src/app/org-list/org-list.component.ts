import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../org.service';
import { Organisation } from '../Organisation';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  orgList: Organisation[];
  lat: number = 0;
  lng: number = 0;
  cities: String[] = [];
  cityName: string;
  notFound: boolean = false;

  constructor(private orgService: OrgService, private router:Router) {
    this.orgList = [];
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude + " " + "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // console.log(this.lat + " " + this.lng);
          this.orgService.getOrgListByLocation(this.lat, this.lng)
            .subscribe(data => {this.orgList = data,console.log("in get nearest location")})
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  orgDetails(id:string) {
    console.log("Id: "+id);
    this.router.navigate(["/org_details", id]);
  }


  onSubmit() {
    this.notFound = false;
    this.orgService.getOrgByCity(this.cityName).subscribe(
      data => {
        console.log(data);
        this.orgList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadCities() {
    this.orgService.fetchAllCities().subscribe(
      data => {
        console.log(data);
        this.cities = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
