import { Component, OnInit } from '@angular/core';
import { arrOrderList } from '../orders/demmy'
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EditmodalproductComponent } from '../editmodalproduct/editmodalproduct.component';
import { DeleteProductComponent } from '../Modalpopup/delete-product/delete-product.component';
import { AddproductComponent } from '../productSec/addproduct/addproduct.component';
import { ProductDetailsComponent } from '../productSec/product-details/product-details.component';

const headers = new HttpHeaders({'Content-Type': 'application/json','strAppInfo': 'TNT1'});
      

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public prodGET_obj: any=[];
  prodelete: any;
  constructor(private http: HttpClient,private route: Router,
    private modalServ: NgbModal) { 

    }

  ngOnInit(){
    this.fn_productList();
  }
  fn_productList() {
    this.http.post('http://15.206.134.157:3000/product/get_product',this.prodGET_obj,{ headers }).subscribe((body) => {
        this.prodGET_obj=body['arrList']
     });
     
  }
  fn_deleteProduct(pro){
    this.prodelete = pro
    this.http.post('http://3.7.150.37:3001/product/delete_product',this.prodelete,{ headers}).subscribe((body)=>{
      // console.log(body)
    });
  }
  Openeditproduct(res){
    const modalRef= this.modalServ.open(ProductDetailsComponent,{size:'xl'});
    let data = res
    modalRef.componentInstance.fromParent = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {
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

 
}
