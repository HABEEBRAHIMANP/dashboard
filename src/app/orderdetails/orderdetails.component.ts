import { Component, OnInit ,ViewChild,ElementRef, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
(window as any).html2canvas = html2canvas;
import { ApiserviceService } from '../apiservice.service';

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
    public orderdetails: any;
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
    @ViewChild('content1', {static: false}) content: ElementRef;


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



 


}
