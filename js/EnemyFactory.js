import Zombie from "./Zombie.js";
import Coffin from "./Coffin.js";

/**
 * @description Factory class used to create new enemy
 * based on their spawn probablity factor.
 * 
 * @author Samuel Colassin, Samuel Dube
 */
class EnemyFactory{

    static create() {
        let rdn = Math.floor(Math.random() * 10) + 1;
        if(rdn === 10){
            return new Coffin();            
        }else{
            return new Zombie();
        }
    }
}

export default EnemyFactory;