import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainuiComponent } from './mainui/mainui.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { OrdersComponent } from './orders/orders.component';
import { EmployeeComponent } from './employee/employee.component';
import { RetailersComponent } from './retailers/retailers.component';
import { DistributerComponent } from './distributer/distributer.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationComponent } from './notification/notification.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { EditmodalproductComponent } from './editmodalproduct/editmodalproduct.component';


const routes: Routes = [
  { path:'', redirectTo:'/mainui' ,pathMatch:'full'},
  {path:'login',component:LoginComponent},

  { path:'mainui',
    component:MainuiComponent,
    children:[
      { path:'',component:MainuiComponent},
      {path:'product', component:ProductComponent},
      {
        path: 'dashboard',
        component: DashbordComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
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
        path: 'modal',
        component: EditmodalproductComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
