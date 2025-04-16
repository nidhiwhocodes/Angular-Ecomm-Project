import { Component  } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgFor, NgIf } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,NgIf,NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent {
  popularProducts:undefined | product[];
  trendyProducts:undefined | product[];
  constructor(private product:ProductService){

  }
  ngOnInit(){
    this.product.popularProducts().subscribe((data)=>{
    this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
      })
  }
}
