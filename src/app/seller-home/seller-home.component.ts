import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgFor } from '@angular/common';
import{ faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [NgFor,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  iconDelete= faTrash;
  iconEdit=faEdit;
  constructor(private product: ProductService) {}
  ngOnInit() {
    this.list()
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list()
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  list(){
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
