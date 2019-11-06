import Enemy from './Enemy.js';

/**
 * @description Class specifying the properties of a
 * coffin enemy
 * @author Samuel Colassin, Samuel Dube
 */
class Coffin extends Enemy {
  constructor() {
    super('<div>⚰️</div>', 'coffin', -200, 100, 'dblclick');
  }
}

export default Coffin;
