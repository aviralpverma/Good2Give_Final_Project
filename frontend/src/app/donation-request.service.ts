import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationRequestService {

  private url: string = "http://localhost:8080/don_req";

  constructor(private http: HttpClient) { }

  saveNewDonRequest(donReq: Object): Observable<Object> {
    return this.http.post(this.url, donReq);
  }

  fetchDonRequestByOrgId(id:number): Observable<Object> {
    return this.http.get<Object>(`${this.url}/orgid/${id}`)
  }
  fetchRequestByOrgId(id:number): Observable<Object> {
    return this.http.get<Object>(`http://localhost:8080/req/orgidr/${id}`)
  }
  fetchRequestByReqId(id:number): Observable<Object> {
    return this.http.get<Object>(`${this.url}/reqid/${id}`)
  }
  approveDonRequest(id:number): Observable<Object> {
    return this.http.get<Object>(`${this.url}/approve/${id}`)
  }


  fetchUserDonation(id:number): Observable<any> {
    console.log(id);
    return this.http.get<Object>(this.url+"/userid/"+id);
  }
}
