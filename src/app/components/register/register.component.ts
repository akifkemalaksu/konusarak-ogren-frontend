import { UserAddModel } from './../../models/requestModels/userAddModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      firstName: this.formBuilder.control("", [Validators.required]),
      lastName: this.formBuilder.control("", [Validators.required]),
      username: this.formBuilder.control("", [Validators.required]),
      password: this.formBuilder.control("", [Validators.required])
    });
  }

  register() {
    if (this.registerForm.valid) {
      let userAdd: UserAddModel = this.registerForm.value as UserAddModel;
      this.loginService.register(userAdd).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success("kayıt yapıldı.", "Başarılı!");
            this.router.navigate(["login"]);
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
