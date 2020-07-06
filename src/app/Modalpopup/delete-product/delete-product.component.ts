import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(private modalServ: NgbModal) { }

  ngOnInit(): void {
  }
  closDilog(){
    this.modalServ.dismissAll(DeleteProductComponent);
  }
  

}
