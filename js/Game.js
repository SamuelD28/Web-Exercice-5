import EnemyFactory from "./EnemyFactory.js";

/**
 * @description Singleton class that handles the game logic.
 * 
 * @author Samuel Colassin, Samuel Dube
 */
class Game {
    
    /**
     * @description Initialise the game class with the necessary property
     */
    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        
        // Could become a strategy pattern
        this.scoreUI = $("#score");
        this.score = 0;
        this.maxScore = null;

        this.enemies = [];
        this.gameLoop = null;
        this.spawnInterval = 1000;
        this.isGameOver = false;
    }

    /**
     * @description Method that start the game by creating 
     * the main game loop
     */
    start() {
        this.makeWeaponfollowCursor();
        this.gameLoop = this.createGameLoop();
    }

    /**
     * @description Method that stop the game by stopping the game loop and
     * freezing all enemies
     */
    stop(){
        this.freezeEnemies();
        clearTimeout(this.gameLoop);
        this.gameLoop = null;
    }
    
    resume() {

        this.unfreezeEnemies();
        this.start();
    }

    /**
     * @description Method that end the current game by stopping 
     * it and removing all falling enemeies
     */
    end() {
        this.stop();
        this.removeFallingEnemies();
        this.showGameOver();
        this.isGameOver = true;
    }

    /**
     * @description Method that freeze the enemies in their current position
     */
    freezeEnemies(){

        this.enemies.forEach((enemy) =>{
            enemy.freeze();
        });
    }

    /**
     * @description Method that unfreeze the current enemies from their current
     * position
     */
    unfreezeEnemies(){

        this.enemies.forEach((enemy) =>{
            enemy.moveToBottom(this.canvasHeight);
        });
    }

    /**
     * @description Method that removes all enemies that havent reached the bottom
     * of the canvas
     */
    removeFallingEnemies(){

        this.enemies.forEach((enemy) =>{
            let reachedHeight = `${this.canvasHeight - enemy.element.outerHeight()}px`;
            if(enemy.element.css("top") !== reachedHeight){
                enemy.remove();
            }
        });
    }

    /**
     * @description Method that create the main game loop
     * 
     * @returns Int corresponding to the running interval
     */
    createGameLoop() {

        return setTimeout(() => {

            let enemy = EnemyFactory.create();
            this.enemies.push(enemy);
            
            this.instantiate(enemy);

            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
            enemy.subscribe(this.setScore.bind(this));
            enemy.moveToBottom(this.canvasHeight);
            this.changeGameSpeed();
            console.log(this.spawnInterval)
            if (!this.isGameOver) {
                this.createGameLoop();
            } else {
                this.end();
            }

        }, this.spawnInterval);
    }

    changeGameSpeed() {
        if (this.maxScore > 100 && this.maxScore < 300) {
            this.spawnInterval = 500;
        } else if (this.maxScore >= 300 && this.maxScore < 600) {
            this.spawnInterval = 250;
        } else if (this.maxScore >= 600) {
            this.spawnInterval = 125;
        } 
    }

    /**
     * @description Method that apply the current score strategy.
     */
    applyScoreStrategy() {

        if (this.score <= 0) {
            this.isGameOver = true;
            //this.end();
        }
    }

    /**
     * @description Method that instantiate an enemy in the canvas
     * 
     * @param {Enemy} enemy Enemy to spawn
     */
    instantiate(enemy) {
        
        this.canvas.append(enemy.element);
    }

    /**
     * @description Method that adjust the current by the specified integer
     * 
     * @param {Int} score Score point to change the score property
     */
    setScore(score){

        this.score = this.score + score;
        this.increaseMaxScore();
        this.scoreUI.text(this.score);
        this.applyScoreStrategy();
    }

    /**
     * @description Method that pick a random position in canvas 
     * and adjust for the enemy width
     * 
     * @param {Enemy} enemy Enemy to pick the random position
     * 
     * @returns Return the random left position
     */
    PickRandomEnemySpawnPoint(enemy) {
        //console.log(enemy.element.outerWidth());
        return Math.max(this.PickRandomLeftPositionInCanvas() - enemy.element.outerWidth(), 0);
    }

    /**
     * @description Method that pick a random left position  
     * on the canvas
     * 
     * @returns Random left position
     */
    PickRandomLeftPositionInCanvas() {
        
        return Math.random() * this.canvasWidth;
    }

    /**
     * @description Show a message on screen when the game is over 
     */
    showGameOver() {
        $("<div>Partie terminée !</div>")
        .appendTo("#canvas")
        .addClass("gameover");

        $(".header").animate({top: "0.1rem"}, {duration: 2000});
    }

    /**
     * @description Makes that the weapon follow the cursor
     */
    makeWeaponfollowCursor() {
        $(document).mousemove(function(e) {
            $("#mouse").css({
              top: e.pageY, 
              left: e.pageX 
            });
        });
    }

    /**
     * @description Increases the maximum score reached by the player 
     */
    increaseMaxScore() {
        if (this.maxScore < this.score) {
            this.maxScore = this.score;
        }
    }
}

// Export as a singleton
const Instance = new Game();
export default Instance;