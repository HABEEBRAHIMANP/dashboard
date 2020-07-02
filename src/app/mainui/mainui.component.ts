import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainui',
  templateUrl: './mainui.component.html',
  styleUrls: ['./mainui.component.css']
})
export class MainuiComponent implements OnInit {

  title = 'MachineTest';
  rcart= 'Rcart';
  dash='Dash Board';
  order= 'Order';
  employee='Employee';
  distributer='Distributer';
  retailers='Retailers';
  product='Products'
  constructor() { }

  ngOnInit(): void {
  }

}
