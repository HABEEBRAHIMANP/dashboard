import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

const token = localStorage.getItem('strToken');
const headers = new HttpHeaders({  'Authorization': token ,'Content-Type': 'application/json' });

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orderList_obj: any = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fn_get_orderList()
  }
  fn_get_orderList() {
    console.log(token)
    this.http.post('http://15.206.134.157:3001/order/get_order', { headers }).subscribe((body) => {
      console.log(body)
    });

  }
  // ##################################sidenav#############


}

