import EnemyFactory from "./EnemyFactory.js";

export class Game {
    
    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        
        // Could become a strategy pattern
        this.enemies = [];
        this.scoreUI = $("#score");
        this.score = 0;
    }

    start(){
        this.gameLoop = this.createGameLoop();
    }

    stop(){
        clearInterval(this.gameLoop);
        this.freezeEnemies();
        this.removeFallingEnemies();
    }

    freezeEnemies(){
        this.enemies.forEach((enemy) =>{
            enemy.freeze();
        });
    }

    unfreezeEnemies(){
        this.enemies.forEach((enemy) =>{
            enemy.moveToBottom(this.canvasHeight);
        });
    }

    removeFallingEnemies(){
        this.enemies.forEach((enemy) =>{
            let reachedHeight = `${this.canvasHeight - enemy.element.height()}px`;
            if(enemy.element.css("top") !== reachedHeight){
                enemy.remove();
            }
        });
    }

    createGameLoop() {
        return setInterval(() => {

            let enemy = EnemyFactory.create();
            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
            enemy.subscribe(this.setScore.bind(this));
            this.instantiate(enemy);
            enemy.moveToBottom(this.canvasHeight);
            this.enemies.push(enemy);

        }, 1000);
    }

    applyScoreStrategy() {
        if (this.score < 0) {
            this.stop();
        }
    }

    instantiate(enemy) {
        this.canvas.append(enemy.element);
    }

    setScore(score){
        this.score = this.score + score;
        this.scoreUI.text(this.score);
        this.applyScoreStrategy();
    }

    PickRandomEnemySpawnPoint(enemy) {
        return Math.max(this.PickRandomLeftPositionInCanvas() - enemy.element.width(), 0);
    }

    PickRandomLeftPositionInCanvas() {
        return Math.random() * this.canvasWidth;
    }
}
