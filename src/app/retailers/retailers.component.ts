import { Component, OnInit } from '@angular/core'
import {arrRetailersList} from './retailerdemmy'
import { from } from 'rxjs';
@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent  {

  arrRetailersList=arrRetailersList
  // constructor() { }

  // ngOnInit(): void {
  // }

}
