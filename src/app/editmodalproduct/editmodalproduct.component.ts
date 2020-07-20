import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '.././apiservice.service';


@Component({
	selector: 'app-editmodalproduct',
	templateUrl: './editmodalproduct.component.html',
	styleUrls: ['./editmodalproduct.component.css']
})


export class EditmodalproductComponent implements OnInit {
	constructor(private apiservice: ApiserviceService) { }
	options: string[];
	ngOnInit() {
		// this.Autocomplete();
	}
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

		});
	}
	valueChanged(e) {
		this.param.strValue = e
		// console.log(this.master)
	  }
}

