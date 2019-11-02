import EnemyFactory from "./EnemyFactory.js";

export class Game {
    
    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        
        // Could become a strategy pattern
        this.scoreUI = $("#score");
        this.score = 100;
    }

    start(){
        this.gameLoop = this.createGameLoop();
    }

    stop(){
        clearInterval(this.gameLoop);
    }

    createGameLoop() {
        return setInterval(() => {
            this.checkScore();
            let enemy = EnemyFactory.create();
            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
            enemy.subscribe(this.setScore.bind(this));
            this.createInCanvas(enemy);
            enemy.moveToBottom(this.canvasHeight);
        }, 1000);
    }

    checkScore() {
        if (this.score < 0) {
            this.stop();
        }
    }

    createInCanvas(enemy) {
        this.canvas.append(enemy.element);
    }

    setScore(score){
        this.score = this.score + score;
        this.scoreUI.text(this.score);
    }

    PickRandomEnemySpawnPoint(enemy) {
        return Math.max(this.PickRandomLeftPositionInCanvas() - enemy.element.width(), 0);
    }

    PickRandomLeftPositionInCanvas() {
        return Math.random() * this.canvasWidth;
    }
}
