import { Component, OnInit ,Input} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../apiservice.service';
@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  @Input() fromParent;
  constructor(private modalServ: NgbModal,
    private apiService : ApiserviceService) { }

  ngOnInit(): void {
  }
  closDilog(){
    this.modalServ.dismissAll(DeleteProductComponent);
  }

  fn_deleteProduct() {
    let param = {
      "arrDeleteId": [this.fromParent._id]
    }
    this.apiService.fun_apiDelete('product/delete_product',param, '3001').subscribe((body) => {
      console.log(body)
    });
  }
  

}
