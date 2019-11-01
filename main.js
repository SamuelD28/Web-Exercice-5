
/**
 * BUG : le width() et le height() retourne zero
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

(function(){
    window.addEventListener("DOMContentLoaded", (event) => {
        new Game().start();
    });
})();

class Game{

    constructor(){
        this.canvas = $("#canvas");
        this.canvasHeight = this.canvas.height();
        this.canvasWidth = this.canvas.width();
    }

    start(){
        setInterval(()=>{
            let zombie = this.createZombie();
            this.createInCanvas(zombie);
            zombie.moveToBottom(this.canvasHeight);
        }, 1000);
    }
    
    createZombie(){
        let zombie = new Zombie();
        zombie.setLeftPosition(this.PickRandomZombieSpawnPoint(zombie));
        return zombie;
    }

    createInCanvas(zombie){
        this.canvas.append(zombie.element);
    }

    moveZombie() {
        let zombie = $(".zombie");
        let zombieHeight = zombie.height();
        zombie.animate({ "top": this.canvasHeight - zombieHeight }, 2000);
    }

    PickRandomZombieSpawnPoint(zombie){
        return Math.max(this.PickRandomLeftPositionInCanvas() - zombie.element.width(), 0);
    }

    PickRandomLeftPositionInCanvas(){
        return Math.random() * this.canvasWidth;
    }

    stop(){


    }

    end(){


    }
}

class Zombie{

    constructor(){
        this.element = $("<div>🧟</div>")
                        .css({left : 0 + "px"})
                        .addClass("zombie");
    }

    setLeftPosition(left){
        this.element.css({left : left + "px"});
    }

    moveToBottom(bottom){
        this.element.animate({ "top": bottom - this.element.height() }, 2000);
    }
}