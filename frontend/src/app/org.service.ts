import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation } from './Organisation';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  private url: string = "http://localhost:8080/org";

  constructor(private http : HttpClient) { }

  getOrgListByLocation(lat:number, lng:number): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${this.url}/nearest?userLat=${lat}&userLng=${lng}`);
  }

  getOrgById(id:number): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.url}/${id}`);
  }

  getOrgImagesById(id:number): Observable<any> {
    return this.http.get<Organisation>(`${this.url}/download/${id}`);
  }

  getOrgDisplayImageById(id:number): Observable<any> {
    return this.http.get<Organisation>(`${this.url}/download_one/${id}`);
  }

  uploadImage(selectedFile: File,orgId:string): Observable<any> {
    const uploadData = new FormData();
    console.log("Org ID : " + orgId, "File : " + selectedFile);
    uploadData.append("orgId",orgId);
    uploadData.append("imageFile", selectedFile);
    return this.http.post(this.url.concat("/upload_image"), uploadData);
  }

  fetchAllCities(): Observable<String[]> {
    return this.http.get<String[]>(`${this.url}/all_cities/`);
  }

  getOrgByCity(cityName:string) : Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${this.url}/search_city/${cityName}`);
  }

  
}
