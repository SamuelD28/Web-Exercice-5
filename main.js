
/**
 * BUG : le width() et le height() retourne zero. Il faudrait les créer et les cacher
 * dans le html dapres moi.Les methodes retournent surment zero parce lelement est pas
 * encore dessiner dans le DOM
 * 
 * 
 * Todo : 
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
 * -Message game over
 * -Bloquer le clic contextuel
 * -Ajuster pour un ecran qui se redimenssione
 * -FUsée qui suit la souris
 * 
 */

import Game from "./js/Game.js";

(function() {

    window.addEventListener("DOMContentLoaded", () => {
        Game.start();
    });

    window.addEventListener('keydown', function(event) {
        if(event.keyCode == 9) {
            Game.stop();
        }
    });

})();