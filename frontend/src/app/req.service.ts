import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from './Requirement';

@Injectable({
  providedIn: 'root'
})
export class ReqService {

  private url: string = "http://localhost:8080/req";

  constructor(private http: HttpClient) { }

  getReqListByOrgId(id: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.url}/orgid/${id}`);
  }
  
  addreq(obj:any){
    return this.http.post<any>(this.url+"/add",obj)
  }
}
