import Mobile from 'mobile.js';
import MoveState from "movestate.js";

/**
 * The starship represents the player's vessel, it inherits from Mobile
 * 
 */
export default class Starship extends Mobile{
    constructor(x, y){       
        super(x, y, "images/vaisseau-ballon-petit.png", 0, 8);
        this.moving = MoveState.IMMOBILE();
    }

    /* Is the starship moving up */
    get up(){
        return this.moving === MoveState.UP();
    }
    
    /* Is the starship moving down */
    get down(){
        return this.moving === MoveState.DOWN();
    }

    /**
     * Moving doesn't make the starship get out of the canvas
     * @param {*} canvas 
     */
    move(canvas){
        super.move()
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y > canvas.height){
            this.y = canvas.height;
        }
    }
}