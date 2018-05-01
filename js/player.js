function Player(initX, initY, bitmap)
{
	var self = this; //to use in events

	this.state = "still";

	this.internal = bitmap;
	this.internal.x = initX;
	this.internal.y = initY;

	this.jumpHeight = 3.25 * 40; //40 is the size of a block
	this.jumpLength = 4.2 * 40;
	this.speed = 200; //in pixels per second

	//deduce initial kick velocity and gravity from jump height and length
	this.jumpV0 = 4*this.jumpHeight*this.speed/this.jumpLength;
	this.gravity = 8*this.jumpHeight*this.speed*this.speed/(this.jumpLength*this.jumpLength);

	this.verticalVelocity = 0;
	this.onGround = false;

	this.update = function (event)
	{
		var wantedX = 0;
		var wantedY = 0;
		var deltaT = event.delta/1000; //in seconds
		this.verticalVelocity += this.gravity*deltaT;

		if(this.onGround && isKeyPressed[38])
		{
			this.onGround = false;
			this.verticalVelocity = -this.jumpV0;
			createjs.Sound.play("jump");
		}

		wantedY += this.verticalVelocity*deltaT + this.gravity*deltaT*deltaT/2;

		var move = 0;
		if(isKeyPressed[37])
		{
			move += -this.speed;
			this.internal.scaleX = -Math.abs(this.internal.scaleX);
		}
		if(isKeyPressed[39])
		{
			move += this.speed;
			this.internal.scaleX = Math.abs(this.internal.scaleX);
		}
		wantedX += move*deltaT;

		var rect = new createjs.Rectangle(this.internal.x-19, this.internal.y, 40, 53);

		var validatedMove = getValidMove(rect, {x:wantedX, y:wantedY}, objTerrain.obstaclesBBs);
		if((validatedMove.x > 0 && this.internal.x + validatedMove.x > 800) || (validatedMove.x < 0 && this.internal.x + validatedMove.x < 400))
		{
			//move terrain instead of player
			this.internal.x += objTerrain.tryMoveX(validatedMove.x);
		}
		else
		{
			this.internal.x += validatedMove.x;
		}
		if((validatedMove.y > 0 && this.internal.y + validatedMove.y > 300) || (validatedMove.y < 0 && this.internal.y + validatedMove.y < 200))
		{
			//move terrain instead of player
			this.internal.y += objTerrain.tryMoveY(validatedMove.y);
		}
		else
		{
			this.internal.y += validatedMove.y;
		}

		//update state
		var prevState = this.state;
		if(Math.abs(validatedMove.y) > EPSILON)
			this.state = "jump";
		else if(Math.abs(validatedMove.x) > EPSILON)
			this.state = "run";
		else
			this.state = "still";
		this.internal.regY = this.state == "still" ? 5 : 0; //oh boy
		if(this.state != prevState)
			this.internal.gotoAndPlay(this.state);

		if(Math.abs(validatedMove.y) < Math.abs(wantedY))
		{
			if(this.verticalVelocity > 0 && !this.onGround)
			{
				this.onGround = true;
			}
			//else we just hit a ceiling
			this.verticalVelocity = 0;
		}
	}
}
