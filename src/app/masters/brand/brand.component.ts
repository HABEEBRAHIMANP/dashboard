import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  public brandList_obj:any[]
  private brand: any = {
    "arrCollection":[
      {"strCollection":"cln_brand","intLimit":10},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }
  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fn_Brands();
  }
  fn_Brands() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.brand,{ headers }).subscribe((body) => {
        console.log(body)
        this.brandList_obj =body['cln_brand']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',centered:true });
  }
  

}
