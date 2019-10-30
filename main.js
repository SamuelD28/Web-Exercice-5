
/**
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
            this.spawn();
            this.moveZombie();
        }, 1000);
    }
    
    spawn(){
        this.canvas.append("<div class='zombie'>🧟</div>");
        let zombie = $(".zombie");
        let leftPositionSpawn = Math.max(Math.random() * this.canvasWidth - zombie.width(), 0);
        zombie.css({"left" : leftPositionSpawn + "px"});
    }

    moveZombie() {
        let zombie = $(".zombie");
        let zombieHeight = zombie.height();
        zombie.animate({ "top": this.canvasHeight - zombieHeight }, 2000);
    }

    stop(){


    }

    end(){


    }
}

class Zombie{

    spawn(){
        let zombie = "<div class='zombie'>🧟</div>";
    }
}