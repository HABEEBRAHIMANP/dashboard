import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { EmployeeComponent } from './employee/employee.component';
import { RetailersComponent } from './retailers/retailers.component';
import { DistributerComponent } from './distributer/distributer.component';
import { NotificationComponent } from './notification/notification.component';
import { ReportsComponent } from './reports/reports.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LoginComponent } from './login/login.component';
import { MainuiComponent } from './mainui/mainui.component';
import { EditmodalproductComponent } from './editmodalproduct/editmodalproduct.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './Modalpopup/edit-product/edit-product.component';
import { DeleteProductComponent } from './Modalpopup/delete-product/delete-product.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddproductComponent } from './productSec/addproduct/addproduct.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from "@angular/material/input";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs';
import { MastersComponent } from './masters/masters/masters.component';
import { BrandComponent } from './masters/brand/brand.component';
import { CategoryComponent } from './masters/category/category.component';
import { MaterialComponent } from './masters/material/material.component';
import { SizeComponent } from './masters/size/size.component';
import { ColorComponent } from './masters/color/color.component';
import { ColorChromeModule } from 'ngx-color/chrome';

import { ChartsModule } from 'ng2-charts';
import { ProductDetailsComponent } from './productSec/product-details/product-details.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import {MatSortModule} from '@angular/material/sort';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { BulkUploadComponent } from './Modalpopup/bulk-upload/bulk-upload.component';
import { PapaParseModule } from 'ngx-papaparse';

import {MatTabsModule} from '@angular/material/tabs';

import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    OrdersComponent,
    EmployeeComponent,
    ProductComponent,
    RetailersComponent,
    DistributerComponent,
    NotificationComponent,
    ReportsComponent,
    AttendenceComponent,
    LoginComponent,
    MainuiComponent,
    EditmodalproductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddproductComponent,
    MastersComponent,
    BrandComponent,
    CategoryComponent,
    MaterialComponent,
    SizeComponent,
    ColorComponent,
    ProductDetailsComponent,
    OrderdetailsComponent,
    BulkUploadComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule,
    MatSidenavModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    ColorChromeModule,
    MatSnackBarModule,
    PapaParseModule,
    MatTabsModule,
     MatIconModule,
     MatListModule,
     MatSortModule,
     NgxDropzoneModule,
     


     


    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatPaginatorModule,
    
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
