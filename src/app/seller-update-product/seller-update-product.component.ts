import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData:undefined| product;
  productMessage: undefined |string;
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit() {
    let ProductId = this.route.snapshot.paramMap.get(`id`);
    ProductId && this.product.getProduct(ProductId).subscribe((data) => {
        console.log(data);
        this.productData=data;
      });
  }
  submit(data: any) {

    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has updated"
      }
    })
    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);
    console.log(data);
  }

}
