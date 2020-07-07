import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'


@Component({
  selector: 'app-mainui',
  templateUrl: './mainui.component.html',
  styleUrls: ['./mainui.component.css']
})
export class MainuiComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.fn_logincheck();
    $(document).ready(function(){
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    });
  }
  fn_logincheck(){
    if(localStorage.getItem('strType')== 'ADMIN'){
      this.route.navigate(['mainui'])
    }else{
      this.route.navigate(['/login'])
    }
  }
  fn_logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }


}
