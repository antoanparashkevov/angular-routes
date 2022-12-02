import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FakeAuth} from "../fake-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: FakeAuth) { }

  ngOnInit() {
  }

  toServer() {
      this.router.navigate(['/servers'])
  }

  loadServer(id: number) {
    this.router.navigate(['/server', id], {queryParams: {allowEdit: true}, fragment: 'loading'})
  }

  onLogin() {
    this.authService.login()
  }

  onLogout() {
    this.authService.logout()
  }
}
