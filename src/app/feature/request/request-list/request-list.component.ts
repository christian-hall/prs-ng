import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  user : User = null;
  requests: Request[] = [];
  title: string = "Request-List"

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];

    });

    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
  }

}
