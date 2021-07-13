import Tasks from "./src/tasks";
import Cursor from "./src/cursor";

export default class WriteJs {
    delay = 1000;
    typingSpeed = 200;

    constructor(element) {
        this.element = element;
        this.waiting = 1;
        this.tasks = new Tasks();
        this.cursor = new Cursor(null, this.element);
        this.cursor.addCursor(this.element);
    }

    clear = (noOfTextToBeCleared = null) => {
        let text = this.getText();
        if (!noOfTextToBeCleared) {
            noOfTextToBeCleared = text.length;
            this.tasks.add("");
        } else {
            this.tasks.add(text.slice(0, noOfTextToBeCleared * -1));
        }

        this.do(() => {
            this.clearText(text, noOfTextToBeCleared);
        });
        this.addWaiting(noOfTextToBeCleared);
    };

    clearText = (text, noOfTextToBeCleared) => {
        for (let index = 1; index <= noOfTextToBeCleared; index++) {
            let taskEnd = index === noOfTextToBeCleared;
            setTimeout(() => {
                if (taskEnd) {
                    this.handleTaskEnd();
                }
                this.clearChar(index, text);
            }, this.getSingleTextWritingTime(index));
        }
    };

    clearChar = (index, text) => {
        this.element.innerText = text.slice(0, index * -1);
        this.cursor.addCursor(this.element);
    };

    getText = () => {
        if (!this.tasks.empty()) {
            return this.tasks.previousTask();
        }
        return this.element.innerText;
    };

    write = (text) => {
        this.tasks.add(this.getText() + text);
        this.do(() => {
            this.addText(text);
        });
        this.addWaiting(text.length);
    };

    addText = (text) => {
        for (let index = 0; index < text.length; index++) {
            setTimeout(() => {
                this.addChar(text[index]);
                if (index + 1 === text.length) {
                    this.handleTaskEnd();
                }
                this.cursor.addCursor(this.element);
            }, this.getSingleTextWritingTime(index));
        }
    };

    addChar = (char) => {
        if (char === " ") {
            this.cursor.hide();
            this.element.innerHTML += "&nbsp;";
        } else {
            this.element.innerText += char;
        }
    };

    do = (task) => {
        let timeout = this.getTimout();
        setTimeout(() => {
            task();
        }, timeout);
    };

    getTimout = () => {
        if (this.waiting === 0) {
            return 1;
        }
        return this.waiting;
    };

    addWaiting = (len) => {
        this.waiting += len * this.getAnimationCompleteTime() + this.delay;
    };

    getAnimationCompleteTime = () => {
        return this.typingSpeed + (this.typingSpeed * 20) / 100;
    };

    handleTaskEnd = () => {
        this.tasks.remove();
        this.handleWaiting();
    };
    handleWaiting = () => {
        if (this.tasks.empty()) {
            this.waiting = 1;
        }
    };

    getSingleTextWritingTime = (textNo) => {
        return this.delay + textNo * this.typingSpeed;
    };
    times = (times = 1, task) => {
        for (let i = 0; i < times; i++) {
            task();
        }
    };
}

window.WriteJs = WriteJs;
