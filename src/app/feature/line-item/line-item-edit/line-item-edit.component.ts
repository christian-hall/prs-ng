import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {

  title: string = "Edit Line-Item";
  products: Product[] = [];
  lineItem: LineItem = new LineItem;
  lineId: number = 0;

  constructor(private liSvc: LineItemService,
    private proSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.lineId = parms['id']);
    this.liSvc.get(this.lineId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });

    this.proSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id
  }

  save() {
    this.liSvc.edit(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list/");
      } else {
        console.log("Error editing line-item", this, this.lineItem, jr.errors)
      }
    })
  }
}
