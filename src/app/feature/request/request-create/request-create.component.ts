import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  title: string = "New Request";
  user: User = null;
  request: Request = new Request();

  constructor(private requestSvc: RequestService,
    private sysSvc: SystemService,
    private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
  }

  save() {
    this.request.user = this.user;
    this.requestSvc.create(this.request).subscribe(jr => {
      if (jr.errors == null) {
      }
      else {
        console.log("error creating request", this.request, jr.errors);
      }
    });
    this.router.navigateByUrl("/request/reroute");
  }

}
