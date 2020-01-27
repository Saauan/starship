import Starship from "./starship.js";
import Saucer from "./saucer.js";
import MoveState from "./movestate.js";
import Shoot from "./shoot.js";


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
        this._canvas = undefined;
        this.saucers = [];
        this._score = 0;
        this.shoots = [];
    }

    /**
     * Sets the canvas of this game
     */
    set canvas(canvas){
        this._canvas = canvas;
        this.createStarship();
    }

    /**
     * Creates and initialize the starship attribute.
     */
    createStarship(){
        this.starship = new Starship(40, this._canvas.height / 2);
    }

    addShoot(){
        this.shoots.push(new Shoot(this.starship.x + this.starship.image.width, this.starship.y));
    }


    /**
     * Creates a saucer and adds it to the far right of the canvas
     * at a random height.
     */
    addSaucer(){
        const y = getRandomInt(this._canvas.height); // random height
        const x = this._canvas.width; // far right
        let saucer = new Saucer(x, y);
        this.saucers.push(saucer); // Add at the end of the list
        console.log(this.saucers);
    }

    // /**
    //  * Removes the selected saucer from the game
    //  * 
    //  * @param {*} saucer the saucer to remove
    //  */
    // removeSaucer(saucer){
    //     i = 0
    //     el = undefined
    //     // Search for the saucer
    //     while(i < this.saucers.length && this.saucers[i] != saucer){
    //         i++;
    //     }
    //     if(i >= this.saucers.length){
    //         throw "removeSaucer : saucer was not found"
    //     }
    //     removedSaucer = this.saucers.splice(i, 1);
    //     if(saucer != removedSaucer){
    //         throw "Wrong saucer removed.";
    //     }
    // }

    /**
     * Adds `x` to the score
     */
    addScore(x){
        this._score += x;
        this.scoreBox.textContent = this.score;
    }

    /**
     * Returns the current score
     */
    get score(){
        return this._score;
    }

    /**
     * Sets the score, throws exception
     */
    set score(score){
        console.log("cannot set score !");
    }

    set scoreBox(scoreBox){
        this._scoreBox = scoreBox;
    }

    get scoreBox(){
        return this._scoreBox;
    }


    
    isSaucerInBoundLeft(saucer){
        if(saucer.x <= 0){
            return false;
        }
        return true;
    }

    isSaucerInBoundDown(saucer){
        if(saucer.y >= this._canvas.height){
            return false;
        }
        return true;
    }

    isShotInBound(shot){
        if(shot.x >= this._canvas.width){
            return false;
        }
        return true;
    }

    correctStarshipCoordinates(starship){
        if(starship.y < 0){
            starship.y = 0;
        }
        if(starship.y > this._canvas.height - starship.image.height){
            starship.y = this._canvas.height - starship.image.height;
        }
    }

    // initialize the timer variables and start the animation
    startAnimating(fps){
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.animate();
    }

    // the animation loop calculates time elapsed since the last loop
    // and only draws if your specified fps interval is achieved
    /**
     * Animate the game :
     * 
     *      - The saucers move one step left
     *      - The spaceship moves if it has to move then is set to Immobile
     *      - Requests the next animation frame
     */
    animate(){
        // request another frame
        window.requestAnimationFrame(this.animate.bind(this));

        // calc elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval){
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval)

            // animation code
            this.animateOneFrame();
        }
    }

    animateOneFrame(){
        let context = this._canvas.getContext("2d");

        // Move the saucers
        this.saucers.forEach(saucer => {saucer.clear(context); saucer.move();});
        // Remove out of bound saucers
        const oldLength = this.saucers.length;
        this.saucers = this.saucers.filter(this.isSaucerInBoundLeft);
        const newLength = this.saucers.length;
        const difference = oldLength - newLength;
        if(difference < 0){
            throw "A ship was added, but was not supposed to be";
        }
        if(difference > 0){
            this.addScore(-1000*difference);
        }
        this.saucers = this.saucers.filter(this.isSaucerInBoundDown.bind(this));
        
        // Redraw the saucers
        this.saucers.forEach(saucer => {saucer.draw(context)});

        // Move the shoots
        this.shoots.forEach(shoot => {shoot.clear(context); shoot.move();});
        // Check for colisions
        this.shoots.forEach(shoot => {
            const eventuallyASaucer = shoot.checkForCollisions(this.saucers);
            console.log(eventuallyASaucer);
            if(eventuallyASaucer){
                eventuallyASaucer.shot();
                this.addScore(200);
                this.shoots.splice(this.shoots.indexOf(shoot), 1);
            }
        });
        this.shoots.forEach(shoot => shoot.draw(context));

        // Remove out of bound shots
        this.shoots = this.shoots.filter(this.isShotInBound.bind(this));

        // Move the starship
        this.starship.clear(context);
        this.starship.move();
        // Correct its coordinates so it stays in the canvas
        this.correctStarshipCoordinates(this.starship);
        // Redraw the starship
        this.starship.draw(context);
    }

    /**
     * Handles key presses.
     * 
     * If arrow up is pressed, the ship is set to move up.
     * If arrow down is pressed, the ship is set to move down.
     * 
     * @param {*} event the event triggered by pressing a key
     */
    keyDownActionHandler(event){
        switch(event.key){
            case "ArrowUp":
            case "Up":
                this.starship.moving = MoveState.UP;

            break;
            case "ArrowDown":
            case "Down":
                this.starship.moving = MoveState.DOWN;

            break;
            case " ":
                this.addShoot();
            break;
            default: return;
        }
        event.preventDefault();
    }

    /**
     * Handles key releases.
     * 
     * @param {*} event the event triggered by pressing a key
     */
    keyUpActionHandler(event){
        switch(event.key){
            case "ArrowUp":
            case "Up":
            case "ArrowDown":
            case "Down":
                this.starship.moving = MoveState.IMMOBILE;
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

