
/**
 * BUG : le width() et le height() retourne zero. Il faudrait les créer et les cacher
 * dans le html dapres moi.Les methodes retournent surment zero parce lelement est pas
 * encore dessiner dans le DOM
 * 
 * 
 * Todo : 
 * -Spawn a un intervalle de temps
 * -Spawn aleatoire
 * -Systeme de score
 * -Acceleration de la partie
 * 
 * -Creer un zombie 
 *      -90% de spawn
*       -score + 10
        -domage - 20
        -Detruire »: hover avec souris
 * -Creer un coffin
 *      -10% de spawn
 *      -Score + 50
 *      -Domage -200
 *      -Detruire : Double click avec souris
 * 
 * -Decrementer arriver au bas
 * -Destruction fade out
 * -Partie termine. Fade out des objects qui ont pas atteint le sol
 * -Message game over
 * -Bloquer le clic contextuel
 * -Ajuster pour un ecran qui se redimenssione
 * -FUsée qui suit la souris
 * 
 */


// "<div class="zombie">🧟</div>"

(function() {
    window.addEventListener("DOMContentLoaded", (event) => {
        window.enemyCount = 0;
        new Game().start();
    });
})();

class Game{

    constructor() {
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
        this.score = null;

    }

    start() {
        setInterval(()=> { 
            let enemy = this.createEnemy();
            this.createInCanvas(enemy);
            enemy.moveToBottom(this.canvasHeight);
        }, 1000);
    }

    setIntervalTime() {
        if (this.score < 200) {
            return 1000;
        } else if (this.score < 500) {
            return 500;
        } else {
            return 250;
        }
    }
    
    createEnemy() {
        let enemy = new Enemy();
        enemy.setLeftPosition(this.PickRandomEnemySpawnPoint(enemy));
        return enemy;
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

    stop() {


    }

    end() {


    }
}

class Enemy {

    constructor() {
        this.element = this.enemyFactory();
        this.id = this.setId();
        this.setElementProperty(this.id);
    }

    setLeftPosition(left) {
        this.element.css({left : left + "px"});
    }

    moveToBottom(bottom) {
        this.element.animate({ "top": bottom - this.element.height() }, 2000);
    }

    enemyFactory() {
        let rdn = Math.floor(Math.random() * 10) + 1;
        if (rdn == 10) {
            return $("<div>⚰️</div>")
            .css({left : 0 + "px"})
            .addClass("coffin")
            .addClass("enemy")
        } else {
            return $("<div>🧟</div>")
            .css({left : 0 + "px"})
            .addClass("zombie")
            .addClass("enemy")
        }
    }

    setId() {
        window.enemyCount++;
        this.element.attr("id", window.enemyCount);
        return window.enemyCount; 
    }

    setElementProperty(id) {
        console.log(id);
        console.log(this.id);
        // let str = "#" + id;
        // console.log(str);

        $("#" + id).mouseenter(function() {
            console.log("yeah");

            $("#" + this.id).fadeOut();
        });
    }
}