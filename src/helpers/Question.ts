import Answer from "./Answer";

export default class Question {
    img: string;
    title: string;
    answers: Answer[];
    answered: boolean;
    constructor(img: string, title: string, answers: Answer[], answered: boolean = false) {
        this.img = img;
        this.title = title;
        this.answers = answers;
        this.answered = answered;
    }
}