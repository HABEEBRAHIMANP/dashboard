import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public imageArray = [];
  public imagePreviewArray = [];
  public popover;

  private master: any = {
    "strCollection": "cln_brand",
    "strValue": "",
  }
  private category: any = {
    "strCollection": "cln_category",
    "strValue": "",
  }
  private categorySub: any = {
    "strCollection": "cln_sub_category",
    "strValue": "",
    "objCondition": { "strParentCategory": "" }
  }
  private material: any = {
    "strCollection": "cln_material",
    "strValue": ""
  }

  private color: any = {
    "arrCollection": [
      { "strCollection": "cln_color", "intLimit": 10 }
      // { "strCollection": "cln_category", "intLimit": 10 },
      // { "strCollection": "cln_sub_category", "objCondition": { "strParentCategory": "Women" } }
    ]

  }


  constructor(private http: HttpClient, private modalServ: NgbModal) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.Autocomplete();
    this.AutocompleteCate();
    this.Autocompletesub();
    this.materials()
    this.fn_color();
  }
  onFileInput(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.imageArray.push(file);
      const reader = new FileReader();
      reader.onload = e => this.imagePreviewArray.push(reader.result);
      reader.readAsDataURL(file);
    }
  }
  fn_remove_img(index) {
    this.imagePreviewArray.splice(index, 1);
    this.imageArray.splice(index, 1);
  }
  public greeting: any
  public changeGreeting(greeting: any): void {
    const isOpen = this.popover.isOpen();
    this.popover.close();
    if (greeting !== this.greeting || !isOpen) {
      this.greeting = greeting;
      this.popover.open(greeting);
    }
  }
  // ################## AUTO COMPOLETE ###############
  myControl = new FormControl();
  control1 = new FormControl();

  options: string[];
  categorymain: string[];
  categorysub: string[];
  materialList: string[];
  colorpicker: any = []


  filteredOptions: Observable<string[]>;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  Autocomplete() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.master, { headers }).subscribe((body) => {
      this.options = body['arrList']

      // console.log(body)

    });
  }
  valueChanged(e) {
    this.master.strValue = e
    console.log(this.master)
  }
  AutocompleteCate() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.category, { headers }).subscribe((body) => {
      this.categorymain = body['arrList'];

      // console.log(body)

    });
  }
  valueChangedCate(e) {
    this.category.strValue = e;
    console.log(this.category);
  }
  Autocompletesub() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.categorySub, { headers }).subscribe((body) => {
      this.categorysub = body['arrList'];

      // console.log(body)

    });
  }
  valueChangedsub(e) {
    this.categorySub.strValue = e;
    this.categorySub.objCondition.strParentCategory = this.category.strValue;
    console.log(this.categorySub);
  }

  materials() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.material, { headers }).subscribe((body) => {
      this.materialList = body['arrList'];
      // console.log(body)

    });
  }
  valuechangeMaterial(e) {
    this.material.strValue = e;
    console.log(this.material);
  }

  fn_color() {
    this.http.post('http://15.206.134.157:3000/master/get_master', this.color, { headers }).subscribe((body) => {
      console.log(body)
      this.colorpicker = body['cln_color']


    });
  }
  closDilog() {
    this.modalServ.dismissAll();
  } 
}
