import { Component, OnInit } from '@angular/core';
import { arrOrderList } from '../orders/demmy'
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EditmodalproductComponent } from '../editmodalproduct/editmodalproduct.component';
import { DeleteProductComponent } from '../Modalpopup/delete-product/delete-product.component';

const headers = new HttpHeaders({'Content-Type': 'application/json','strAppInfo': 'TNT1'});
      

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public prodGET_obj: any=[]
  prodelete: any;
  constructor(private http: HttpClient,
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
  Openeditproduct(){
    this.modalServ.open(EditmodalproductComponent,{size:'md'})
  }
  OpenDeleteDiloge(){
    this.modalServ.open(DeleteProductComponent,{size:'md',centered:true})
  }
  closDilog(){
    this.modalServ.dismissAll();
  }

 
}
