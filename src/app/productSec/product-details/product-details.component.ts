import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpParams,HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {PageEvent} from '@angular/material/paginator';

const token = localStorage.getItem('strToken');

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, 'strAppInfo': 'TNT1' })
interface genders {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() fromParent;
  arrSizeStock = [];
  arrColorStock = [];
  public imageArray = [];
  public imagePreviewArray = [];
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
    console.log(this.fromParent);
    this.fn_getProductDetails();
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
    this.http.post('http://15.206.134.157:3000/product/get_product_details', { 'strProductId': this.fromParent._id }, { headers }).subscribe((body) => {
      this.details_obj = body

      console.log(body)
      // this.productD.push('strProductId',this.fromParent._id)

    });
  }


  //   fileProgress(fileInput: any) {
  //     this.fileData = <File>fileInput.target.files[0];
  //     this.preview();
  // }
  //   fileData: File = null;
  //   previewUrl: any = null;
  //   preview() {
  //     // Show preview 
  //     var mimeType = this.fileData.type;
  //     if (mimeType.match(/image\/*/) == null) {
  //       return;
  //     }

  //     var reader = new FileReader();
  //     reader.readAsDataURL(this.fileData);
  //     reader.onload = (_event) => {
  //       this.previewUrl = reader.result;
  //     }
  //   }
  form = this.objFormBuilder.group({
    strName: ['', Validators.required],
    strProductId: ['',Validators.required],
    dblMRP: ['',Validators.required],
    dblSellingPrice: ['',Validators.required],
    dblRetailerPrice: ['',Validators.required],
    strBrandId: ['',Validators.required],
    dblTotalStock: ['',Validators.required],
    strGenderCategory: ['',Validators.required],
    strCategoryId: ['',Validators.required],
    strDescription:['',Validators.required],
    arrImageUrl:[''],
    strUnit:['Qty',Validators.required],
    arrScheme:[[23,34] ],
    arrSizeStock: this.objFormBuilder.group({
      strName: ['',Validators.required],
      dblStock: ['',Validators.required]
    }),

    arrColorStock: this.objFormBuilder.group({
      strName: ['',Validators.required],
      dblStock: ['',Validators.required]
    })


    // SubCategory: [''],
    // Material: [''],
    // color: [''],
    // colorstock: [''],
    // description: [''],
    // image: ['']


  });
  updateProfile() {
    this.form.patchValue({
      image: this.urls
    });
    console.log(this.form.value)
    

  }


  image: File;
  resData: any;
  selectedFile = null;
  urls = [];
  onSelectFile(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    // if (event.target.files && event.target.files[0]) {
    //   var filesAmount = event.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     var reader = new FileReader();

    //     reader.onload = (event: any) => {
    //       // console.log(event.target.result);
    //       this.urls.push(event.target.result);
    //       const file = event.target.files
    //       this.imageArray.push(file);

    //     }

    //     reader.readAsDataURL(event.target.files[i]);

    //   }
    // }
  }
  images: File;
  public imageUrl: any

  onSubmit() {

    const payload = new FormData();
    payload.append('image', this.selectedFile, this.selectedFile.name);
    //   const formData = new FormData();
    //   for  (var i =  0; i <  this.imageArray.length; i++)  {  
    //     formData.append("images",  this.imageArray[i],'fileupload.png');
    // }
    // var formData: any = new FormData();
    // this.imageArray.forEach(img => {
    //   formData.append('images', this.imageArray[0]);
    // });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);

    // }
    // let images ={
    //   formData
    // }
    let params = new HttpParams().append('hh',this.form.value)
    params.toString



    this.apiService.fun_apiPostImage('file/files_upload', payload, '3001').subscribe((body) => {
      console.log(body)
      this.imageUrl = body['arrImageUrl'],
      // this.form.setValue({arrImageUrl: body['arrImageUrl']})
      // this.form.patchValue(this.arrColorStock:body['arrImageUrl'])
      // this.form.get(arrImageUrl).patchValue('fg');
      // this.form.addControl('arrImageUrl',body['arrImageUrl']);
      // this.form.controls['arrImageUrl'].setValue(body['arrImageUrl']);
      this.form.patchValue({arrImageUrl : body['arrImageUrl']});
    })


    if (this.imageUrl !== '')

      this.apiService.fn_OrderPost('product/create_product',this.form.value,'3001').subscribe((body) => {
        console.log(this.form.value)
        // this.form.value.arrImageUrl.append(this.imageUrl)
      })
  }

}
