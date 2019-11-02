
/**
 * BUG : le width() et le height() retourne zero. Il faudrait les créer et les cacher
 * dans le html dapres moi.Les methodes retournent surment zero parce lelement est pas
 * encore dessiner dans le DOM
 * 
 * -Ajuster pour un ecran qui se redimenssione
 * 
 */

import Game from "./js/Game.js";

(function() {

    window.addEventListener("DOMContentLoaded", () => {
        document.addEventListener('contextmenu', event => event.preventDefault());
        Game.start();
    });

    window.addEventListener('keydown', function(event) {
        if(event.keyCode == 81) {

            if(Game.gameLoop){
                Game.stop();
            }else{
                Game.resume();
            }
        }
    });

})();