export default class Enemy {

    constructor(tag, css){
        this.element = $(tag)
            .css({ left: 0 + "px" })
            .addClass("enemy", css);
        this.subscribers = [];
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
            this.notifySubscribers();
        });
    }

    subscribe(cb){
        this.subscribers.push(cb);
    }

    notifySubscribers(){
        this.subscribers.forEach(cb => {
            cb(-10);
        });
    }
}



