import theGame from "./game.js";
import '../style/style.css';


const setup = function() {
	// Adds a saucer when clicked
	const boutonSoucoupe = document.getElementById("nouvelleSoucoupe");
	boutonSoucoupe.addEventListener("click", theGame.addSaucer.bind(theGame));

	const boutonFlotteSoucoupe = document.getElementById("flotteSoucoupes");
	boutonFlotteSoucoupe.addEventListener("click", theGame.infSoucoupe.bind(theGame));

	const scoreBox = document.getElementById("score");
	theGame.scoreBox = scoreBox;

	const canvas = document.getElementById("stars");
	theGame.canvas = canvas;
	canvas.addEventListener("keydown", theGame.keyDownActionHandler.bind(theGame));
	canvas.addEventListener("keyup", theGame.keyUpActionHandler.bind(theGame));
	theGame.createStarship();

	theGame.startAnimating(50);
}

window.addEventListener("DOMContentLoaded",setup);
