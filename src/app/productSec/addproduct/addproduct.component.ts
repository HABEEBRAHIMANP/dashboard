


import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })
interface genders {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  @Input() fromParent;

  arrSizeStock = [];
  arrColorStock = [];
  public popover;
  // private productD:any={
  //   "strProductId":this.fromParent._id
  // }



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


  constructor(private http: HttpClient,
    private modalServ: NgbModal,
    private objFormBuilder: FormBuilder,
    private apiService: ApiserviceService) { }

  public imageUrls: any = ''
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
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
    this.fn_size();
    console.log(this.fromParent);
    this.fn_getProductDetails();
    this.fn_product();
    console.log(this.fromParent)

    // console.log(this.productD)


  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  // ################## AUTO COMPOLETE ###############
  myControl = new FormControl();
  control1 = new FormControl();
  details_obj: any = []
  options: string[];
  categorymain: string[];
  categorysub: string[];
  materialList: string[];
  colorpicker: any = [];
  private dataform: any[]


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
    // console.log(this.master)
  }
  AutocompleteCate() {
    this.http.post('http://15.206.134.157:3000/common/get_autocomplete', this.category, { headers }).subscribe((body) => {
      this.categorymain = body['arrList'];
      let hdhd = this.fromParent._id

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
    // console.log(this.material);
  }

  fn_color() {
    this.http.post('http://15.206.134.157:3000/master/get_master', this.color, { headers }).subscribe((body) => {
      // console.log(body)
      this.colorpicker = body['cln_color']


    });
  }
  closDilog() {
    this.modalServ.dismissAll();
  }

  gender: genders[] = [
    { value: 'none', viewValue: 'none' },
    { value: 'men', viewValue: 'men' },
    { value: 'women', viewValue: 'women' }
  ];

  fn_getProductDetails() {
    this.apiService.fn_OrderPost('product/get_product_details', { 'strProductId': this.fromParent._id }).subscribe((body) => {
      this.details_obj = body

      console.log(body)
      // this.productD.push('strProductId',this.fromParent._id)

    });
  }



  form = this.objFormBuilder.group({
    strName: ['', Validators.required],
    strProductId: ['', Validators.required],
    dblMRP: ['', Validators.required],
    dblSellingPrice: ['', Validators.required],
    dblRetailerPrice: ['', Validators.required],
    strBrandId: ['', Validators.required],
    dblTotalStock: ['', Validators.required],
    strGenderCategory: ['', Validators.required],
    strCategoryId: ['', Validators.required],
    strDescription: ['', Validators.required],
    strUnit: ['', Validators.required],
    arrScheme: [[]],
    arrSizeStock: this.objFormBuilder.group({
      strName: ['', Validators.required],
      dblStock: ['', Validators.required]
    }),

    arrColorStock: this.objFormBuilder.group({
      strName: ['', Validators.required],
      dblStock: ['', Validators.required]
    })



  });


  public sizeList_obj = []

  fn_size() {

    let size = {
      "arrCollection": [
        { "strCollection": "cln_size", "intLimit": 10 },]
    }
    this.apiService.fn_OrderPost('master/get_master', size).subscribe((body) => {
      console.log(body)
      this.sizeList_obj = body['cln_size']
    });
  }
  // ###################################### IMAGEE UPLOAD   ###########################
  public imageArray = [];
  public imagePreviewArray = [];





  fn_remove_img(index) {
    this.imagePreviewArray.splice(index, 1);
    this.imageArray.splice(index, 1);
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

  fn_reg_comp() {
    const formData = new FormData();
    console.log(this.form.value)
    this.imageArray.forEach(img => {
      formData.append('image', img);
      console.log(img.name);
      this.apiService.fun_apiPostImage('file/files_upload', formData, '3001').subscribe((body) => {
        console.log(body)
        if(body['blnAPIStatus']	= true){

          let parameter = { ...this.form.value }

          Object.assign(parameter, { arrImageUrl: body['arrImageUrl'] })
  

            setTimeout(() => {
              this.apiService.fn_OrderPost('product/create_product', parameter, '3001').subscribe(body => {
                console.log(this.form.value) 
              });
            }, 400);
        }
      });





    })
  }




  // _______________________________________END_____________________________________________________________________

  public productObj: any = {}
  fn_product() {
    console.log(this.productObj)
  }

  public fieldArray: Array<any> = [];
  public newAttribute: any = {};





  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  fn_check(){
    console.log(this.form.value)
  }



}

