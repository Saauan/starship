import Mobile from 'mobile.js';
/**
 * A Saucer is an ennemy Mobile which usually moves to the right
 */
export default class Saucer extends Mobile{
    constructor(x, y){       
        super(x, y, "images/flyingSaucer-petit.png", -3, 0);
    }

    /**
     * Moving left of the canvas removes the Saucer from the game
     * @param {*} canvas 
     */
    move(canvas){
        super.move()
        if(this.x < 0){
            // supprimer du jeu
        }
    }
}