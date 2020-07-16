import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private host = "http://15.206.134.157";
  private port = "3000";
  private token = localStorage.getItem('strToken')
  constructor(public http: HttpClient,
    public leftSnack: MatSnackBar) { }
  fn_OrderPost(path: string = "", param: object, port?: string): Observable<any> {
    let options = {
      headers: this.setHeaders()
    }
    return this.http.post(this.myurl(this.host, port, path), param, options)
  }
  fun_apiDelete(path: string = "", param: object, port ? : string): Observable < any > {
    let options = {
      headers: this.setHeaders(),
      body:param
    };
    return this.http.request('delete',this.myurl(this.host, port, path), options)
  }
  fun_apiPostImage(path: string = "", param, port ? : string): Observable < any > {
    let headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*',
      'Authorization': `${this.getToken()}`
    });
    let options = {
      headers: headers
    };
    const formData = new FormData();
    param.forEach((element) => {
      formData.append('images',element,"");
    });
    return this.http.post(this.myurl(this.host, port, path), formData, options)
  }
  private setHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*',
      'Authorization': `${this.getToken()}`
    });
    return headers;
  }
  getToken() {
    //store to local and fetch here
    localStorage.getItem('strToken')
    return this.token;
  }
  private myurl(host, port, apiPath) {
    port = port ? port : this.port;
    return `${host}:${port}/${apiPath}`;
  }
}
