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
        this.addImportantStyleToElement(element);
    }

    defaultValue = (text) => {
        Array.from(text).forEach((char) => {
            let temp = document.createElement("span");
            temp.innerHTML = char;
            this.element.insertBefore(temp, this.cursor.cursor);
        });
    };

    addImportantStyleToElement = (element = this.element) => {
        if (element.style.width.length === 0) {
            element.style.width = "90vw";
        }
        element.style.display = "flex";
        element.style.flexWrap = "wrap";
        element.style.boxSizing = "border-box";
    };

    clear = (noOfTextToBeCleared = null) => {
        let text = this.getText();
        if (!noOfTextToBeCleared) {
            noOfTextToBeCleared = text.length;
            this.tasks.add("");
        } else {
            this.tasks.add(text.slice(0, noOfTextToBeCleared * -1));
        }

        this.do(() => {
            this.clearText(noOfTextToBeCleared);
        });
        this.addWaiting(noOfTextToBeCleared);
    };

    clearText = (noOfTextToBeCleared) => {
        for (let index = 1; index <= noOfTextToBeCleared; index++) {
            let taskEnd = index === noOfTextToBeCleared;
            setTimeout(() => {
                this.clearChar();
                if (taskEnd) {
                    this.handleTaskEnd();
                }
            }, this.getSingleTextWritingTime(index));
        }
    };

    clearChar = () => {
        this.element.removeChild(this.cursor.previousElement());
        this.cursor.updateStyle({ animationDuration: "0s" });
        this.cursor.update();
    };

    getText = () => {
        if (!this.tasks.empty()) {
            return this.tasks.previousTask();
        }
        return this.element.innerText;
    };

    write = (text, style = null) => {
        this.tasks.add(this.getText() + text);
        this.do(() => {
            this.addText(text, style);
        });
        this.addWaiting(text.length);
    };

    addText = (text, style = null) => {
        for (let index = 0; index < text.length; index++) {
            setTimeout(() => {
                this.addChar(text[index], style);
                if (index + 1 === text.length) {
                    this.handleTaskEnd();
                }
                // this.cursor.addCursor(this.element);
            }, this.getSingleTextWritingTime(index));
        }
    };

    addChar = (char, style = {}) => {
        let temp = document.createElement("span");
        if (style) {
            for (const key in style) {
                temp.style[key] = style[key];
            }
        }
        if (char === " ") {
            // this.cursor.hide();
            char = "&nbsp;";
        }
        this.cursor.updateStyle({ animationDuration: "0s" });
        this.cursor.update();
        temp.innerHTML = char;
        this.element.insertBefore(temp, this.cursor.cursor);
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
        this.cursor.updateStyle({ animationDuration: "0.7s" });
        this.cursor.update();
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
    loop = (task) => {
        task();
        setInterval(() => {
            task();
        }, this.getTimout());
    };
    update = (toUpdate) => {
        this.do(() => {
            toUpdate();
            this.cursor.update();
        });
    };
}

window.WriteJs = WriteJs;
