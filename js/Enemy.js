/**
 * @description Abstract class that represent an enemy in the game
 * 
 * @author Samuel Colassin, Samuel Dube
 */
class Enemy {

    /**
     * @description Constructor that create the html 
     * element and assign the properties
     * 
     * @param {Html} tag Html tag to generate
     * @param {Class name} css Css class to append
     * @param {Integer} damage Damage of the enemy
     * @param {Integer} points Points of the enemy
     */
    constructor(tag, css, damage, points){
        this.element = $(tag)
            .css({ left: 0 + "px" })
            .addClass("enemy", css);
        this.scoreSubscribers = [];
        this.damage = damage;
        this.points = points;
    }

    /**
     * @description Method that change the left position of 
     * the enemy
     * 
     * @param {Integer} left Left position of the enemy
     */
    setLeftPosition(left) {
        this.element.css({ left: left + "px" });
    }

    /**
     * @description Method that move the current enemy to the specified
     * bottom position.
     * 
     * @param {Integer} bottom Bottom position to move the enemy to
     */
    moveToBottom(bottom) {
        this.element.animate({ 
            "top": bottom - this.element.height() 
        }, 
        2000,
        () =>{
            this.changeScore(this.damage);
        });
    }

    /**
     * @description Method that freeze the enemy in their current position
     */
    freeze(){
        this.element.stop();
    }

    /**
     * Method that remove the enemy
     */
    remove(){
        this.element.fadeOut();
    }

    /**
     * @description Method that add a subscribers to this 
     * enemy various evenement. Callback needs to accept 
     * an integer parameter
     * 
     * @param {Callback} cb Subscribers callback method.
     */
    subscribe(cb){
        this.scoreSubscribers.push(cb);
    }

    /**
     * @description Method that notify the subscribers and
     * pass to their callback the score point changes.
     * 
     * @param {Integer} score Score point to pass to the subscriber 
     */
    changeScore(score){
        this.scoreSubscribers.forEach(cb => {
            cb(score);
        });
    }
}

export default Enemy;
