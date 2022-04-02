import { UserModel } from './../../models/entityModels/userModel';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarMenu } from 'src/app/models/others/navbarMenu';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: UserModel = null;

  // navbarMenus: NavbarMenu[] = [
  //   { menu: "Topics", path: ["topics", ""], active: true },
  // ];
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getLoginedUser();
    if (!this.user)
      this.router.navigate(["login"]);

    // if (this.user) {
    //   let url = window.location.pathname;
    //   url = url.substring(1, url.length);
    //   this.navbarMenus.forEach(element => {
    //     if (element.path.includes(url)) {
    //       element.active = true;
    //     }
    //     else {
    //       element.active = false;
    //     }
    //   });
    // }
    // else {
    //   this.router.navigate(["login"]);
    // }
  }

  logout() {
    this.loginService.removeLoginedUser();
    this.ngOnInit();
  }
}
