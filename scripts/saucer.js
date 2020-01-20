import Mobile from './mobile.js';
/**
 * A Saucer is an ennemy Mobile which usually moves to the right
 */
export default class Saucer extends Mobile{
    constructor(x, y){       
        super(x, y, "images/flyingSaucer-petit.png", -3, 0);
    }
}