const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");
let frames =0;

const sprite = new Image();
sprite.src = "img/sprite.png";

const bg= {
    sX:0,
    sY:0,
    w:275,
    h:226,
    x:0,
    y: cvs.height - 226,

    draw: function(){
        console.log("yeah i am in "+ this.sX);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);                  
    }
}


function draw(){
    ctx.fillStyle= "#70c5ce";
    ctx.fillRect(0,0, cvs.width, cvs.height);
    bg.draw();
}

function loop(){
    // update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}

window.onload= function(){
    loop();
}


