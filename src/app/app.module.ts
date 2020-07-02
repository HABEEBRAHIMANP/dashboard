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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashbordComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'retailer',
        component: RetailersComponent
      },
      {
        path: 'distributer',
        component: DistributerComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'attendence',
        component: AttendenceComponent
      },
      {
        path: 'mainui',
        component: MainuiComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'modal',
        component: EditmodalproductComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
