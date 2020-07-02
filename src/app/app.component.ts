import { Component } from '@angular/core';
import { Routes,Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public routes:Router) { }
  ngOnInit(): void {
    logincheck();
  this.routes.navigate(['/login']);

  }


}
function logincheck(){
 var check = localStorage.getItem('strName')
 console.log(check);
 if(check == null)
  this.routes.navigate(['/login']);
}
