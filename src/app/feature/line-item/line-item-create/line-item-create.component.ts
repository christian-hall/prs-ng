import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Add Line-Item";
  request: Request = null;
  requestId: number = 0;
  lineItem: LineItem = new LineItem;
  products: Product[] = [];

  constructor(private liSvc: LineItemService,
    private reqSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.reqSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });

    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    })
  }

  save() {
    this.lineItem.request = this.request;
    this.liSvc.create(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/line-item/list/" + this.lineItem.request.id);
      } else {
        console.log("Error creating line-item", this,this.lineItem, jr.errors)
      }
    })
  }
}
