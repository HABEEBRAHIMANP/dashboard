import { Component, OnInit ,Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
 const headers = new HttpHeaders({'Content-Type': 'application/json','strAppInfo': 'TNT1'})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public login_obj: any ={
    strName: 'TNTONE',
    strPassword:'admin123',
    strType:'ADMIN',
    strFirbaseToken:'abcd'
   
    
  }
  
  constructor( private route: Router,private http: HttpClient) { }

  ngOnInit(): void {
  } 
  fn_login_email(){
   this.http.post('http://15.206.134.157:3000/user/login_user', this.login_obj,{headers}).subscribe((body) => {
      localStorage.setItem('strToken',body['strToken']);
      localStorage.setItem("id", body['_id']);
      localStorage.setItem('strType',body['strType']);
      if (localStorage.getItem('strType') == 'ADMIN'){
          this.route.navigate(['/mainui'])
      }else{
        this.route.navigate(['/login'])
        console.log('not admin')
      }
    });
  }


}
