import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {arrDistributerList} from'./distributerdemmy'
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'U2FsdGVkX1+qTzmT2MW+MFw9Fh+v7NJ/4y9+FpJ+5652RZ/egkfNbhC3iVbnHHX0f/DoaqTM6VSlr7HB4wqS8O5z7un/P0JiTvvnsHb5dDavrsgFLkNwCxon6vQCjNbxhNIGKHOpumJ8D/gdd2oxt3UX54JEcxuZ1H570gNJYx69czOiTov3zRWu83TgIL7+g09ZJldzfAMAdJmTJZIkomMNXA2rFw2UUWMxXrTT6hkNRVrSDkH11CiXR3E1V7kCr6s1FZHqd/Zyh9SGYqerMGErZgilFXvPOjptAqFqCGSTr+BUUH+ahWlf+gye4Dj37WyuNm31FTe76Jgjm4h17fftVBVxRQnRi5HeOshiWi8z2dlqSkVXjZM1Ff6oII0qUewoLEdxBiOkhRpg1V3c9Y5ntJMUk+QI/0TrvJ3HPdDk+E9q3U5u19qi759FLxj/qMUpY1C+23GRvt0bbhXNLg=='})
// import { from } from 'rxjs';
@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.css']
})
export class DistributerComponent implements OnInit {
  // arrDistributerList=arrDistributerList
  distlist: any[]
  constructor(private http: HttpClient) { }
  length = 1000000;
  pageSize: number
  pageSizeOptions: number[] = [,5, 10, 25, 100,200,500]


  ngOnInit(): void {
    this.onpager(event);
  }
  onpager(event: any){
    let body = {

      "strType": "DISTRIBUTER",
      "strSort": '',
      "strSortActive": "DSC",
      "intLimit":event.pageSize,
      "intPageNo":event.pageIndex
    }
    this.http.post('http://15.206.134.157.:3001/user/get_user', body, {headers}).subscribe((body) => {
      console.log(body)
      this.distlist = body['arrList']
    });

  }



}
