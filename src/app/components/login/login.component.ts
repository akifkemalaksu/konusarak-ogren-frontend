import { Router } from '@angular/router';
import { UserLoginModel } from './../../models/requestModels/userLoginModel';
import { LoginService } from './../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = this.loginService.getLoginedUser();
    if (!user) {
      this.createForm();
    }
    else {
      this.router.navigate([""]);
    }

  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control("", [Validators.required]),
      password: this.formBuilder.control("", [Validators.required])
    });
  }

  login() {
    if (this.loginForm.valid) {
      let userLogin: UserLoginModel = this.loginForm.value as UserLoginModel;
      this.loginService.login(userLogin).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success("Giriş yaptınız.", "Başarılı!");
            this.loginService.setLoginedUser(response.data);
            window.location.reload();
          }
          else {
            this.toastr.warning(response.message, "Uyarı!");
          }
        },
        error: errorResponse => {
          this.toastr.warning(errorResponse.error.message, "Uyarı!");
        }
      });
    }
    else {
      this.toastr.warning("Lütfen alanları doldurunuz.", "Uyarı!");
    }
  }
}
