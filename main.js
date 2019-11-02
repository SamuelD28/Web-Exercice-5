
/**
 * BUG : le width() et le height() retourne zero. Il faudrait les créer et les cacher
 * dans le html dapres moi.Les methodes retournent surment zero parce lelement est pas
 * encore dessiner dans le DOM
 * 
 * 
 * Todo : 
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

import { Game } from "./js/Game.js";

(function() {
    window.addEventListener("DOMContentLoaded", (event) => {
        window.enemyCount = 0;
        new Game().start();
    });
})();