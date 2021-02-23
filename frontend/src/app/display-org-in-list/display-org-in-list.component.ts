import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../org.service';
import { Organisation } from '../Organisation';

@Component({
  selector: 'app-display-org-in-list',
  templateUrl: './display-org-in-list.component.html',
  styleUrls: ['./display-org-in-list.component.css']
})
export class DisplayOrgInListComponent implements OnInit {

  @Input() org: Organisation;

  image:any;
  imageURL: string="/assets/images/loading2.jpg";

  constructor(private orgService: OrgService, private router:Router) { }

  ngOnInit(): void {
    this.orgService.getOrgDisplayImageById(this.org.id).subscribe(data => {console.log(data);this.image = data;this.createImage()}, error => console.log(error));
  }

  orgDetails(id:string) {
    console.log("Id: "+id);
    this.router.navigate(["/org_details", id]);
  }

  createImage() {
    this.imageURL = `data:${this.image.imageContentType};base64,${this.image.image}`;
  }
}