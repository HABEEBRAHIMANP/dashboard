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
import { AddproductComponent } from './productSec/addproduct/addproduct.component';
import { MastersComponent } from './masters/masters/masters.component';
import { BrandComponent } from './masters/brand/brand.component';
import { CategoryComponent } from './masters/category/category.component';
import { MaterialComponent } from './masters/material/material.component';
import { SizeComponent } from './masters/size/size.component';
import { ColorComponent } from './masters/color/color.component';
import { ProductDetailsComponent } from './productSec/product-details/product-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'mainui', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'mainui',
    component: MainuiComponent,
    children: [
      { path: 'dashboard', component: DashbordComponent,outlet: 'sidebar' },
      { path: 'product', component: ProductComponent, outlet: 'sidebar' },
      {
        path: '',
        component: DashbordComponent, outlet: 'sidebar'
      },
      {
        path: 'orders',
        component: OrdersComponent, outlet: 'sidebar'
      },
      {
        path: 'employee',
        component: EmployeeComponent, outlet: 'sidebar'
      },
      {
        path: 'retailer',
        component: RetailersComponent, outlet: 'sidebar'
      },
      {
        path: 'distributer',
        component: DistributerComponent, outlet: 'sidebar'
      },
      {
        path: 'reports',
        component: ReportsComponent, outlet: 'sidebar'
      },
      {
        path: 'notification',
        component: NotificationComponent, outlet: 'sidebar'
      },
      {
        path: 'attendence',
        component: AttendenceComponent, outlet: 'sidebar'
      },
      {
        path: 'modal',
        component: EditmodalproductComponent, outlet: 'sidebar'
      },
      {
        path: 'addproduct',
        component: ProductDetailsComponent, outlet: 'sidebar'
      },
      {
        path: 'masters',
        component: MastersComponent, outlet: 'sidebar'
      },
      {
        path: 'brand',
        component: BrandComponent, outlet: 'sidebar'
      },
      {
        path: 'category',
        component: CategoryComponent, outlet: 'sidebar'
      },
      {
        path: 'material',
        component: MaterialComponent, outlet: 'sidebar'
      },
      {
        path: 'size',
        component: SizeComponent, outlet: 'sidebar'
      },
      {
        path: 'color',
        component: ColorComponent, outlet: 'sidebar'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
