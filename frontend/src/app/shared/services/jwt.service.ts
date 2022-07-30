import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.server}/jwt`;
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public post(options: any): Observable<any> {
    return this.http.post<any>(this.url, options)
  }
  
  public verifyToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.url}/verify/${token}`);
  }

}
