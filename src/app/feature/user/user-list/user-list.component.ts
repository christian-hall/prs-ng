import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  title: string = "User-List";
  users: User[] = [];
  loggeduser: User = null;

  constructor(private userSvc: UserService,
              private sysSvc: SystemService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    
    this.sysSvc.checkLogin();
    this.loggeduser = this.sysSvc.loggedInUser;

    this.userSvc.list().subscribe(
      jr => {
        this.users = jr.data as User[];
      }

    );
  }

}
