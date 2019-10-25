import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

   }

  //  "createUser": "https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/createUser",


  createUser(data:any) :Observable<any> {
    return this.http.post<any>(environment.createUser, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
   }

   getUserKycInfo(data: any) {
    let token = localStorage.getItem('saveToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(environment.getUserKycInfo, data, httpOptions);
   }

   downloadDocument(data: any) {
    const token = localStorage.getItem("saveToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(environment.downloadDoucment, data,httpOptions );
  }

  convertBase64toBlob(base64: any, contentType: any) {
    var byteCharacters = atob(base64);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: contentType });
    return blob;
  }

}
