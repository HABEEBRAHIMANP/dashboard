import { Component, OnInit } from '@angular/core';
import {arrOrderList} from'./demmy'
import { from } from 'rxjs';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  {

  arrOrderList=arrOrderList
  // constructor() { }

  // ngOnInit(): void {
  // }

}

class orderItems{

}

