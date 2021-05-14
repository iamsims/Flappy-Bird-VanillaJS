const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

const bg= {
    sX:0,
    sY:0,
    w:275,
    h:226,
    x:0,
    y: cvs.height - 226,

    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);                  
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w+this.w, this.y, this.w, this.h);                  
    }
}

const fg= {
    sX : 276,
    sY : 0,
    w: 224,
    h : 112,
    x: 0,
    y: cvs.height - 112,
    dx: 2,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x+this.w+this.w, this.y, this.w, this.h);
    },

    update : function(){
        if(state.current ==state.game){
            this.x = (this.x - this.dx)% (this.w/4);
        }
    }

}

const pipes ={
    position:[],
    top:{
        sX: 553,
        sY:0
    },

    bottom:{
        sX: 502,
        sY: 0,
    },
    w: 53,
    h: 400,
    gap: 85,
    UPPERYLIMIT: -150,
    LOWERYLIMIT: -370,
    maxYPos: -150,
    minYPos: -370,
    lastY: 0,
    dx: 2,
    draw: function(){
        for (let i =0; i< this.position.length;i++){
            let p= this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    update: function(){
        if (state.current!== state.game) return;

        if(frames%100==0){
            this.position.push({
                x: cvs.width,
                y: Math.random() * (this.maxYPos- this.minYPos) + this.minYPos,
            });
            let lastY = this.position[this.position.length-1].y;
            this.maxYPos= lastY + 80;
            this.minYPos = lastY - 80;

            if (this.maxYPos > this.UPPERYLIMIT){
                this.maxYPos = this.UPPERYLIMIT;
            }

            if (this.minYPos < this.LOWERYLIMIT){
                this.minYPos = this.LOWERYLIMIT;
            }
        }

        for(let i =0; i<this.position.length; i++){
            let p= this.position[i];
            p.x -= this.dx;

            let bottomPipeYPos = p.y + this.h + this.gap;

            //COLLISION DETECTION
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h ){
                state.current = state.over;
                HIT.play();
            }

            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h ){
                state.current = state.over;
                HIT.play();
            }

            if (p.x+this.w <=0){
                this.position.shift();
                score.value++;
                SCORE_S.play();

                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }

        }


    },

    reset: function(){
        this.position=[];
    }
}