import { Component, OnInit } from '@angular/core';
import {arrDistributerList} from'./distributerdemmy'
import {from} from'rxjs';
@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.css']
})
export class DistributerComponent implements OnInit {
  arrDistributerList=arrDistributerList
  constructor() { }

  ngOnInit(): void {
  }

}
