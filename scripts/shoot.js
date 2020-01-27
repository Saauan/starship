import Mobile from './mobile.js';
import shootImage from "../images/tir.png"

/**
 * An instance of shoot is a laser which can hit mobiles.
 */
export default class Shoot extends Mobile{
	constructor(x, y){       
        super(x, y, shootImage, 8, 0);
	}
	
	isColliding(mobile){
		const rect1 = {x : this.x, y : this.y, width : this.image.width, height : this.image.height};
		const rect2 = {x : mobile.x, y : mobile.y, width : mobile.image.width, height : mobile.image.height};
		if (rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.height + rect1.y > rect2.y && mobile.falling === false) {
			return true;
		 }
		 return false;
	}

	checkForCollisions(saucers){
		let saucerToReturn = null
		saucers.forEach(saucer => {
			if(this.isColliding(saucer)){
				console.log("returning saucer");
				saucerToReturn = saucer;
			}
		});
		return saucerToReturn;
	}
}