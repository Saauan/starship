import Mobile from './mobile.js';
import saucerImage from "../images/flyingSaucer-petit.png";
/**
 * A Saucer is an ennemy Mobile which usually moves to the right
 */
export default class Saucer extends Mobile{
    constructor(x, y){       
        super(x, y, saucerImage, -3, 0);
        this.falling = false;
    }

    shot(){
        console.log("i have been shot");
        this.speed_x = -2;
        this.speed_y = 5;
        this.falling = true;
    }
}