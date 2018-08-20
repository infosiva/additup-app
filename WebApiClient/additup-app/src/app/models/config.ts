export class QuizConfig {
    duration: number;
    showClock: boolean;

    constructor(data: any) {
        data = data || {};
        this.duration = data.duration;
        this.showClock = data.showClock;
    }
}
