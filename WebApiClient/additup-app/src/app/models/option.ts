export class Option {
    id: number;
    questionId: number;
    name: String;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any = {}) {
            this.id = data.id;
            this.questionId = data.questionId;
            this.name = data.name;
            this.isAnswer = data.isAnswer;
    }
}
