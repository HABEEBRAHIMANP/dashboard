import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {arrEmployeeList} from'./employeedemmy'

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



  ngOnInit(): void {
    this.onpager(event)
  }
  length = 1000000;
  pageSize: number
  pageSizeOptions: number[] = [,5, 10, 25, 100,200,500]
  onpager(event: any) {
    let body = {

      "strType": "EMPLOYEE",
      "strSort": '',
      "strSortActive": "DSC",
      "intLimit":event.pageSize,
      "intPageNo":event.pageIndex
    }
    this.http.post('http://15.206.134.157.:3001/user/get_user', body, {headers}).subscribe((body) => {
      this.employee = body['arrList']
      console.log(body)

    });
  }

}

