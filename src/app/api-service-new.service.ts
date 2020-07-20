import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 


@Injectable({
  providedIn: 'root'
})
export class ApiServiceNewService {

  private host = "http://15.206.134.157";
  private port = "4000";
  private token = 'U2FsdGVkX1/9xUQr7ByaTAgLZ/i5fmtjIb7b2Uw7Bldt/IkTvmRA0ZKnRIiLOgeTTg4/n2uAzWnJy0mX3nnYkVWKnu4pddpArSDjm30dNd7BHHiQ7G/+Z2DHF8STVgDJ7Oz/5g+kq4Lh7DXujVs1qz5Y742h6eDZEy4smuZitWhgQs09OLNy/mX1WJpuRRUn/a+wAKol4ucaDOB8AjCDBq1EtREIi+I6BId3q8/jZO6gvTH8kRtlSWo6315BwEs3vf6DMM4s8MkeEEfi7KenakD0NkEr/P9QG3/Dl/ecVd5j5gpmAY0rwjeQxtgIUnEu4iiScvSQUMzfYohsjFnPlxMi5lypZ3UwzU80SQqa3DLTcTrYakaklgJCY/jPSnBExo4Q2dpAWejYY5/O7dX8j7cG54fMQh+mUJDLip8lwdnmjpZJ6ynmKakL+X3eGWL3w2484MmbbdGvACiGEnWdpQ=='
  constructor(public http: HttpClient,
    public leftSnack: MatSnackBar) {}
  fun_apiGet(path: string = "", param: any, port ? : string): Observable < any > {
    let options = {
      headers: this.setHeaders(),
      params: param
    };
    return this.http.get(this.makeFullUrl(this.host, port, path), options)
  }
  fun_apiPost(path: string = "", param: object, port ? : string): Observable < any > {
    let options = {
      headers: this.setHeaders()
    };
    return this.http.post(this.makeFullUrl(this.host, port, path), param, options)
  }
  fun_apiDelete(path: string = "", param: object, port ? : string): Observable < any > {
    let options = {
      headers: this.setHeaders(),
      body:param
    };
    return this.http.request('delete',this.makeFullUrl(this.host, port, path), options)
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
    return this.http.post(this.makeFullUrl(this.host, port, path), formData, options)
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
    return this.token;
  }
  private makeFullUrl(host, port, apiPath) {
    port = port ? port : this.port;
    return `${host}:${port}/${apiPath}`;
  }

   /**
   * snackBar
   * @param message 
   * @param action 
   */
  openSnackbar(message: string, action?: string) {
    this.leftSnack.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition:'right'
    });
  }
}
