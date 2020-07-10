import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  public sizeList_obj:any[]
  private size: any = {
    "arrCollection":[
      {"strCollection":"cln_size","intLimit":10},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }

  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fn_Size();
  }
  fn_Size() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.size,{ headers }).subscribe((body) => {
        console.log(body)
        this.sizeList_obj =body['cln_size']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'sm',centered:true });
  }

}
