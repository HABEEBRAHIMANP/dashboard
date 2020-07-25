import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { ApiserviceService } from 'src/app/apiservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {
 errorMessage=false;
  files= [];
  
  @Input() fromParent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedCSVFileName: any;
  isCSV_Valid: boolean;
  constructor(
    private modalServ: NgbModal,
    private papa: Papa,
    private apiService: ApiserviceService,
    private http: HttpClient,
    private router: Router) { }
  ngOnInit(): void {
  }
  public errors =[];
  pageSize: 0;
  pageSizeOptions: number[] = [5, 10, 25, 100]
  test=[];
  length=this.test.length;
   arrImageUrl=[]
  // csv bulk upload
  handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
    let file = files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      let csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          results.data.forEach(objItem => {
            if (objItem.productTitle.length > 0 && objItem.productId.length > 0 && !objItem.productId.match("[.]") && objItem.description.length > 0 &&
              objItem.category.length > 0 && objItem.brand.length >0 && objItem.gender.length>0
              && objItem.mrp.length>0 && objItem.sellingPrice.length>0 && objItem.retailerPrice.length>0
              && objItem.target.length>0 && objItem.totalStock.length>0  && objItem.unit.length>0) {
              let image_number=Number(objItem.imageNumber.trim());
              console.log(image_number)
              this.arrImageUrl=[]
              for(let j=0;j<image_number;j++){
                let strImageUrl="https://axef.s3.ap-south-1.amazonaws.com/"+j+objItem.productId+"-"+(j+1)+".webp"
                this.arrImageUrl.push(strImageUrl)
              console.log(this.arrImageUrl)
              }
                let productDetails = {
                  strName: objItem.productTitle,
                  strProductId: objItem.productId,
                  strDescription: objItem.description,
                  strCategoryId: objItem.category,
                  strBrandId: objItem.brand,
                  strGenderCategory: objItem.gender,
                  dblMRP: objItem.mrp,
                  dblSellingPrice: objItem.sellingPrice,
                  dblRetailerPrice: objItem.retailerPrice,
                  strTargetType: objItem.target,
                  dblTotalStock: objItem.totalStock,
                  // intTotalSales: objItem.totalSales,
                  // intEstiDeliveryDays: objItem.estimatedDelivery,
                  strUnit: objItem.unit,
                  strSubCategory: objItem.subCategory,
                  arrSizeStock:objItem.size.split('/'),
                  arrColorStock:objItem.color.split('/'),
                  arrImageUrl:this.arrImageUrl
                };
                this.test.push(productDetails);
                console.log(productDetails.arrImageUrl)
             }
            });
            console.log(this.test);
            console.log(this.test.length)
            
          }
        });
      }
    }

//  image bulk select
  onSelect(event) {
    this.errorMessage=false;
    console.log(event);
    let imageName=event.addedFiles;
    // console.log(imageName[0].name.slice(0,-7))
    for(let i=0;i<this.test.length;i++){
      if(imageName[i].name.slice(0,-7)==this.test[i].strProductId || imageName[i].name.slice(0,-6 )==this.test[i].strProductId ){
        this.files.push(...event.addedFiles);
      }
      
      else{
        this.errorMessage=true;
       
      }
    }
    
}
// image bulk upload function
fn_imageUpload(){

      const formData = new FormData();
     let divider="#";
     
let strFilenames=""
  for (let i = 0; i < this.files.length; i++) { 
    let arrFilenameParts=this.files[i].name.split(".")
    strFilenames+=divider+arrFilenameParts[0]
    formData.append( arrFilenameParts[0],this.files[i],arrFilenameParts[0]);

    
    }
  // formData.append("strFilenames",strFilenames.toString())
   console.log(strFilenames);
   
    this.apiService.fun_apiPostImage('file/files_upload', formData, '3001',strFilenames).subscribe((body) => {
      console.log(body)
    },(error)=>{
      if(error){
        this.errors=error['error']
        if(this.errors['arrErrors'][0] == "INVALID_TOKEN_PROVIDED"){
          this.router.navigateByUrl('/login');
        }
      }
    })
    new Response(formData).text().then(console.log)
}
// image remove selected
onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
}
// csv bulk upload function
fn_bulkUpload(){
    let param={
      "arrProducts":this.test
    }
    this.apiService.fn_OrderPost('product/import_product',param,'3001').subscribe(res=>{
      console.log(res)
    },(error)=>{
      if(error){
        this.errors=error['error']
        if(this.errors['arrErrors'][0] == "INVALID_TOKEN_PROVIDED"){
          this.router.navigateByUrl('/login');
        }
      }
    })
  }
}
