import { Option } from './option';

export class Question {
    id: number;
    name: string;
    options: any;
    answered: boolean;

    constructor(data) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.options = [];
        data.options.forEach(option => {
            this.options.push(new Option(option));
        });
    }
}
