import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import * as config from '../../config';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {
  originalDuration = 0;
  upgradedCount = 0;
  selectedRank;
  ranks = ['Beginner', 'Intermediate', 'Advanced', 'Talented', 'Expert'];
  isPromoteNextRank = false;
  answeredInRowCnt = 0;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'duration': 160,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'showClock': false,
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService) { }

  ngOnInit() {
      this.loadQuiz(config.default.ExerciseAPIURL);
  }

  loadQuiz(apiURL: string) {

    this.quizService.get(apiURL).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(res['testDuration']);
      this.originalDuration = res['testDuration'];
    });
    this.mode = 'quiz';
  }

  remainingDuration() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    return diff;
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    question.options.forEach((x) => {
      if (question.id === option.questionId) {
        option.selected = true;
      }
      else {
        option.selected = false;
      }
    });

  }

  goTo(index: number) {
    if (this.isCorrect(this.quiz.questions[index - 1]) === 'correct') {
      this.answeredInRowCnt += 1;
      if (this.answeredInRowCnt === 3) {
        this.upgradedCount += 1;
        this.isPromoteNextRank = true;
        this.answeredInRowCnt = 0;
        const pendingQuestionsAnswered = this.quiz.questions.length - index;
        if (pendingQuestionsAnswered) {
          const remainingDuration = (1 * pendingQuestionsAnswered);
          this.config.duration -= remainingDuration;
          this.duration = this.parseTime(this.config.duration);
          this.selectedRank = this.ranks[this.upgradedCount - 1];
          console.log(this.upgradedCount);
        }
      }
  } else {
    this.isPromoteNextRank = false;
    this.answeredInRowCnt = 0;
    this.upgradedCount = 0;
  }
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    } else {
      this.onSubmit();
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: any) {
    const output = question.options.filter(ans => {
      return (ans.selected && ans.isAnswer && (ans.selected === ans.isAnswer));
    });
    return output && output.length > 0 ? 'correct' : 'wrong';
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
    this.mode = 'result';
    
  }
  reset() {
    this.pager.index = 0;
    this.mode = 'quiz';
    this.selectedRank = '';
    this.startTime = new Date();
    this.upgradedCount = 0;
    this.quiz.questions.forEach(qns => {
      qns.options.forEach(options => {
        delete options.selected;
        delete options.answered;
      });
    });
  }
}
