import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  title: string = 'Request-Detail';
  request: Request = null;
  requestId: number = 0;

  constructor(private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("Error deleting request", this.requestId, jr.errors);
      }
    });

  }

}
