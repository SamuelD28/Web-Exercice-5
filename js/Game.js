import EnemyFactory from "./EnemyFactory.js";

export class Game {
    
    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        this.score = null;
    }

    start() {
        setInterval(() => {
            let enemy = EnemyFactory.create();
            enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
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

    moveEnemy() {
        let enemy = $(".enemy");
        let enemyHeight = enemy.height();
        enemy.animate({ "top": this.canvasHeight - enemyHeight }, 2000);
    }

    PickRandomEnemySpawnPoint(enemy) {
        return Math.max(this.PickRandomLeftPositionInCanvas() - enemy.element.width(), 0);
    }

    PickRandomLeftPositionInCanvas() {
        return Math.random() * this.canvasWidth;
    }
}
