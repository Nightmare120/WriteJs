export default class Cursor {
    style = {
        width: "2px",
        backgroundColor: "black",
        margin: "3px",
        marginBottom: "-4px",
        height: "20px",
        display: "inline-block",
        animationName: "fade",
        animationDuration: "0.7s",
        animationIterationCount: "infinite",
    };

    constructor(style = null, parentElement) {
        this.parentElement = parentElement;
        this.style = style ? style : this.style;
        this.style.height = this.getHeight();
        this.cursor = this.createCursor();
    }

    createCursor = () => {
        let cursor = document.createElement("span");
        this.insertStyles(cursor);
        return cursor;
    };

    addCursor = (element) => {
        let cursor = this.cursor;
        if (this.cursor.style.display === "none") {
            cursor = this.cursor = this.createCursor();
        }
        element.appendChild(cursor);
    };

    updateStyle = (style) => {
        for (const key in style) {
            this.style[key] = style[key];
        }
    };

    getHeight = () => {
        let style = window
            .getComputedStyle(this.parentElement, null)
            .getPropertyValue("font-size");
        let height = parseFloat(style);
        return `${height}px`;
    };

    hide = () => {
        this.cursor.style.display = "none";
    };

    insertStyles = (cursor) => {
        for (const key in this.style) {
            cursor.style[key] = this.style[key];
        }
    };
    update = () => {
        this.insertStyles(this.cursor);
    };
    previousElement = () => {
        return this.cursor.previousElementSibling;
    };
    nextElement = () => {
        return this.cursor.nextElementSibling;
    };
}
