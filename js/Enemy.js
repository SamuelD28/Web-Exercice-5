export default class Enemy {

    constructor(tag, css, damage, points){
        this.element = $(tag)
            .css({ left: 0 + "px" })
            .addClass("enemy", css);
        this.scoreSubscribers = [];
        this.damage = damage;
        this.points = points;
    }

    setLeftPosition(left) {
        this.element.css({ left: left + "px" });
    }

    moveToBottom(bottom) {
        this.element.animate({ 
            "top": bottom - this.element.height() 
        }, 
        2000,
        () =>{
            this.changeScore(this.damage);
        });
    }

    subscribe(cb){
        this.scoreSubscribers.push(cb);
    }

    changeScore(score){
        this.scoreSubscribers.forEach(cb => {
            cb(score);
        });
    }
}



