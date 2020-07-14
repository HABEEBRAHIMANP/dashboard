import { Component, OnInit, } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orderList_obj: any = []

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts() {
    let param = {
      // "strSort": "strName",
      // "strSortActive": "ASC",
      // "intLimit": 2,
      // "arrBrand": [],
      // "arrCategory": [],
      // "arrProductName": [],
      // "intAmountLimit": 65000
    }
    this.apiService.fn_OrderPost('order/get_order', param, '3001').subscribe(res => {
      console.log("res", res);
      this.orderList_obj = res['arrList'];
    });
  }
}