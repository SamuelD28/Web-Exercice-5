import Enemy from "./Enemy.js";

/**
 * @description Class specifying the properties of a 
 * zombie enemy
 * 
 * @author Samuel Colassin, Samuel Dube
 */
class Zombie extends Enemy {
    constructor() {
        super("<div>🧟</div>", "zombie", -10, 20);
    }
}

export default Zombie;
