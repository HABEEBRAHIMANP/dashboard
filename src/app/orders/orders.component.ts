import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Sort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { OrderdetailsComponent } from '../orderdetails/orderdetails.component';
(window as any).html2canvas = html2canvas;


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isExpanded = false;
  public orderList_obj: any = []

  constructor(private apiService: ApiserviceService, private modalService: NgbModal) { }
  nav_position: string = 'end';

  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'end';

  }

  ngOnInit(): void {
    this.onpager(event);
    this.fn_distributerList();
    this.fn_employeeList();
  }
  length = 1000000;
  pageSize: number
  pageSizeOptions: number[] = [, 5, 10, 25, 100, 200, 500]
  onpager(event: any) {
    let param = {
      "intLimit": event.pageSize,
      "intPageNo": event.pageIndex,
      "strSortActive": this.sortedData,
      "strSort": this.sortname,
      "arrDistributerId": this.filterObj.arrDistributerId,
      "arrExecutiveId": this.filterObj.arrExecutiveId
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
    if (sort.direction == 'asc') {
      this.sortedData = 'ASC',
        this.sortname = sort.active
    } else {
      this.sortedData = 'DSC',
        this.sortname = sort.active

    }

  }
  // #################################### FILTER #################################
  public statusWise = [{ "strName": 'PENDING' }, { "strName": 'CONFRIM' }, { "strName": 'SHIPPED' }, { "strName": 'DELIVERED' }, { "strName": 'CANCEL' }, { "strName": 'RETURNED' }, { "strName": 'REFUNDED' }]
  public filterObj = { 'arrDistributerId': [], "arrExecutiveId": [] }
  public distlist = []
  public employee = []

  fn_distributerList() {
    let body = {

      "strType": "DISTRIBUTER",

    }
    this.apiService.fn_OrderPost('user/get_user', body, '3001').subscribe((body) => {
      // console.log(body)
      this.distlist = body['arrList']
    });

  }
  fn_employeeList() {
    let body = {

      "strType": "EMPLOYEE",

    }
    this.apiService.fn_OrderPost('user/get_user', body, '3001').subscribe((body) => {
      this.employee = body['arrList']
      // console.log(body)

    });
  }
  // =============================== get order details ========================================
  public orderdetails: any;
  openLg( id) {
    const modalRef = this.modalService.open(OrderdetailsComponent, { size: 'md', centered: true });
    modalRef.componentInstance.fromParent = id;

  }




}

