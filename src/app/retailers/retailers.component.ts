import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core'
import { from } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent  {

 public arrRetailersList:any=[]
  constructor(public apiservuice: ApiserviceService,
    public router:Router) { }

  ngOnInit(): void {
  this.onpager(event);

  }
  public errors=[];
  length = 10;
  pageSize: number
  pageSizeOptions: number[] = [,5, 10, 25, 100,200,500]
  // ###############PAGINATOR
  // MatPaginator Output
  // pageEvent: PageEvent;
  onpager(event: any) {
    console.log(event.pageIndex)
    let param = {
      "strSort": '',
      "strSortActive": "DSC",
      "intLimit":event.pageSize,
      "intPageNo":event.pageIndex,
      "strType":"RETAILER",  

    }
    this.apiservuice.fn_OrderPost('user/get_user',param,'3001').subscribe(body=>{
      console.log(body)
      this.arrRetailersList = body['arrList']
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
