import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './components/exam/exam.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "", component: HomeComponent, children: [
      { path: "exams", component: ExamComponent },
      { path: "create-exam", component: CreateExamComponent },
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
