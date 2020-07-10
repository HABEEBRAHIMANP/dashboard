import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public materialList_obj:any[]
  private material: any = {
    "arrCollection":[
      {"strCollection":"cln_material","intLimit":10},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }

  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fn_materials();
  }
  fn_materials() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.material,{ headers }).subscribe((body) => {
        console.log(body)
        this.materialList_obj =body['cln_material']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg',centered:true });
  }

}
