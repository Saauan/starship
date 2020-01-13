import Starship from "./starship.js";
import Saucer from "./saucer.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
class Game{
    constructor(){
        this.canvas = undefined;
        this.spaceship = undefined;
        this.saucers = [];
        this.score = 0;
    }

    createStarship(){
        this.starship = new Starship(40, this.canvas.height / 2);
    }

    set canvas(canvas){
        this.canvas = canvas;
        this.createStarship();
    }

    get starship(){
        return this.starship;
    }

    addSaucer(){
        y = getRandomInt(this.canvas.height);
        x = this.canvas.width;
        saucer = new Saucer(x, y);
        this.saucers.push(saucer);
    }

    removeSaucer(saucer){
        i = 0
        el = undefined
        while(i <= this.saucers.length && this.saucers[i] != saucer){
            i++;
        }
        removedSaucer = this.saucers.splice(i, 1);
        if(saucer != removedSaucer){
            throw "Wrong saucer removed.";
        }
    }

    addScore(x){
        this.score += x;
    }

    get score(){
        return this.score;
    }

    set score(){
        throw "Cannot modify score !";
    }

    animate(){
        this.saucers.forEach(saucer => saucer.move());
        this.saucers.forEach(saucer => saucer.move());
        this.spaceship.draw();
        window.requestAnimationFrame();
    }

    keyActionHandler(event){
        switch(event.key){
            case "ArrowUp":
            case "Up":

            break;
            case "ArrowDown":
            case "Down":

            break;
            default: return;
        }
        event.preventDefault();
    }
}

const theGame = new Game();
theGame.constructor = undefined;
Object.getPrototypeOf(theGame).constructor = undefined;
export default theGame;

