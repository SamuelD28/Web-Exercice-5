export default class Enemy {
    constructor() {
        this.element = this.enemyFactory();
        this.id = this.setId();
        this.setElementProperty(this.id);
    }
    setLeftPosition(left) {
        this.element.css({ left: left + "px" });
    }
    moveToBottom(bottom) {
        this.element.animate({ "top": bottom - this.element.height() }, 2000);
    }
    enemyFactory() {
        let rdn = Math.floor(Math.random() * 10) + 1;
        if (rdn == 10) {
            return $("<div>⚰️</div>")
                .css({ left: 0 + "px" })
                .addClass("coffin")
                .addClass("enemy");
        }
        else {
            return $("<div>🧟</div>")
                .css({ left: 0 + "px" })
                .addClass("zombie")
                .addClass("enemy");
        }
    }
    setId() {
        window.enemyCount++;
        this.element.attr("id", window.enemyCount);
        return window.enemyCount;
    }
    setElementProperty(id) {
        console.log(id);
        console.log(this.id);
        // let str = "#" + id;
        // console.log(str);
        $("#" + id).mouseenter(function () {
            console.log("yeah");
            $("#" + this.id).fadeOut();
        });
    }
}
