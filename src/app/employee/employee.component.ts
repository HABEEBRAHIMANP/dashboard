import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token , 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent  {
  constructor(private http: HttpClient) { }
  public employee: any[]
  body = {

    "strType": "EMPLOYEE"
  }


  ngOnInit(): void {
    this.fn_getDistr()
  }
  fn_getDistr() {
    this.http.post('http://15.206.134.157.:3001/user/get_user', this.body, {headers}).subscribe((body) => {
      this.employee = body['arrList']
      console.log(body)

    });
  }

}

