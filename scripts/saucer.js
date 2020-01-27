import Mobile from './mobile.js';
/**
 * A Saucer is an ennemy Mobile which usually moves to the right
 */
export default class Saucer extends Mobile{
    constructor(x, y){       
        super(x, y, "images/flyingSaucer-petit.png", -3, 0);
        this.falling = false;
    }

    shot(){
        console.log("i have been shot");
        this.speed_x = -2;
        this.speed_y = 5;
        this.falling = true;
    }
}