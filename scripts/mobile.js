
/**
 * The Mobile class defines an object represented by an image and that can move
 * 
 * It has the following parameters :
 * 
 * image - the image representing the object
 * x and y - the coordinates of the object
 * speed_x and speed_y - the horizontal and vertical speed of the Mobile
 */
export default class Mobile{
    constructor(x, y, image_src= "images/flyingSaucer-petit.png", speed_x = 0, speed_y = 0){
        this.image = new Image();
        this.image.src = image_src;
        this.x = x;
        this.y = y;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
    }

    /**
     * draws the Mobile on the context
     * @param {*} context - the context on which to draw the mobile
     */
    draw(context){
        context.drawImage(this.image, this.x, this.y);
    }

    /**
     * Performs an elementary movement of the Mobile, changing
     * its coordinates according to its speed
     */
    move(){
        this.x += this.speed_x;
        this.y += this.speed_y;
        console.log("" + this.x + " " + this.y);
    }

    clear(context){
        context.clearRect(this.x, this.y, this.image.width, this.image.height);
    }

    moveAndDraw(context){
        this.clear(context);
        this.move();
        this.draw(context);
    }
}