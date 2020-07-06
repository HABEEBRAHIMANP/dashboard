import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
