import Zombie from "./Zombie.js";
import Coffin from "./Coffin.js";

export default class EnemyFactory{

    static create() {
        let rdn = Math.floor(Math.random() * 10) + 1;
        if(rdn === 10){
            return new Coffin();            
        }else{
            return new Zombie();
        }
    }
}
