import EnemyFactory from "./EnemyFactory.js";

export class Game {
    
    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        this.scoreUI = $("#score");
        this.score = 0;
    }

    start() {
        setInterval(() => {
            let enemy = EnemyFactory.create();
            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
            enemy.subscribe(this.setScore.bind(this));
            this.createInCanvas(enemy);
            enemy.moveToBottom(this.canvasHeight);
        }, 1000);
    }

    setIntervalTime() {
        if (this.score < 200) {
            return 1000;
        }
        else if (this.score < 500) {
            return 500;
        }
        else {
            return 250;
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
