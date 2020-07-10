import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categoryList_obj:any[]
  private category: any = {
    "arrCollection":[
      {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }

  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fn_categoryList();
  }
  fn_categoryList() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.category,{ headers }).subscribe((body) => {
        // console.log(body)
        this.categoryList_obj =body['cln_category']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',centered:true });
  }

}
