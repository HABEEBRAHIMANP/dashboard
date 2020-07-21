import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public inputTouched = false
  public inputTouched2 = false;
  public username_exists = true;

  public login_obj: any = {
    strName: 'admint7',
    strPassword: 'admin123',
    strType: 'ADMIN',
    strFirbaseToken: 'abc'


  }

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }
  fn_login_email() {
    this.http.post('http://15.206.134.157:3000/user/login_user', this.login_obj, { headers }).subscribe((body) => {
      // this.username_exists = err['blnAPIStatus']
      console.log(body)
      if (body) {
        this.username_exists = body['blnAPIStatus']
        if (body['blnAPIStatus'] == true) {
          localStorage.setItem('strToken', body['strToken']);
          localStorage.setItem("id", body['_id']);
          localStorage.setItem('strType', body['strType']);
          if (localStorage.getItem('strType') == 'ADMIN') {
            this.route.navigate(['/mainui'])
          } else {
            this.route.navigate(['/login'])
            console.log('not admin')
          }

        }
      }


      // localStorage.setItem('strToken',body['strToken']);
      // localStorage.setItem("id", body['_id']);
      // localStorage.setItem('strType',body['strType']);
      // if (localStorage.getItem('strType') == 'ADMIN'){
      //     this.route.navigate(['/mainui'])
      // }else{
      //   this.route.navigate(['/login'])
      //   console.log('not admin')
      // }
    }, (error) => {
      console.log(error['error']['blnAPIStatus']);
      this.username_exists = error.blnAPIStatus


    });

  }

  fn_input_touched() {
    this.inputTouched = true;
  }
  fn_input_touched2() {
    this.inputTouched2 = true;
  }


}
