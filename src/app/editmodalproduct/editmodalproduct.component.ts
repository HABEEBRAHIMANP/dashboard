import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';




import {
	ViewChildren,
	ElementRef,
	ChangeDetectorRef
} from '@angular/core';
import {
	FormBuilder,
	Validators
} from '@angular/forms';
import { ApiServiceNewService } from '../api-service-new.service';
import { Subject, fromEvent, merge, Observable } from 'rxjs';
import { FormValidator } from '../shared/validator/form-validator-function';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormControlName, FormGroup, FormArray } from '@angular/forms';
import { takeUntil, debounceTime, startWith, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-editmodalproduct',
	templateUrl: './editmodalproduct.component.html',
	styleUrls: ['./editmodalproduct.component.css']
})


export class EditmodalproductComponent implements OnInit, AfterViewInit {
	@ViewChild('instance') instance: NgbTypeahead;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	/**
   * FormCOntrol refference
   */
	@ViewChildren(FormControlName, { read: ElementRef })
	formControl: ElementRef[];
	strTitle = "Products";
	selectedItemId = "";
	imageChangedEvent: any = '';
	cropedImagePath: File;
	croppedImage: any = '';
	dataSet = [];
	strImageUrl = '';
	strImageUrls = [];
	images = [];
	strButtonName = 'Save';
	strOperation = 'Create';
	displayedColumns: string[] = ['position', 'strName', 'strGenderCategory', 'strCategoryId', 'strBrandId', 'functional-menu'];
	displayStock: string[] = ['position', 'strName', 'dblStock']
	varCreatedModified = {
		create_name: '',
		create_time: '',
		modified_name: '',
		modified_time: ''
	}
	filterBy = {
		Brand: [],
		Category: [],
		Shope: [],
		Location: [],
		Price: []
	}
	sortBy = {};
	selectedFilterBy = {
		arrBrand: [],
		arrCategory: [],
		arrShop: [],
		arrLocation: [],
		arrPrice: []
	}

	/**
	 * objInputData
	 */
	objInputData = {}
	/**
	 * Kill Observable on Destroy
	 */
	private objDestroyed$ = new Subject();
	/**
	 * Form Validator
	 */
	objFormValidator: any;
	/**
	 * Form Messages
	 */
	objFormMessages: any;
	/**
	 * Options Value
	 * @param result 
	 */
	formatter = (result: { strName: string }) => result['strName']
	/**
	 * Category Filter Options
	 */
	arrCategoryFilter;
	/**
	 * Brand Filter Options
	 */
	arrBrandFilter;
	/**
	 * Shop Filtered Options
	 */
	arrShopFilter;
	/**
	 * Location Filteration Options
	 */
	arrLocationFilter;
	/**
	 * Error Message
	 */
	strErrorMessage = '';
	objLocationForm = this.objFormBuilder.group({
		strName: ['', Validators.required],
		strDescription: ['', Validators.required],
		strCategoryId: ['', Validators.required],
		strShopId: ['', Validators.required],
		strBrandId: ['', Validators.required],
		strGenderCategory: ['', Validators.required],
		dblMRP: ['', Validators.required],
		dblSellingPrice: ['', Validators.required],
		dblTotalStock: ['', Validators.required],
		intTotalSales: ['', Validators.required],
		strUnit: ["Qty", Validators.required],
		objShopAddress: this.objFormBuilder.group({
			strLocation: ['', Validators.required],
			strAddress: ['', Validators.required],
			strMobileNo: ['', Validators.required],
			strPinCode: ['', Validators.required]
		}),
		objSizeStock: this.objFormBuilder.group({
			strName: [''],
			dblStock: ['']
		}),
		objColorStock: this.objFormBuilder.group({
			strName: [''],
			dblStock: ['']
		}),
	})
	arrSizeStock = [];
	strStockIndex = "";
	arrColorStock = [];
	strColorStockIndex = "";
	constructor(
		private objFormBuilder: FormBuilder,
		private modalService: NgbModal,
		private apiService: ApiServiceNewService,
		private objChgRef: ChangeDetectorRef
	) {
		this.objFormValidator = new FormValidator({
			"strName": {
				"required": "Name is required"
			},
			"strCategoryId": {
				"required": "Category is required"
			},
			"strShopId": {
				"required": "Shop is required"
			},
			"strBrandId": {
				"required": "Brand is required"
			},
			"strGenderCategory": {
				"required": "gender is required"
			},
			"strDescription": {
				"required": "Description is required"
			},
			"dblMRP": {
				"required": "MRP is required",
				mistmatch: "MRP Should not greater than selling price"
			},
			"dblSellingPrice": {
				"required": "Selling price is required",
				mistmatch: "Selling price should not greater than MRP"
			},
			"dblTotalStock": {
				"required": "Total stock is required"
			},
			"intTotalSales": {
				"required": "Total sale is required"
			},
			"strUnit": {
				"required": "Unit is required"
			},
			"strLocation": {
				"required": "Shop location is required"
			},
			"strAddress": {
				"required": "Shop address is required"
			},
			"strMobileNo": {
				"required": "Mobile number is required"
			},
			"strPinCode": {
				"required": "Pin code is required"
			}

		})
	}

