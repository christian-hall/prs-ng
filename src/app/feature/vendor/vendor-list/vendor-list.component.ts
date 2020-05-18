import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  title: string = "Vendor-List"
  vendors: Vendor[] = [];
  loggeduser: User = null;

  constructor(private vendorSvc: VendorService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggeduser = this.sysSvc.loggedInUser;

      this.vendorSvc.list().subscribe(
        jr => {
          this.vendors = jr.data as Vendor[];
        }
  
      );
  }

}
