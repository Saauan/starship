import Starship from "./starship.js";
import Saucer from "./saucer.js";


/**
 * This class represents the game, and handles it and its components.
 * 
 * This class is a singleton.
 */
class Game{

    /**
     * Game has :
     *      - a canvas
     *      - a starship
     *      - a list of saucers
     *      - a score
     */
    constructor(){
        this.canvas = undefined;
        this.starship = undefined;
        this.saucers = [];
        this.score = 0;
    }

    /**
     * Sets the canvas of this game
     */
    set canvas(canvas){
        this.canvas = canvas;
        this.createStarship();
    }

    /**
     * Creates and initialize the starship attribute.
     */
    createStarship(){
        this.starship = new Starship(40, this.canvas.height / 2);
    }

    /**
     * Returns the starship of this game
     */
    get starship(){
        return this.starship;
    }


    /**
     * Creates a saucer and adds it to the far right of the canvas
     * at a random height.
     */
    addSaucer(){
        y = getRandomInt(this.canvas.height); // random height
        x = this.canvas.width; // far right
        saucer = new Saucer(x, y);
        this.saucers.push(saucer); // Add at the end of the list
    }

    /**
     * Removes the selected saucer from the game
     * 
     * @param {*} saucer the saucer to remove
     */
    removeSaucer(saucer){
        i = 0
        el = undefined
        // Search for the saucer
        while(i < this.saucers.length && this.saucers[i] != saucer){
            i++;
        }
        if(i >= this.saucers.length){
            throw "removeSaucer : saucer was not found"
        }
        removedSaucer = this.saucers.splice(i, 1);
        if(saucer != removedSaucer){
            throw "Wrong saucer removed.";
        }
    }

    /**
     * Adds `x` to the score
     */
    addScore(x){
        this.score += x;
    }

    /**
     * Returns the current score
     */
    get score(){
        return this.score;
    }

    /**
     * Sets the score, throws exception
     */
    set score(){
        throw "Cannot set score !";
    }

    /**
     * Animate the game :
     * 
     *      - The saucers move one step left
     *      - The spaceship moves if it has to move then is set to Immobile
     *      - Requests the next animation frame
     */
    animate(){
        this.saucers.forEach(saucer => saucer.move());
        // this.saucers.forEach(saucer => saucer.move());
        this.spaceship.draw();

        // Encapsulate within `animateOneFrame`

        window.requestAnimationFrame();
    }

    /**
     * Handles key presses.
     * 
     * If arrow up is pressed, the ship is set to move up.
     * If arrow down is pressed, the ship is set to move down.
     * 
     * @param {*} event the event triggered by pressing a key
     */
    keyActionHandler(event){
        switch(event.key){
            case "ArrowUp":
            case "Up":
                // this.starship.moveUp()

            break;
            case "ArrowDown":
            case "Down":
                // this.starship.moveDown()

            break;
            default: return;
        }
        event.preventDefault();
    }
}

/**
 * Returns a random integer between 0 and `max`
 * @param {*} max the maximum value the random integer can take
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// The game is a singleton  
const theGame = new Game();
theGame.constructor = undefined;
Object.getPrototypeOf(theGame).constructor = undefined;
export default theGame;

