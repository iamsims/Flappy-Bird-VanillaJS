const DEGREE = Math.PI/180;
let frames =0;

const state ={
    current : 0,
    getReady :0,
    game : 1,
    over: 2
}

const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29,
}

cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            SWOOSHING.play();
            break;

        case state.game:
            bird.flap();
            FLAP.play();
            break;
        
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX- rect.left;
            let clickY = evt. clientY- rect.top;

            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY<=startBtn.y + startBtn.h )
            {
                bird.speedReset();
                pipes.reset();
                score.reset();
                state.current = state.getReady;

            }
    }
});


const getReady ={
    sX : 0,
    sY : 228,
    w: 173,
    h : 152,
    x: cvs.width/2 - 173/2,
    y: 80,

    draw : function(){

        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        } 
    
    }
}

const gameOver={
    sX : 175,
    sY : 228,
    w: 225,
    h : 202,
    x: cvs.width/2 - 225/2,
    y: 80,

    medal:{     
        sX : 312,
        sY : 112,
        w: 42,
        h : 42,
        x: cvs.width/2 - 225/2 + 25,
        y: 80+85,
        goldSYoffset: 44

    },

    draw : function(){
        if(state.current == state.over){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        if(score.value<score.best){
            ctx.drawImage(sprite, this.medal.sX, this.medal.sY, this.medal.w, this.medal.h, this.medal.x, this.medal.y, this.medal.w, this.medal.h);
        }
        else{
            ctx.drawImage(sprite, this.medal.sX, this.medal.sY+this.medal.goldSYoffset, this.medal.w, this.medal.h, this.medal.x, this.medal.y, this.medal.w, this.medal.h);
        }
        }
    
    }
}

const score={
    best : parseInt(localStorage.getItem("best"))|| 0,
    value : 0,
    draw: function (){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle ="#000";

        if (state.current == state.game){

            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
        }

        else if (state.current == state.over){
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 225, 175);
            ctx.strokeText(this.value, 225, 175);
            ctx.fillText(this.best, 225, 215);
            ctx.strokeText(this.best, 225, 215);

        } 

    },

    reset: function(){
        this.value =0;
    }

} 

function draw(){
    ctx.fillStyle= "#70c5ce";
    ctx.fillRect(0,0, cvs.width, cvs.height);
    bg.draw();
    getReady.draw();
    bird.draw();
    pipes.draw();
    fg.draw();
    gameOver.draw();
    score.draw();

}

function update(){
    bird.update();
    fg.update();
    pipes.update();
}


function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}

window.onload= function(){
    loop();
}