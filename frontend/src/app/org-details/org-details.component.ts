import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from '../org.service';
import { Organisation } from '../Organisation';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css']
})
export class OrgDetailsComponent implements OnInit {

  id:number;
  imagesList:any;
  images:String[] = [];
  org:Organisation = new Organisation();

  constructor(private orgService: OrgService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    console.log("OrgDetailsComponent id : " + this.id);
    this.orgService.getOrgById(this.id).subscribe(data => this.org = data);
    this.orgService.getOrgImagesById(this.id).subscribe(data => {console.log(data);this.imagesList = data;this.createImage()}, error => console.log(error));
  
  }

  createImage() {
    this.imagesList.forEach((element: any) => {
      // console.log(element);
      // console.log(`image:${element.imageContentType};base64,${element.image}`);
      let imgUrl = `data:${element.imageContentType};base64,${element.image}`; 

      this.images.push(imgUrl);
    });
  }

}
