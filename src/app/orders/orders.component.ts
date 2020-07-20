import { Component, OnInit, } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isExpanded = false;
  public orderList_obj: any = []

  constructor(private apiService: ApiserviceService) { }
  nav_position: string = 'end';

  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'end';

  }

  ngOnInit(): void {
    this.onpager(event);

  }
  length = 1000000;
  pageSize: number
  pageSizeOptions: number[] = [, 5, 10, 25, 100, 200, 500]
  onpager(event: any) {
    let param = {
      "intLimit": event.pageSize,
      "intPageNo": event.pageIndex,
      "strSortActive": this.sortedData,
      "strSort":this.sortname,
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

  public sortedData;
  public sortname;
  sortData(sort: Sort) {
    console.log(sort.direction, sort.active)
    if(sort.direction == 'asc'){
      this.sortedData = 'ASC',
      this.sortname = sort.active
    }else{
      this.sortedData = 'DSC',
      this.sortname = sort.active

    }

  }

}