const bird ={
    animation:[
        {sX:276, sY:112},
        {sX:276, sY:139},
        {sX:276, sY:164},
        {sX:276, sY:139}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,
    radius : 12,

    period: 10,

    frame: 0,

    speed: 0,
    gravity: 0.20,
    jump : 4,
    rotation : 0,


    draw : function(){
        let bird = this.animation[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2,-this.h/2, this.w, this.h);
        ctx.restore();
    },


    update : function(){
        this.period = state.current == state.getReady? 10:5;
        this.frame+= frames%this.period == 0 ? 1 : 0;
        this.frame = this.frame%this.animation.length;

        if(state.current == state.getReady){
            this.y = 150;
            this.rotation = 0* DEGREE;
            this.speed=0;
        }
        else{
            this.speed+= this.gravity;
            this.y += this.speed;

            if (this.y + this.h/2 >= cvs.height - fg.h){
                this.y = cvs.height - fg.h - this.h/2;
                if(state.current ==state.game){
                    state.current = state.over; 
                    DIE.play();
                }
            }

            if (this.speed >= this.jump){
                this.rotation = 25* DEGREE;
                this.frame=1;
            }

            else { 
                this.rotation = -25* DEGREE;
            }

        }

    },

    speedReset: function(){
        this.speed=0;
    },

    flap: function(){
        this.speed = -this.jump;
    }

    

}