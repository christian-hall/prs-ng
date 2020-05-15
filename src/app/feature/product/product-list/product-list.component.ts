import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  title: string = "Product-List"

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];

    });
  }


}
