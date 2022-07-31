import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  remote(){
    const REMOTE_SERVER = `${environment.server}`;
    const ENDPOINTS = {
      "protected": "/demo/protected",
      "webForm": "/demo/protected/web-form",
      "bearer": "/demo/protected/api/bearer",
      "login": "/demo/oauth/token",
      "webCookies": '/demo/protected/web-cookies',
      "getUser": "/demo/user",
      "logOut": "/demo/logout"
    }
    let httpRequest = this.http
    return {
      getFromRequestParameter(accessToken: any): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.protected
        let params = {
          access_token: accessToken
        }
        return httpRequest.get<any>(url, {params: params});
      },
      postFromBody(body: any): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.webForm
        return httpRequest.post<any>(url, body.access_token);
      },
      getFromRequestHeader(headers: any): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.bearer
        return httpRequest.get<any>(url, {headers: headers});
      },
      login(body: any): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.login
        return httpRequest.post<any>(url, body);
      },
      webCookies(): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.webCookies
        return httpRequest.get<any>(url);
      },
      getUser(): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.getUser
        return httpRequest.get<any>(url);
      },
      logOut(): Observable<any> {
        let url = REMOTE_SERVER+ENDPOINTS.logOut
        return httpRequest.get<any>(url);
      }
    }
  }

  constructor(private http: HttpClient) {

  }


  
}
