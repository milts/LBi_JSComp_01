(function(window) {

//
    function Enemy(enemyImage)    {
        this.initialize(enemyImage);
    }

    var p = Enemy.prototype = new Container();


    //static props
    Enemy.SPEED = 2;

    //public props
    p.speed;
    p.vX;
    p.vY;

    p.active;
    
    p.snapToPixel = true;
    
    //constructor
    p.Enemy_init = p.initialize;	//unique to avoid overiding base class

	p.initialize = function(enemyImage)    {
		this.Enemy_init(); // super call

		this.activate(enemyImage);
	}

    p.activate = function(spriteSheet)    {
	
		// create a simple SpriteSheet with a frame size of 80x80 and no frameData:	
//		this.spriteSheet  = new SpriteSheet(enemyImage, 50, 100);
		
		// create a BitmapSequence to display frames from the sprite sheet:
        this.bmpSeq = new BitmapSequence(spriteSheet);
		this.bmpSeq.gotoAndPlay(1)
        this.addChild(this.bmpSeq);

        this.x      =  ( canvas.width - ENEMY_WIDTH ) * Math.random();
        this.y      =   - ENEMY_HEIGHT;
        this.active = true;
    }


	//handle what a enemy does to itself every frame
	p.tick = function() {
		//this.rotation += Math.random()*5 - 2.5 ;//this.spin;
		this.x += Math.random()*5 - 2.5 ;//this.vX;
		this.y += 5;//this.vY;

        if ( this.y > 400 ) {
            killEnemy( this );
        }
	}

	
    /*
var p = Enemy.prototype = new Shape();

// static properties:
	Enemy.LRG_ROCK = 40;
	Enemy.MED_ROCK = 20;
	Enemy.SML_ROCK = 10;

// public properties:

	p.bounds;	//visual radial size
	p.hit;		//average radial disparity
	
	p.size;		//size value itself
	p.spin;		//spin ammount
	p.score;	//score value
	
	p.vX;		//velocity X
	p.vY;		//velocity Y
	
	p.active;	//is it active
	
// constructor:
	p.Shape_initialize = p.initialize;	//unique to avoid overiding base class
	
	p.initialize = function() {
		this.Shape_initialize(); // super call
		
		this.activate();
	}
	
// public methods:
	//handle drawing a Enemy
	p.getShape = function(size) {
		var angle = 0;
		var radius = size;
		
		this.size = size;
		this.hit = size;
		this.bounds = 0;
		
		//setup
		this.graphics.clear();
		this.graphics.beginStroke("#FFFFFF");
		
		this.graphics.moveTo(0, size);
		//draw Enemy
		while(angle < (Math.PI*2 - .5)) {
			angle += .25+(Math.random()*100)/500;
			radius = size+(size/2*Math.random());
			this.graphics.lineTo(Math.sin(angle)*radius, Math.cos(angle)*radius);
			
			//track visual depiction for interaction
			if(radius > this.bounds) { this.bounds = radius; }	//furthest point
			this.hit = (this.hit + radius) / 2;					//running average
		}
		
		this.graphics.closePath(); // draw the last line segment back to the start point.
		this.hit *= 1.1; //pad a bit
	}
	
	//handle reinit for poolings sake
	p.activate = function() {
		//this.getShape(size);
		
		//pick a random direction to move in and base the rotation off of speed
		var angle = Math.random()*(Math.PI*2);
		this.vX = Math.sin(angle)*(5 - size/10);
		this.vY = Math.cos(angle)*(5 - size/10);
		this.spin = (Math.random() + 0.2 )* this.vX;
		
		//associate score with size
		this.score = (5 - size/10) * 100;
		this.active = true;
	}
	
	//handle what a Enemy does to itself every frame
	p.tick = function() {
		this.rotation += this.spin;
		this.x += this.vX;
		this.y += this.vY;
	}
	
	//position the Enemy so it floats on screen
	p.floatOnScreen = function(width, height) {
		//base bias on real estate and pick a side or top/bottom
		if(Math.random()*(width+height) > width) {
			//side; ensure velocity pushes it on screen
			if(this.vX > 0) {
				this.x = -2 * this.bounds;
			} else {
				this.x = 2 * this.bounds + width;
			}
			//randomly position along other dimension
			if(this.vY > 0) {
				this.y = Math.random()*height*0.5;
			} else {
				this.y = Math.random()*height*0.5 + 0.5*height;
			}
		} else {
			//top/bottom; ensure velocity pushes it on screen
			if(this.vY > 0) {
				this.y = -2 * this.bounds;
			} else {
				this.y = 2 * this.bounds + height;
			}
			//randomly position along other dimension
			if(this.vX > 0) {
				this.x = Math.random()*width*0.5;
			} else {
				this.x = Math.random()*width*0.5 + 0.5*width;
			}
		}
	}
	
	p.hitPoint = function(tX, tY) {
		return this.hitRadius(tX, tY, 0);
	}
	
	p.hitRadius = function(tX, tY, tHit) {
		//early returns speed it up
		if(tX - tHit > this.x + this.hit) { return; }
		if(tX + tHit < this.x - this.hit) { return; }
		if(tY - tHit > this.y + this.hit) { return; }
		if(tY + tHit < this.y - this.hit) { return; }
		
		//now do the circle distance test
		return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX),2) + Math.pow(Math.abs(this.y - tY),2));
	}

    //*/

window.Enemy = Enemy;
}(window));
// JavaScript Document