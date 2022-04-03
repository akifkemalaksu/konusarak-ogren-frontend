import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { ExamComponent } from './components/exam/exam.component';
import { TakeExamComponent } from './components/take-exam/take-exam.component';
import { ResultExamComponent } from './components/result-exam/result-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    CreateExamComponent,
    SideBarComponent,
    HomeComponent,
    ExamComponent,
    TakeExamComponent,
    ResultExamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
