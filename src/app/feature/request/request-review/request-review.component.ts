import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  user: User = null;
  requests: Request[] = [];
  title: string = "Review Submitted Requests";
  userId: number = 0;

  constructor(private userSvc: UserService,
              private reqSvc: RequestService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.userId = parms['id']);
    this.reqSvc.review(this.userId).subscribe(jr => {
      this.requests = jr.data as Request[];
    });
  }

}
