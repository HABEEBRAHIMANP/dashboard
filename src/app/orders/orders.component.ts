import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { from } from 'rxjs';
const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'U2FsdGVkX1+qTzmT2MW+MFw9Fh+v7NJ/4y9+FpJ+5652RZ/egkfNbhC3iVbnHHX0f/DoaqTM6VSlr7HB4wqS8O5z7un/P0JiTvvnsHb5dDavrsgFLkNwCxon6vQCjNbxhNIGKHOpumJ8D/gdd2oxt3UX54JEcxuZ1H570gNJYx69czOiTov3zRWu83TgIL7+g09ZJldzfAMAdJmTJZIkomMNXA2rFw2UUWMxXrTT6hkNRVrSDkH11CiXR3E1V7kCr6s1FZHqd/Zyh9SGYqerMGErZgilFXvPOjptAqFqCGSTr+BUUH+ahWlf+gye4Dj37WyuNm31FTe76Jgjm4h17fftVBVxRQnRi5HeOshiWi8z2dlqSkVXjZM1Ff6oII0qUewoLEdxBiOkhRpg1V3c9Y5ntJMUk+QI/0TrvJ3HPdDk+E9q3U5u19qi759FLxj/qMUpY1C+23GRvt0bbhXNLg=='});
  const me =header;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  {
  public 
  public orderList_obj: any=[
    
  ]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fn_get_orderList()
  }
  fn_get_orderList() {
    console.log(me)
    this.http.post('http://15.206.134.157:3001/order/get_order',{headers: header}).subscribe((body) => {
      console.log(body)
     });
     
  }
  // ##################################sidenav#############


}

class orderItems{

}

