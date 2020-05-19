import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create-reroute',
  templateUrl: './request-create-reroute.component.html',
  styleUrls: ['./request-create-reroute.component.css']
})
export class RequestCreateRerouteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl("/request/list");
  }

}
