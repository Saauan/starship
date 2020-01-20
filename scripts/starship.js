import Mobile from "./mobile.js";
import MoveState from "./movestate.js";

/**
 * The starship represents the player's vessel, it inherits from Mobile
 * 
 */
export default class Starship extends Mobile{
    constructor(x, y){       
        super(x, y, "images/vaisseau-ballon-petit.png", 0, 8);
        this.moving = MoveState.IMMOBILE;
    }

    /* Returns whether the starship moving up or not*/
    get up(){
        return this.moving === MoveState.UP;
    }
    
    /* Returns whether the starship moving down or not*/
    get down(){
        return this.moving === MoveState.DOWN;
    }

    /**
     * Moving doesn't make the starship get out of the canvas
     */
    move(){
        console.log(this.moving);
        if(this.moving != MoveState.IMMOBILE){
            if(this.up){
                this.speed_y = -this.speed_y;
                super.move();
                this.speed_y = -this.speed_y;
            }
            else{
                super.move()
            }
        }
    }
}