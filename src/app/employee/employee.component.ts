import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {arrEmployeeList} from'./employeedemmy'
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'U2FsdGVkX1+qTzmT2MW+MFw9Fh+v7NJ/4y9+FpJ+5652RZ/egkfNbhC3iVbnHHX0f/DoaqTM6VSlr7HB4wqS8O5z7un/P0JiTvvnsHb5dDavrsgFLkNwCxon6vQCjNbxhNIGKHOpumJ8D/gdd2oxt3UX54JEcxuZ1H570gNJYx69czOiTov3zRWu83TgIL7+g09ZJldzfAMAdJmTJZIkomMNXA2rFw2UUWMxXrTT6hkNRVrSDkH11CiXR3E1V7kCr6s1FZHqd/Zyh9SGYqerMGErZgilFXvPOjptAqFqCGSTr+BUUH+ahWlf+gye4Dj37WyuNm31FTe76Jgjm4h17fftVBVxRQnRi5HeOshiWi8z2dlqSkVXjZM1Ff6oII0qUewoLEdxBiOkhRpg1V3c9Y5ntJMUk+QI/0TrvJ3HPdDk+E9q3U5u19qi759FLxj/qMUpY1C+23GRvt0bbhXNLg=='});
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

