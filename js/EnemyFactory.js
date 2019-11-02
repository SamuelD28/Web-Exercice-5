import Zombie from "./Zombie.js";

export default class EnemyFactory{

    static create() {
        let rdn = Math.floor(Math.random() * 10) + 1;
        return new Zombie();
    }
}
