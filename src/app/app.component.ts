import { UserModel } from './models/entityModels/userModel';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Konuşarak Öğren Project';
  user: UserModel;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getLoginedUser();
    if (this.user == null) {
      this.router.navigate(["login"]);
    }
  }
}
