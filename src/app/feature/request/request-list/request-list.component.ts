import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  user : User = null;
  requests: Request[] = [];
  myrequests: Request[] = [];
  title: string = "Request-List";


  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {

    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      for (let request of this.requests) {
        if (this.user.id == request.user.id) {
          this.myrequests.push(request);
        }
      }
    });
  }
}
