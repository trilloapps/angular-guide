import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {

 constructor(private modalService: NgbModal){
    
 }
  open(content:any){
    this.modalService.open(content, {centered:true})
  }
}
