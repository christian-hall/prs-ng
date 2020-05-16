import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  user: User = null;

  constructor(private sysSvc: SystemService) { }

  ngOnInit(): void {

    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

    this.menuItems = [
      new MenuItem("Home", "/home", "Home"),
      new MenuItem("Users", "/user/list", "User-List"),
      new MenuItem("Vendors", "/vendor/list", "Vendor-List"),
      new MenuItem("Products", "/product/list", "Product-List"),
      new MenuItem("Requests", "/request/list", "Request-List"),
      new MenuItem("Login", "/user/login", "Login")
    ];
  }

}
