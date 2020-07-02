import { Component, OnInit } from '@angular/core';
import {arrOrderList} from'../orders/demmy'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }
  arrOrderList=arrOrderList;

  ngOnInit(): void {
  }

}
