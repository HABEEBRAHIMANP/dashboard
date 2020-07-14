import { Component, OnInit,ViewChild } from '@angular/core';
import { arrOrderList } from '../orders/demmy'
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EditmodalproductComponent } from '../editmodalproduct/editmodalproduct.component';
import { DeleteProductComponent } from '../Modalpopup/delete-product/delete-product.component';
import { AddproductComponent } from '../productSec/addproduct/addproduct.component';
import { ProductDetailsComponent } from '../productSec/product-details/product-details.component';
import {Sort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator';

const headers = new HttpHeaders({'Content-Type': 'application/json','strAppInfo': 'TNT1'});
      

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public prodGET_obj: any=[];
  sortedData:any= [];
  options: string[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  prodelete: any;
  constructor(private http: HttpClient,private route: Router,
    private modalServ: NgbModal,private apiService: ApiserviceService) { 
      this.sortedData = this.prodGET_obj.slice();
    }
    private master: any = {
      "strCollection": "cln_brand",
      "strValue": "",
    }

  ngOnInit(){
    this.fn_productList();
    console.log(this.pageEvents)
  }
  fn_productList() {
    let param ={
      "strSort":"strName",
      "strSortActive":"DSC",
    }
    this.apiService.fn_OrderPost('product/get_product',param).subscribe((body) => {
        this.prodGET_obj=body['arrList']
     });
     
  }
  fn_deleteProduct(pro){
    this.prodelete = pro
    let param = {
      "arrDeleteId":[this.prodelete._id]
    }
    this.apiService.fun_apiDelete('product/delete_product',{"arrDeleteId":[this.prodelete._id]},'3001').subscribe((body)=>{
      console.log(this.prodelete)
    });
  }
  Openeditproduct(res){
    const modalRef= this.modalServ.open(ProductDetailsComponent,{size:'lg'});
    let data = res
    modalRef.componentInstance.fromParent = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {s
    // });
  }
  OpenDeleteDiloge(){
    this.modalServ.open(DeleteProductComponent,{size:'md',centered:true})
  }
  closDilog(){
    this.modalServ.dismissAll();
  }
  openaddProduct(){
    this.modalServ.open(AddproductComponent, {size:'xl'})
    // this.route.navigate( [ '/ mainui /addproduct', {outlets: { aux: ['sidebar']}}]);
  }
  Autocomplete() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.master, { headers }).subscribe((body) => {
      this.options = body['arrList']});

  }
  valueChanged(e) {
    this.master.strValue = e
    // console.log(this.master)
  }
  // ####################################SORT##############################
  sortData(sort: Sort) {
    const data = this.prodGET_obj.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }
    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 10]
  // ###############PAGINATOR
    // MatPaginator Output
    pageEvents: PageEvent;
    
 
}
