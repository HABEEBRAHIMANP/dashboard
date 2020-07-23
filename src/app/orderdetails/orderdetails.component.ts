import { Component, OnInit, ViewChild, ElementRef, Input, ɵConsole } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
(window as any).html2canvas = html2canvas;
import { ApiserviceService } from '../apiservice.service';

interface Status {
  strOrderStatus: string;
  // viewValue: string;
}
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})


export class OrderdetailsComponent implements OnInit {
  @Input() fromParent;
  constructor(private apiService: ApiserviceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.openLg();
  }
  public orderdetails: any = {
    "strOrderStatus": '',
    
  }
  openLg() {
    let param = {
      "strOrderId": this.fromParent.strOrderId
    }
    this.apiService.fn_OrderPost('order/get_order_details', param, '3001').subscribe(body => {
      console.log(body, 'orderdetails')
      this.orderdetails = body
    })
  }
  closDilog() {
    this.modalService.dismissAll();
  }


  // ================================= PDF =======================
  @ViewChild('content1', { static: false }) content: ElementRef;


  public downloadPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }
  // ============================== ORDER UPDATE =================================
  fn_orderUpdate(data) {
    console.log(this.statusdetails)

    let param = {
      "strOrderId": data.strOrderId,
      "strOrderStatus":this.statusdetails.strOrderStatus
      
      // "strOrderStatus": data.strOrderStatus

    }
    this.apiService.fn_OrderPost('order/update_order', param, '3001').subscribe(res => {
      console.log(res)
    })
  }
  public statusdetails={
    'strOrderStatus':""
    
  }
  public status: any = [
    {'strOrderStatus' :'PENDING'},
    {'strOrderStatus' :'CONFIRM'},
    {'strOrderStatus' :'SHIPPED'},
    {'strOrderStatus' :'DELIVERED'},
    {'strOrderStatus' :'CANCEL'},
    {'strOrderStatus' :'RETURNED'},
    {'strOrderStatus' :'REFUNDED'}


  ]




 


}
