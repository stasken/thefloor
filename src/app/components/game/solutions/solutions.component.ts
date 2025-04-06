import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit {
  selectedId: string = "";
  questions: Question[] = [];

  constructor(private route: ActivatedRoute, private questionService: QuestionsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get('categoryId') ?? "";
      this.getQuestions();
    });
  }

  getQuestions() {
    this.questionService.getQuestionsOfCategory(this.selectedId).then(qs => {
      this.questions = [...qs]
      console.log(this.questions);
      
    })
  }
}
