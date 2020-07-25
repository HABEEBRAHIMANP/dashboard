import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '.././apiservice.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-editmodalproduct',
	templateUrl: './editmodalproduct.component.html',
	styleUrls: ['./editmodalproduct.component.css']
})


export class EditmodalproductComponent implements OnInit {
	constructor(private apiservice: ApiserviceService,
		public router :Router) { }
	options: string[];
	ngOnInit() {
		// this.Autocomplete();
	}
	public errors=[];
	public productObj: any = {}
	fn_svaeProduct() {
		console.log(this.productObj)
	}
	public strcolvalue="";
	public param = {
		"strCollection":this.strcolvalue,
		"strValue": "",
	}
	Autocomplete(e) {
		this.strcolvalue = e;
		this.apiservice.fn_OrderPost('common/get_autocomplete', this.param).subscribe((body) => {
			this.options = body['arrList']

			// console.log(body)

		},(error)=>{
			if(error){
			  this.errors=error['error']
			  if(this.errors['arrErrors'][0] == "INVALID_TOKEN_PROVIDED"){
				this.router.navigateByUrl('/login');
			  }
			}
		  });
	}
	valueChanged(e) {
		this.param.strValue = e
		// console.log(this.master)
	  }
}

