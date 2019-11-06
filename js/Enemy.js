/**
 * @description Abstract class that represent an enemy in the game
 * @author Samuel Colassin, Samuel Dube
 */
class Enemy {
  /**
   * @description Constructor that create the html
   * element and assign the properties
   * @param {String} tag Html tag to generate
   * @param {String} css Css class to append
   * @param {Integer} damage Damage of the enemy
   * @param {Integer} points Points of the enemy
   * @param {String} eventType Event that can be triggered on the enemy
   */
  constructor(tag, css, damage, points, eventType) {
    this.element = $(tag)
        .css({left: 0 + 'px'})
        .addClass('enemy', css);
    this.scoreSubscribers = [];
    this.damage = damage;
    this.points = points;
    this.eventType = eventType;
  }

  /**
   * @description Method that change the left position of
   * the enemy
   * @param {Integer} left Left position of the enemy
   */
  setLeftPosition(left) {
    this.element.css({left: left + 'px'});
  }

  /**
   * @description Apply multiple methode on an element when a event occur
   */
  activateOnEvent() {
    this.element.on(this.eventType, ()=> {
      this.changeScore(this.points);
      this.freeze(); // We freeze it otherwise we cant remove it
      this.remove();
    });
  }

  /**
   * @description Remove the event from the element
   */
  deactivateOnClick() {
    this.element.off(this.eventType);
  }

  /**
   * @description Method that move the current enemy to the specified
   * bottom position.
   * @param {Integer} bottom Bottom position to move the enemy to
   */
  moveToBottom(bottom) {
    this.activateOnEvent();
    this.element.animate({'top': bottom - this.element.outerHeight()}, 6000, () => {
      this.deactivateOnClick();
      this.changeScore(this.damage);
    });
  }

  /**
   * @description Method that freeze the enemy in their current position
   */
  freeze() {
    this.deactivateOnClick();
    this.element.stop();
  }

  /**
   * @description Method that remove the enemy
   */
  remove() {
    const self = this;
    this.element.fadeOut(function() {
      $(self).remove();
    });
  }

  /**
   * @description Method that add a subscribers to this
   * enemy various evenement. Callback needs to accept
   * an integer parameter
   * @param {Callback} cb Subscribers callback method.
   */
  subscribe(cb) {
    this.scoreSubscribers.push(cb);
  }

  /**
   * @description Method that notify the subscribers and
   * pass to their callback the score point changes.
   * @param {Integer} score Score point to pass to the subscriber
   */
  changeScore(score) {
    this.scoreSubscribers.forEach((cb) => {
      cb(score);
    });
  }
}

export default Enemy;
