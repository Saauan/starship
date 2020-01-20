import theGame from "./game.js";


const setup = function() {
	const boutonSoucoupe = document.getElementById("nouvelleSoucoupe");
	boutonSoucoupe.addEventListener("click", theGame.addSaucer.bind(theGame));
	const canvas = document.getElementById("stars");
	theGame.canvas = canvas;
	canvas.addEventListener("keydown", theGame.keyDownActionHandler.bind(theGame));
	canvas.addEventListener("keyup", theGame.keyUpActionHandler.bind(theGame));
	theGame.createStarship();

	theGame.startAnimating(50);
}

window.addEventListener("DOMContentLoaded",setup);
