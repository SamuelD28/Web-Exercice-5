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
        this.enemies = [];
        this.scoreUI = $("#score");
        this.score = 0;
        this.spawnInterval = 1000;
    }

    /**
     * @description Method that start the game by creating 
     * the main game loop
     */
    start(){

        this.gameLoop = this.createGameLoop();
    }

    /**
     * @description Method that stop the game by stopping the game loop and
     * freezing all enemies
     */
    stop(){

        clearInterval(this.gameLoop);
        this.freezeEnemies();
    }
    
    /**
     * @description Method that end the current game by stopping 
     * it and removing all falling enemeies
     */
    end(){

        this.stop();
        this.removeFallingEnemies();
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
            let reachedHeight = `${this.canvasHeight - enemy.element.height()}px`;
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

        return setInterval(() => {

            let enemy = EnemyFactory.create();
            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
            enemy.subscribe(this.setScore.bind(this));
            this.instantiate(enemy);
            enemy.moveToBottom(this.canvasHeight);
            this.enemies.push(enemy);

        }, this.spawnInterval);
    }

    /**
     * @description Method that apply the current score strategy.
     */
    applyScoreStrategy() {

        if (this.score < 0) {
            this.stop();
        }
    }

    /**
     * @description Method that instantiate an enemy in the canvad
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

        return Math.max(this.PickRandomLeftPositionInCanvas() - enemy.element.width(), 0);
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
}

// Export as a singleton
const Instance = new Game();
export default Instance;