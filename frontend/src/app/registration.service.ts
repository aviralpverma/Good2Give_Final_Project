import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl='http://localhost:8080/';

  constructor(private http:HttpClient) { }

  public addUser(user:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"add/user",user);
  }

  public addOrg(org:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"org/add",org);
  }
}
