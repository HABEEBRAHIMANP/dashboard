import { Component, OnInit } from '@angular/core';
import {arrEmployeeList} from'./employeedemmy'
import {from} from'rxjs';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent  {
  arrEmployeeList=arrEmployeeList
  // constructor() { }

  // ngOnInit(): void {
  // }

}

