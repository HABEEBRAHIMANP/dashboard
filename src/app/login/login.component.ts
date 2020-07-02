import { Component, OnInit ,Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
 const headers = new HttpHeaders()
            .set( 'Content-Type: application/json','strAppInfo: TNT1')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public login_obj: any ={
    strName: 'TNTONE',
    strPassword:'admin123'
   
    
  }
  
  constructor( private route: Router,private http: HttpClient) { }

  ngOnInit(): void {
  } 
  fn_login_email(){
    this.http.post('http://15.206.134.157:3000/user/login_user', this.login_obj,{headers}).subscribe((body) => {
      console.log(body)
      if (body['strName']) {
        localStorage.setItem('strName', body['strType']);
        if (body['strType'] == 'ADMIN') {
          this.route.navigate(['/mainui']);
        } else {
          this.route.navigate(['/login']);
        }
      }
    });
  }


}
