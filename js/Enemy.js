export default class Enemy {

    constructor(tag, css){
        this.element = $(tag)
            .css({ left: 0 + "px" })
            .addClass("enemy", css);
    }

    setLeftPosition(left) {
        this.element.css({ left: left + "px" });
    }

    moveToBottom(bottom) {
        this.element.animate({ "top": bottom - this.element.height() }, 2000);
    }
}



