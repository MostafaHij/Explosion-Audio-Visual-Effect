/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

const explosionsArr = [];

class Explosion {
    constructor(x, y, theEventType) {

        // mousemove or click
        this.eventType = theEventType;

        // size (width + height) of sprite by dividing sprite on number of frames
        this.spriteWidth = 200;
        this.spriteHeight = 179;

        // to make the sprite smaller
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;

        // get x and y of mouse click and divide it by half of size to CENTER sprite (the mouse will by in center of sprite)
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;

        // getting the sprite image we want
        this.image = new Image();
        this.image.src = 'images/boom.png';

        // explosion sound
        this.sound = new Audio();
        this.sound.src = 'sounds/explosion.wav';

        // frame position of sprtie
        this.frame = 0;

        // timer 
        this.timer = 0;
    }

    update() {

        // play sound when event is 'Click'
        if (this.frame == 0 && this.eventType == 'click') {
            this.sound.play();
        }

        this.timer++;

        if (this.timer % 8 == 0) {
            this.frame++;
        }

    }

    draw() {
        // ctx.drawImage( image, source x, source y, source width, source height , destination x, desination y, destination width, destination height )
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}


window.addEventListener('click', e => {
    if (e.target.matches('#canvas1')) {
        createObject(e)
    }
});
window.addEventListener('mousemove', e => {
    if (e.target.matches('#canvas1')) {
        createObject(e)
    }
});


function createObject(e) {
    let positionX = e.offsetX;
    let positionY = e.offsetY;
    let eventType = e.type;

    explosionsArr.push(new Explosion(positionX, positionY, eventType))
    console.log(explosionsArr)
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < explosionsArr.length; i++) {
        explosionsArr[i].update();
        explosionsArr[i].draw();

        // check if sprite gets to the last frame then REMOVE OBJECT from the array
        if (explosionsArr[i].frame > 5) {
            explosionsArr.splice(i, 1); // remove this (only 1) index 
            i--; // decrease index after removing current index
        }
    }

    requestAnimationFrame(animate);
}
animate();