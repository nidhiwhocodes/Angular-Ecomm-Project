import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [NgFor,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchresult:undefined | product[];
  constructor(private activeRoute: ActivatedRoute,private product: ProductService) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get(`query`);
    console.log(query);
    query && this.product.searchProduct(query).subscribe((result) => {
      this.searchresult=result
    });
  }
}
