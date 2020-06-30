import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AttendenceComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path:'dashboard',
        component:DashbordComponent
      },
      {
        path:'orders',
        component:OrdersComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'employee',
        component:EmployeeComponent
      },
      {
      path:'retailer',
      component:RetailersComponent
      },
      {
      path:'distributer',
      component:DistributerComponent
      },
      {
      path:'reports',
      component:ReportsComponent
      },
      {
      path:'notification',
      component:NotificationComponent
      },
      {
      path:'attendence',
      component:AttendenceComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
