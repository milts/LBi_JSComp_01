(function(window) {

//
    function Rocket( $img ) {
        this.initialize( $img );
    }

    var r = Rocket.prototype = new Container();


    r.snapToPixel = true;
    r.accel_x = 10;
    r.accel_y = 10;
    
    //constructor
    r.Enemy_init = r.initialize;	//unique to avoid overiding base class

	r.initialize = function( $img )    {
		this.Enemy_init(); // super call

		this.activate( $img );
	}

    r.activate = function($spriteSheet)    {
	
		// create a simple SpriteSheet with a frame size of 80x80 and no frameData:	
//		this.spriteSheet  = new SpriteSheet(enemyImage, 50, 100);
		
		// create a BitmapSequence to display frames from the sprite sheet:
        this.bmpSeq = new BitmapSequence($spriteSheet);
		this.bmpSeq.gotoAndPlay(1)
        this.addChild(this.bmpSeq);

        this.width = this.bmpSeq.width;
        this.height = this.bmpSeq.height;
        
        this.x      =   basex;
        this.y      =   basey;
        this.vx     =   0;
        this.vy     =   0;
        this.target_vx =   0;
        this.target_vy =   0;
        this.active = true;
    }


	//handle what a enemy does to itself every frame
	r.tick = function() {

        this.vx = this.vx + ( ( this.target_vx - this.vx ) / r.accel_x );
        this.vy = this.vy + ( ( this.target_vy - this.vy ) / r.accel_y );

		this.x += this.vx;
		this.y += this.vy;

        if ( this.y < -20 || this.x < 0 || this.x > canvas.width ) {
            killRocket( this );
        }
	}
window.Rocket = Rocket;
}(window));