import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })



@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {

  private brand: any = {
    "arrCollection":[
      {"strCollection":"cln_brand","intLimit":10},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }
  private  category :any={
    "arrCollection":[
      {"strCollection":"cln_category","intLimit":10},
    ]
  }

  constructor(private http: HttpClient,private modalService: NgbModal) { }
    selected = ''
    public brandList_obj:any[]
    public categoryList_obj:any[]


  ngOnInit(): void {
    
  }

  fn_Brands() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.brand,{ headers }).subscribe((body) => {
        // console.log(body)
        this.brandList_obj =body['cln_brand']
     });
     
  }
  fn_Category() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.category,{ headers }).subscribe((body) => {
        console.log(body)
        this.categoryList_obj =body['cln_category']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',centered:true });
  }
  model2(content3){
    this.modalService.open(content3,{size:'lg'})
  }
  

}
