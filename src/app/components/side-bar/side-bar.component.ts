import { Component, OnInit } from '@angular/core';
import { NavbarMenu } from 'src/app/models/others/navbarMenu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  navbarMenus: NavbarMenu[] = [
    { menu: "Sınav Oluştur", path: ["exam/create"], active: true },
    { menu: "Sınavlar", path: ["exams"], active: false },
  ];
  constructor() { }

  ngOnInit(): void {
    let url = window.location.pathname;
    url = url.substring(1, url.length);
    this.navbarMenus.forEach(element => {
      if (element.path.includes(url)) {
        element.active = true;
      }
      else {
        element.active = false;
      }
    });
  }

  refresh(){
    this.ngOnInit();
  }
}
