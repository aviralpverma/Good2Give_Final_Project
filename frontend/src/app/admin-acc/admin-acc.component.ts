import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrgService } from '../org.service';
import { Organisation } from '../Organisation';

@Component({
  selector: 'app-admin-acc',
  templateUrl: './admin-acc.component.html',
  styleUrls: ['./admin-acc.component.css']
})
export class AdminAccComponent implements OnInit {
  admin1:any;
  admin:Organisation;
  selectedFile: File;
  retrievedImage: any;
  result:any;

  constructor(private modalService: NgbModal,private orgService: OrgService) { 
    this.admin1=sessionStorage.getItem("admin");
    this.admin=JSON.parse(this.admin1);
   // console.log(JSON.parse(this.user));
    
  }

  ngOnInit(): void {
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
    this.orgService.uploadImage(this.selectedFile, this.admin.id.toString()).subscribe(
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
