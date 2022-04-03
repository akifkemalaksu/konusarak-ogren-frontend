import { Router } from '@angular/router';
import { ExamService } from './../../services/exam.service';
import { CreateAnswerRequestModel } from './../../models/requestModels/createAnswerRequestModel';
import { CreateExamRequestModel } from './../../models/requestModels/createExamRequestModel';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TopicService } from './../../services/topic.service';
import { Component, OnInit } from '@angular/core';
import { TopicFromWebResponseModel } from 'src/app/models/responseModels/topicFromWebResponseModel';
import { CreateQuestionRequestModel } from 'src/app/models/requestModels/createQuestionRequestModel';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  createExamForm: FormGroup;

  mostRecentTopics: TopicFromWebResponseModel[] = [];

  content: string;
  questionCount: number = 4;

  constructor(
    private topicService: TopicService,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.topicService.getMostRecentTopics().subscribe(response => {
      this.mostRecentTopics = response.data;
    });
  }

  createForm() {
    let questionForms: FormGroup[] = [];

    for (let i = 0; i < this.questionCount; i++) {
      questionForms.push(this.formBuilder.group({
        questionText: this.formBuilder.control("", [Validators.required]),
        answera: this.formBuilder.control("", [Validators.required]),
        answerb: this.formBuilder.control("", [Validators.required]),
        answerc: this.formBuilder.control("", [Validators.required]),
        answerd: this.formBuilder.control("", [Validators.required]),
        rightAnswer: this.formBuilder.control("", [Validators.required])
      }));
    }

    this.createExamForm = this.formBuilder.group({
      topicPath: this.formBuilder.control("", [Validators.required]),
      questions: this.formBuilder.array(questionForms)
    });
  }

  topicChange(event: any) {
    let selectedTopicPath = event.srcElement.value;
    this.content = this.mostRecentTopics.find(t => t.urlPath === selectedTopicPath).content;
  }

  questionArray() {
    return (this.createExamForm.controls["questions"] as FormArray).controls;
  }

  create() {
    console.log(this.createExamForm.value);
    if (this.createExamForm.valid) {
      let formData = this.createExamForm.value;

      let questions: CreateQuestionRequestModel[] = [];
      for (let question of formData.questions) {
        let answers: CreateAnswerRequestModel[] = [];

        answers.push({
          answerText: question.answera,
          isTrue: question.rightAnswer === 'answera'
        });
        answers.push({
          answerText: question.answerb,
          isTrue: question.rightAnswer === 'answerb'
        });
        answers.push({
          answerText: question.answerc,
          isTrue: question.rightAnswer === 'answerc'
        });
        answers.push({
          answerText: question.answerd,
          isTrue: question.rightAnswer === 'answerd'
        });

        questions.push({
          answers: answers,
          questionText: question.questionText
        } as CreateQuestionRequestModel);
      }

      var exam: CreateExamRequestModel = {
        topicPath: formData.topicPath,
        questions: questions
      } as CreateExamRequestModel;

      this.examService.createExam(exam).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success(response.message, "Başarılı!");
            this.router.navigate(["exams"]);
          }
          else {
            this.toastr.warning(response.message, "Uyarı!");
          }
        },
        error: errorResponse => {
          console.log(errorResponse);
        }
      });
    }
    else {
      this.toastr.warning("Lütfen tüm alanları doldurunuz.", "Uyarı!");
    }
  }
}
