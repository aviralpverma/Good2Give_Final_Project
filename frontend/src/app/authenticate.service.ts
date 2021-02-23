import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }


  public authenticateUser1(username: any, password: any): Observable<any> {
   // this.authenticate({ "username": username, "password": password }).subscribe(data => { console.log(data) })
    return this.http.post<any>(this.baseUrl + 'login/user', "username=" + username + "&password=" + password, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
  }
  

  public authenticateAdmin(username: any, password: any): Observable<any> {
    //this.authenticate({ "username": username, "password": password }).subscribe(data => { console.log(data) })
    return this.http.post<any>(this.baseUrl + 'login/admin', "username=" + username + "&password=" + password, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
  }

  

  public hideNav() {
    if (sessionStorage.getItem('user') != null)
      return false;
    if (sessionStorage.getItem('admin') != null)
      return false;
    return true;
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem('user')
    //console.log(!(user === null))
    return !(user === null)
  }

  public isAdminLoggedIn() {
    let user = sessionStorage.getItem('admin');
    //console.log(!(user === null))
    return !(user === null);
  }
}
