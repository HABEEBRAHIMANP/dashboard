import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorEvent } from 'ngx-color';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  public ColorEvent: any
  public colorList_obj:any[]
  private color: any = {
    "arrCollection":[
      {"strCollection":"cln_color"},
      // {"strCollection":"cln_category","intLimit":10},
      // {"strCollection":"cln_sub_category","objCondition":{"strParentCategory":"Women"}}
     ]
  }
  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fn_Color();
  }
  fn_Color() {
    this.http.post('http://15.206.134.157:3000/master/get_master',this.color,{ headers }).subscribe((body) => {
        console.log(body)
        this.colorList_obj =body['cln_color']
     });
     
  }
  openLg(content) {
    this.modalService.open(content, { size: 'md',centered:true });
  }
  handleChange($event: ColorEvent) {
    this.ColorEvent = $event.color.hex
    console.log($event.color.hex)
  }

}
