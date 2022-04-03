import { ResultExamModel } from './../../models/responseModels/resultExamModel';
import { LoginService } from 'src/app/services/login.service';
import { UserModel } from './../../models/entityModels/userModel';
import { ExamService } from './../../services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-exam',
  templateUrl: './result-exam.component.html',
  styleUrls: ['./result-exam.component.css']
})
export class ResultExamComponent implements OnInit {
  user: UserModel;
  examId: number;

  resultExam: ResultExamModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getLoginedUser();
    this.activatedRoute.params.subscribe(param => {
      if (param["examId"]) {
        this.examId = param["examId"] as number;
        this.getExamResult();
      }
    });
  }

  getExamResult() {
    this.examService.resultExam(this.examId, this.user.id).subscribe(response => {
      if (response.success) {
        this.resultExam = response.data;
        console.log(this.resultExam);
      }
    });
  }

  getOption(index: number) {
    switch (index) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      default:
        return "E";
    };
  }
}
