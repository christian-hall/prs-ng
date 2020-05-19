import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
    title: String = "Edit Request";
    users: User[] = [];
    request: Request = new Request();
    requestId: number = 0;
    loggeduser: User = null;
  constructor(private requestSvc: RequestService,
              private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggeduser = this.sysSvc.loggedInUser;

    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });

    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
    });


  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id
  }
  save() {
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors==null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*** Error editing request:  ",this.request,jr.errors);
        alert("Unable to comply: error editing request. Please try again.");
      }
    });
  }
}
