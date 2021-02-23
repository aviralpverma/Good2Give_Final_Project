import { Component, Input, OnInit } from '@angular/core';
import { ReqService } from '../req.service';
import { Requirement } from '../Requirement';

@Component({
  selector: 'app-req-list',
  templateUrl: './req-list.component.html',
  styleUrls: ['./req-list.component.css']
})
export class ReqListComponent implements OnInit {

  @Input() orgId:number;

  reqList: Requirement[];

  constructor(private reqService: ReqService) { }

  ngOnInit(): void {
    console.log(this.orgId);
    this.reqService.getReqListByOrgId(this.orgId).subscribe(data => {console.log("avinash"+data); this.reqList = data});
  }
}
