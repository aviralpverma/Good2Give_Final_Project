import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-admin-org-details',
  templateUrl: './admin-org-details.component.html',
  styleUrls: ['./admin-org-details.component.css']
})
export class AdminOrgDetailsComponent implements OnInit {

  org1:any;
  org:any;
  selectedFile: File;
  retrievedImage: any;
  result:any;
  image:any;
  imageURL: string;

  constructor(private modalService: NgbModal, private orgService: OrgService) { }

  ngOnInit(): void {
    this.org1 = sessionStorage.getItem('admin');
    this.org = JSON.parse(this.org1);
    this.orgService.getOrgDisplayImageById(this.org.id).subscribe(data => {console.log(data);this.image = data;this.createImage()}, error => console.log(error));
  
  }
  createImage() {
    this.imageURL = `data:${this.image.imageContentType};base64,${this.image.image}`;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  uploadImageModal(content: any) {
    this.open(content);
  }

  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.orgService.uploadImage(this.selectedFile, this.org.id.toString()).subscribe(
      data => {
        console.log(data);
        this.result = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}