	ngOnInit(): void {
		this.fun_getFilters();
		this.fetchProducts();
		console.log("filterBy", this.filterBy);
		/**
		 * Shop Filtered Options
		 */
		this.arrShopFilter = (text$: Observable<string>) =>
			text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map(term => (term === '' ? []
					: this.filterBy.Shope.filter(v => v.strName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
				tap((val => {
					if (!val.length) {
						this.objLocationForm.get('strShopId').setValue('')
					}
				}))
			);


		/**
		 * Location Filtered Options
		 */
		this.arrLocationFilter = (text$: Observable<string>) =>
			text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map(term => (term === '' ? []
					: this.filterBy.Location.filter(v => v.strName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
				tap((val => {
					if (!val.length) {
						this.objLocationForm.get('strLocation').setValue('')
					}
				}))
			);
		/**
		 * Category Filtered Options
		 */
		this.arrCategoryFilter = (text$: Observable<string>) =>
			text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map(term => (term === '' ? []
					: this.filterBy.Category.filter(v => v.strName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
				tap((val => {
					if (!val.length) {
						this.objLocationForm.get('strCategoryId').setValue('')
					}
				}))
			);
		/**
		 * Brand Filtered Options
		 */
		this.arrBrandFilter = (text$: Observable<string>) =>
			text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map(term => (term === '' ? []
					: this.filterBy.Brand.filter(v => v.strName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
				tap((val => {
					if (!val.length) {
						this.objLocationForm.get('strBrandId').setValue('')
					}
				}))
			);
	}

	ngAfterViewInit() {
		const controlBlurs = this.formControl.map((formControl: ElementRef) => {
			return fromEvent(formControl.nativeElement, 'blur')
		});
		merge(this.objLocationForm.valueChanges, ...controlBlurs)
			.pipe(
				takeUntil(this.objDestroyed$),
				debounceTime(200)
			).subscribe(() => {
				this.objFormMessages = this.objFormValidator.processMessage(
					this.objLocationForm
				)
				this.objChgRef.detectChanges()
			})


	}
	/**
	 * Get Shop Form
	 */
	get objShopAddress(): FormGroup {
		return this.objLocationForm.get('objShopAddress') as FormGroup;
	}


	/**
	 * Select Autocomplete Item
	 * @param objEvent 
	 * @param formControlName 
	 */
	selectedItem(objEvent, formControlName) {
		setTimeout(() => {
			this.objLocationForm.get(formControlName).setValue(objEvent.item.strName)
		}, 50);
	}
	/**
	 * Shop Input Field Focus out function
	 * If Value is not valid clear Input Value
	 * @param objEvent 
	 */
	checkValidShop({ target }) {
		let blnValid = false;
		this.filterBy.Shope.forEach((shop) => {
			if (shop.strName === target.value) {
				blnValid = true
			}
		})
		if (!blnValid) {
			this.objLocationForm.get('strShopId').setValue('')
		}
	}
	/**
	 * Category Input Field Focus out function
	 * If Value is not valid clear Input Value
	 * @param param0 
	 */
	checkValidCategory({ target }) {
		let blnValid = false;
		this.filterBy.Category.forEach((shop) => {
			if (shop.strName === target.value) {
				blnValid = true
			}
		})
		if (!blnValid) {
			this.objLocationForm.get('strCategoryId').setValue('')
		}
	}
	/**
	 * Brannd Input Field Focus out function
	 * If Value is not valid clear Input Value
	 * @param param0 
	 */
	checkValidBrand({ target }) {
		let blnValid = false;
		this.filterBy.Brand.forEach((shop) => {
			if (shop.strName === target.value) {
				blnValid = true
			}
		})
		if (!blnValid) {
			this.objLocationForm.get('strBrandId').setValue('')
		}
	}
	/**
	  * Location Input Field Focus out function
	  * If Value is not valid clear Input Value
	  * @param objEvent 
	  */
	checkValidLocation({ target }) {
		let blnValid = false;
		this.filterBy.Location.forEach((location) => {
			if (location.strName === target.value) {
				blnValid = true
			}
		})
		if (!blnValid) {
			this.objShopAddress.get('strLocation').setValue('')
		}
	}

	selectedLocation(objEvent) {
		setTimeout(() => {
			const formGroup = this.objLocationForm.get('objShopAddress') as FormGroup;
			formGroup.get('strLocation').setValue(objEvent.item.strName)
		}, 50);
	}

	/**
	 * Category Filter
	 */
	private filterCategory(value: any): any[] {
		const filterValue = value.toLowerCase();
		return ['One', 'Two', 'Three'].filter(option => option.toLowerCase().indexOf(filterValue) === 0);;
	}

	fun_getFilters() {
		let parameter: Object = {
			"arrCollection": [{
				"strCollection": "cln_shop",
				// "intLimit": 10
			},
			{
				"strCollection": "cln_category",
				// "intLimit": 10
			},
			{
				"strCollection": "cln_brand",
				// "intLimit": 10
			},
			{
				"strCollection": "cln_location",
				// "intLimit": 10
			}
			]
		}
		this.apiService.fun_apiPost('master/get_master', parameter).subscribe(res => {
			this.filterBy.Brand = res.cln_brand ? res.cln_brand : [];
			this.filterBy.Category = res.cln_category ? res.cln_category : [];
			this.filterBy.Shope = res.cln_shop ? res.cln_shop : [];
			this.filterBy.Location = res.cln_location ? res.cln_location : [];
			this.filterBy.Price = res.strAmountLimit ? res.strAmountLimit : [];
		}, err => { })


	}
	fetchProducts() {
		let param = {
			// "strSort": "strName",
			// "strSortActive": "ASC",
			// "intLimit": 2,
			// "arrBrand": [],
			// "arrCategory": [],
			// "arrProductName": [],
			// "intAmountLimit": 65000
		}
		this.apiService.fun_apiPost('product/get_product', param).subscribe(res => {
			console.log("res", res);

			this.dataSet = res.arrList ? res.arrList : [];
		}, err => {

		});
	}
	objEventFromHeader(objEvent, content3) {
		if (objEvent.strOperation == 'ADD_BUTTON') {
			this.modalService.open(content3, {
				size: 'lg',
				keyboard: false
			});
			this.varCreatedModified = {
				create_name: '',
				create_time: '',
				modified_name: '',
				modified_time: ''
			}
			this.objLocationForm.reset();
			this.setVariable('SAVE');
		}
	}
	setVariable(strOperation, strImageUrl = '') {
		if (strOperation === 'SAVE') {
			this.strButtonName = 'Save';
			this.strOperation = 'Create';
			// this.strImageUrl=strImageUrl
		} else {
			this.strButtonName = 'Update';
			this.strOperation = 'Update';
			// this.strImageUrl=strImageUrl
		}
	}
	editThisItem(index, content3) {
		this.setVariable('UPDATE')
		console.log(this.dataSet[index]);
		this.strImageUrls = Object.values(this.dataSet[index].objImageUrls);
		this.selectedItemId = this.dataSet[index]._id;
		this.objInputData = { ...this.dataSet[index] }
		// this.arrColorStock=this.objInputData.
		this.varCreatedModified = {
			create_name: this.dataSet[index].strCreatedUser_name,
			create_time: this.dataSet[index].strCreatedTime,
			modified_name: this.dataSet[index].strModifiedUser_name,
			modified_time: this.dataSet[index].strModifiedTime
		}
		this.modalService.open(content3, {
			size: 'lg',
			keyboard: false
		});
		this.objLocationForm.patchValue(this.dataSet[index]);
		// this.setVariable('UPDATE', this.dataSet[index]['strImgUrl_0']);
	}
	handleMouseOver(row) {
		const position = row.position;
		this.dataSet.map((data: any, index) => {
			if (data.position === position) {
				data.show = true;
			}
		});
	}
	handleMouseLeave(row) {
		const position = row.position;
		this.dataSet.map((data: any) => {
			if (data.position === position) {
				data.show = false;
			}
		});
	}
	deleteThis(index) {
		this.strImageUrls.splice(index, 1)
		this.images.splice(index, 1)
	}
	cropThis() {
		if (this.strImageUrls.includes(this.croppedImage)) { console.log("same image") }
		else {
			this.strImageUrls.push(this.croppedImage);
			this.images.push(this.cropedImagePath);
		}
	}
	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;
		this.cropedImagePath = event.target.files[0];
	}
	// imageCropped(event: ImageCroppedEvent) {
	//   this.croppedImage = event.base64;
	// }
	imageLoaded() {
		// show cropper
	}
	cropperReady() {
		// cropper ready
	}
	loadImageFailed() {
		// show message
	}
	getMoreproductInfo(_id?) {
		this.apiService.fun_apiPost('product/get_product_details', { strProductId: this.selectedItemId }).subscribe(res => { }, err => { });
	};
	deleteThisItem(index) {
		let parameter = {
			arrDeleteId: this.dataSet[index]._id
		};
		this.apiService.fun_apiPost('product/delete_product', parameter, '4001').subscribe(res => {
			// if success emit true
			this.fetchProducts();
		}, err => {
			//show error msg
		});
	}
	clearForm() {
		this.objLocationForm.reset();
		this.setVariable('SAVE');
		this.strStockIndex = "";
		this.strColorStockIndex = "";

	}
	saveThis() {
		console.log(this.objLocationForm.controls);

		if (this.objLocationForm.status === 'INVALID') {
			this.objLocationForm.markAllAsTouched();
			this.objFormMessages = {
				...this.objFormValidator.processMessage(
					this.objLocationForm
				)
			}
			return
		}
		/**
		 * Check Stock add
		 */
		if (!this.arrSizeStock.length || !this.arrSizeStock.length) {
			this.strErrorMessage = "Please add stock";
			return;
		}

		/**
		 * FINAL FORM DATA
		 */
		if (this.selectedItemId) {
			//update
			if (this.images.length > 0) {
				// new image uploaded
				this.uploadBycheck();
			} else {
				//no new images so direct upload
				const objFinalData = { ...this.objLocationForm.value, ...{ arrSizeStock: this.arrSizeStock, arrColorStock: this.arrColorStock } };
				let parameter = { ...this.objInputData, ...objFinalData }
				Object.assign(parameter, {
					strDocId: this.selectedItemId,
					"strOperationType": "UPDATE"
				})
				this.funSaveUpdateItem(parameter, 'product/create_product')

			}
		} else {
			//create
			this, this.uploadBycheck();
		}

	}

	uploadBycheck() {
		const objFinalData = { ...this.objLocationForm.value, ...{ arrSizeStock: this.arrSizeStock, arrColorStock: this.arrColorStock } }

		let imageData = {
			images: this.images
		}
		if (this.images.length > 0) {
			this.apiService.fun_apiPostImage('file/files_upload', imageData.images, '4001').subscribe(res => {
				let parameter = { ...this.objInputData, ...objFinalData }
				//you assign form data to this parameter
				Object.assign(parameter, {
					objImageUrls: {
						strImgUrl_0: res.strImgUrl_0 ? res.strImgUrl_0 : '',
						strImgUrl_1: res.strImgUrl_1 ? res.strImgUrl_1 : '',
						strImgUrl_2: res.strImgUrl_2 ? res.strImgUrl_2 : '',
						strImgUrl_3: res.strImgUrl_3 ? res.strImgUrl_3 : '',
						strImgUrl_4: res.strImgUrl_4 ? res.strImgUrl_4 : '',
						strImgUrl_5: res.strImgUrl_5 ? res.strImgUrl_5 : '',
					}
				});
				this.funSaveUpdateItem(parameter, 'product/create_product')
			}, err => { })
		} else {
			console.log("upload atleast one image");
		}
	}
	funSaveUpdateItem(parameter, url) {
		this.apiService.fun_apiPost(url, parameter, '4001').subscribe(res => {
			this.modalService.dismissAll();
			this.apiService.openSnackbar('Save Success', "Success");
			this.fetchProducts();
			// this.modal.close()
			// this.emitor.emit(true)
		}, err => {
			//show error response
		});
	}
	dropDownChange(item, event) {
		switch (item) {
			case 'category':
				console.log(event);
				break;

			default:
				break;
		}
	}

	/**
	 * Add Size stock
	 */

	get objSizeStock(): FormGroup {
		return this.objLocationForm.get('objSizeStock') as FormGroup
	}
	addSizeStock() {
		if (this.objSizeStock.value.strName && this.objSizeStock.value.dblStock) {
			if (this.strStockIndex === "")
				this.arrSizeStock.push(this.objSizeStock.value);
			else
				this.arrSizeStock[this.strStockIndex] = this.objSizeStock.value;
			this.objSizeStock.reset();
			this.strStockIndex = "";
			console.log(this.objLocationForm, this.arrSizeStock)
		}
	}
	editStock(i) {
		this.objSizeStock.patchValue(this.arrSizeStock[i]);
		this.strStockIndex = i;
	}
	deleteStock(i) {
		this.arrSizeStock.splice(i, 1);
	}


	/**
	* Add Coloe stock
	*/

	get objColorStock(): FormGroup {
		return this.objLocationForm.get('objColorStock') as FormGroup
	}
	addColorStock() {
		if (this.objColorStock.value.strName && this.objColorStock.value.dblStock) {
			if (this.strStockIndex === "")
				this.arrColorStock.push(this.objColorStock.value);
			else
				this.arrColorStock[this.strStockIndex] = this.objColorStock.value;
			this.objColorStock.reset();
			this.strStockIndex = "";
		}
	}
	editColorStock(i) {
		this.objColorStock.patchValue(this.arrColorStock[i]);
		this.strStockIndex = i;
	}
	deleteColorStock(i) {
		this.arrColorStock.splice(i, 1);
	}

	/**
	 * Check Selling Price and MRP
	 * @param param0 
	 */
	checkMRP({ target }) {
		const sellingPrice = +this.objLocationForm.value.dblSellingPrice;
		if (sellingPrice) {
			if (+target.value < sellingPrice) {
				this.objLocationForm.get('dblMRP').setErrors({
					mistmatch: true
				})
				this.objLocationForm.get('dblMRP').markAsTouched();
				this.objFormMessages = this.objFormValidator.processMessage(
					this.objLocationForm
				)
			}
		}
	}

	/**
	  * Check Selling Price and MRP
	  * @param param0 
	  */
	checkSellingPrice({ target }) {
		const MRP = +this.objLocationForm.value.dblMRP;
		if (MRP) {
			if (+target.value > MRP) {
				this.objLocationForm.get('dblSellingPrice').setErrors({
					mistmatch: true
				})
				this.objLocationForm.get('dblSellingPrice').markAsTouched();
				this.objFormMessages = this.objFormValidator.processMessage(
					this.objLocationForm
				)
			}
		}
	}

}

