import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { arrOrderList } from '../orders/demmy'
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditmodalproductComponent } from '../editmodalproduct/editmodalproduct.component';
import { DeleteProductComponent } from '../Modalpopup/delete-product/delete-product.component';
import { AddproductComponent } from '../productSec/addproduct/addproduct.component';
import { ProductDetailsComponent } from '../productSec/product-details/product-details.component';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'strAppInfo': 'TNT1' });


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  public prodGET_obj: any
  options: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  prodelete: any;
  constructor(private http: HttpClient, private route: Router,
    private modalServ: NgbModal, private apiService: ApiserviceService) {
  }
  private master: any = {
    "strCollection": "cln_brand",
    "strValue": "",
  }

  ngOnInit() {
    this.fn_productList();
    this.fn_filter_brand();
    this.fn_filtercate();
    this.fn_filterMaterial();
  }
  fn_productList() {
    let param = {
      "strSort": '',
      "strSortActive": "DSC",
    }
    this.apiService.fn_OrderPost('product/get_product', param).subscribe((body) => {
      this.prodGET_obj = body['arrList']
    });

  }
  fn_deleteProduct(pro) {
    this.prodelete = pro
    let param = {
      "arrDeleteId": [this.prodelete._id]
    }
    this.apiService.fun_apiDelete('product/delete_product', { "arrDeleteId": [this.prodelete._id] }, '3001').subscribe((body) => {
      console.log(this.prodelete)
    });
  }
  Openeditproduct(res) {
    const modalRef = this.modalServ.open(ProductDetailsComponent, { size: 'lg' });
    let data = res
    modalRef.componentInstance.fromParent = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {s
    // });
  }
  OpenDeleteDiloge(res) {
    const modalRef= this.modalServ.open(DeleteProductComponent, { size: 'md', centered: true })
    let data = res
    modalRef.componentInstance.fromParent = data;
  }
  closDilog() {
    this.modalServ.dismissAll();
  }
  openaddProduct() {
    this.modalServ.open(AddproductComponent, { size: 'xl' })
    // this.route.navigate( [ '/ mainui /addproduct', {outlets: { aux: ['sidebar']}}]);
  }
  Autocomplete() {
    this.apiService.fn_OrderPost('common/get_autocomplete', this.master ).subscribe((body) => {
      this.options = body['arrList']
    });

  }
  valueChanged(e) {
    this.master.strValue = e
    // console.log(this.master)
  }
  // ####################################SORT##############################

  // MatPaginator Inputs
  length = 100;
  pageSize: number
  pageSizeOptions: number[] = [5, 10, 25, 100]
  // ###############PAGINATOR
  // MatPaginator Output
  // pageEvent: PageEvent;
  onpager(event: any) {
    let param = {
      "strSortActive": this.sortedData,
      "strSort":this.sortname,
      "intLimit":event.pageSize,
      "intPageNo":event.pageIndex,
      "arrBrands": this.filterObj.arrBrands,
      "arrCategory":this.filterObj.arrCategory

    }
    this.apiService.fn_OrderPost('product/get_product', param).subscribe((body) => {
      this.prodGET_obj = body['arrList']
    console.log(param)  
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
  nav_position: string = 'end';

  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'end';

  }
// ################################################################FILTER ME FILTER ##################################################
  public filterbrand=[]
  fn_filter_brand(){
    let param = {

      "arrCollection":[
        {"strCollection":"cln_brand","intLimit":10}
      ]
    }
    this.apiService.fn_OrderPost('master/get_master',param).subscribe(res=>{
        this.filterbrand = res['cln_brand']
        console.log(res)
    })
  }
  public filtercategory=[]
  fn_filtercate(){
    let param = {

      "arrCollection":[
        {"strCollection":"cln_category","intLimit":10}
      ]
    }
    this.apiService.fn_OrderPost('master/get_master',param).subscribe(res=>{
      this.filtercategory = res['cln_category']
      console.log(res)
  })
  }

  public filtermaterial=[]
  fn_filterMaterial(){
    let param = {

      "arrCollection":[
        {"strCollection":"cln_material","intLimit":10}
      ]
    }
    this.apiService.fn_OrderPost('master/get_master',param).subscribe(res=>{
      this.filtermaterial = res['cln_material']
      console.log(res)
  })
  }
  public filterObj={'arrBrands':[],"arrCategory":[]}






}
