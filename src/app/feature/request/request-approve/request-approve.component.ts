import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title1: String = "PurchaseRequest Approve/Reject";
  title2: string = "Lines"
  request: Request = null;
  requestId: number = 0;
  lineItems: LineItem[] = [];
  lineTotal: number = 0;

  constructor(private requestSvc: RequestService,
    private liSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });


    this.liSvc.list(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];

    });
  }

}
