import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  title: string = "Product-List"
  loggeduser: User = null;

  constructor(private productSvc: ProductService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {

    this.sysSvc.checkLogin();
    this.loggeduser = this.sysSvc.loggedInUser;

    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];

    });
  }


}
