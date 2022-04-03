import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from './../../services/exam.service';
import { ExamResponseModel } from './../../models/responseModels/examResponseModel';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { UserModel } from 'src/app/models/entityModels/userModel';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  exams: ExamResponseModel[] = [];

  moment: any = moment;

  constructor(
    private examService: ExamService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExams();
  }

  getExams() {
    this.examService.getExamsWithTopic().subscribe(response => {
      this.exams = response.data;
    });
  }

  Delete(exam: ExamResponseModel) {
    this.examService.deleteExam(exam.examId).subscribe({
      next: response => {
        if (response.success) {
          this.toastr.success("Sınav silindi.", "Başarılı!");
        }
        else {
          this.toastr.warning(response.message, "Uyarı!");
        }
      },
      error: errorResponse => {
        this.toastr.warning(errorResponse.error.message, "Uyarı!");
      },
    });
  }

  ToExam(exam: ExamResponseModel) {
    let user = this.loginService.getLoginedUser() as UserModel;
    this.examService.userIsTakeExam(exam.examId, user.id).subscribe({
      next: response => {
        if (response.success) {
          if (response.data.length) {
            this.router.navigate([`exam/${exam.examId}/result`]);
          }
          else {
            this.router.navigate([`exam/${exam.examId}/take`]);
          }
        }
        else {
          this.toastr.error(response.message, "Uyarı!");
        }
      },
      error: errorResponse => {
        this.toastr.warning(errorResponse.error.message, "Uyarı!");
      }
    });
  }
}
