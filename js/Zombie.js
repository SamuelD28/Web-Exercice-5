import Enemy from "./Enemy.js";

export default class Zombie extends Enemy {
    constructor() {
        super("<div>🧟</div>", "zombie", -10, 20);
    }
}
