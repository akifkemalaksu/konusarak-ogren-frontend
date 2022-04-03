import { AnswerQuestionRequestModel } from './../../models/requestModels/answerQuestionRequestModel';
import { TakeAnswerModel } from './../../models/responseModels/takeAnswerModel';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserModel } from './../../models/entityModels/userModel';
import { TakeExamResponseModel } from './../../models/responseModels/takeExamResponseModel';
import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  takeExam: TakeExamResponseModel = null;
  user: UserModel;
  examId: number;

  takeExamForm: FormGroup;

  constructor(
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getLoginedUser();
    if (this.user != null) {
      this.activatedRoute.params.subscribe(param => {
        if (param["examId"]) {
          this.examId = param["examId"] as number;
          this.getTakeExam(this.examId);
        }
      });
    }
    else {
      this.router.navigate(["login"]);
    }
  }

  getTakeExam(id: number) {
    this.examService.getTakeExam(id).subscribe({
      next: response => {
        console.log(response);
        this.takeExam = response.data;
        this.createForm();
      },
      error: errorResponse => {
        console.log(errorResponse.error);
      },
    });
  }

  createForm() {
    let questions = [];
    for (let question of this.takeExam.questions) {
      let group: any = {};
      group.questionId = question.id;
      group[`answerId-${question.id}`] = this.formBuilder.control("", [Validators.required]);
      questions.push(this.formBuilder.group(group));
    }

    this.takeExamForm = this.formBuilder.group({
      questions: this.formBuilder.array(questions)
    });
  }

  questionArray() {
    return (this.takeExamForm.controls["questions"] as FormArray).controls;
  }

  answerArray(questionId: number) {
    return this.takeExam.questions.find(q => q.id === questionId).answers;
  }

  getQuestionText(id: number) {
    return this.takeExam.questions.find(q => q.id === id).questionText;
  }

  getAnswerText(questionId: number, answerId: number) {
    return this.takeExam.questions.find(q => q.id === questionId).answers.find(a => a.id === answerId).answerText;
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

  complete() {
    if (this.takeExamForm.valid) {
      let questionAnswers: AnswerQuestionRequestModel[] = [];
      for (let answer of this.takeExamForm.value.questions) {
        questionAnswers.push({
          userId: this.user.id,
          questionId: answer.questionId as number,
          answerId: answer[`answerId-${answer.questionId}`] as number
        });
      }

      this.examService.solveExam(questionAnswers).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success(response.message, "Başarılı!");
            this.router.navigate([`exam/${this.examId}/result`]);
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
    else {
      this.toastr.warning("Lütfen tüm soruları yanıtlayınız.", "Uyarı!");
    }
  }
}
