import Game from './js/Game.js';

(function() {
  window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    Game.start();
  });

  window.addEventListener('keydown', function(event) {
    if (event.keyCode == 81) {
      if (Game.gameLoop) {
        Game.stop();
      } else {
        Game.resume();
      }
    }
  });
})();
