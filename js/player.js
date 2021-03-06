function Player(initX, initY, bitmap)
{
	this.state = "still";

	this.internal = bitmap;
	this.internal.x = initX;
	this.internal.y = initY;

	this.jumpHeight = 3.25 * BLOCK_SIZE;
	this.jumpLength = 4.2 * BLOCK_SIZE;
	this.speed = 200; //in pixels per second

	//deduce initial kick velocity and gravity from jump height and length
	this.jumpV0 = 4*this.jumpHeight*this.speed/this.jumpLength;
	this.gravity = 8*this.jumpHeight*this.speed*this.speed/(this.jumpLength*this.jumpLength);

	this.verticalVelocity = 0;
	this.onGround = false;

	this.update = function (event, terrain)
	{
		var wantedX = 0;
		var wantedY = 0;
		var deltaT = event.delta/1000; //in seconds
		this.verticalVelocity += this.gravity*deltaT;

		if(this.onGround && isKeyPressed["ArrowUp"])
		{
			this.onGround = false;
			this.verticalVelocity = -this.jumpV0;
			createjs.Sound.play("jump");
		}

		wantedY += this.verticalVelocity*deltaT + this.gravity*deltaT*deltaT/2;

		var move = 0;
		if(isKeyPressed["ArrowLeft"])
		{
			move += -this.speed;
			this.internal.scaleX = -Math.abs(this.internal.scaleX);
		}
		if(isKeyPressed["ArrowRight"])
		{
			move += this.speed;
			this.internal.scaleX = Math.abs(this.internal.scaleX);
		}
		wantedX += move*deltaT;

		var bBox = new createjs.Rectangle(this.internal.x-17, this.internal.y-53, 34, 53);

		//always round moves otherwise sprites may appear blurry
		wantedX = Math.round(wantedX);
		wantedY = Math.round(wantedY);
		var validatedMove = getValidMove(bBox, {x:wantedX, y:wantedY}, terrain.obstaclesBBs);
		if((validatedMove.x > 0 && this.internal.x + validatedMove.x > stage.canvas.width*(1-viewBuffer))
			|| (validatedMove.x < 0 && this.internal.x + validatedMove.x < stage.canvas.width*viewBuffer))
		{
			//move terrain instead of player
			this.internal.x += terrain.tryMoveX(validatedMove.x);
		}
		else
		{
			this.internal.x += validatedMove.x;
		}
		if((validatedMove.y > 0 && this.internal.y + validatedMove.y > stage.canvas.height*(1-viewBuffer))
			|| (validatedMove.y < 0 && this.internal.y + validatedMove.y < stage.canvas.height*viewBuffer))
		{
			//move terrain instead of player
			this.internal.y += terrain.tryMoveY(validatedMove.y);
		}
		else
		{
			this.internal.y += validatedMove.y;
		}

		//update state
		var prevState = this.state;
		if(validatedMove.y > EPSILON)
			this.state = "jumpup";
		else if(validatedMove.y < -EPSILON)
			this.state = "jumpdown";
		else if(Math.abs(validatedMove.x) > EPSILON)
			this.state = "run";
		else
			this.state = "still";
		if(this.state !== prevState)
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
