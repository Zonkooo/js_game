function Player(initX, initY, bitmap)
{
	var self = this; //to use in events

	this.speed = 6;
	this.jumpingPower = 15;

	this.internal = bitmap;
	this.internal.x = initX;
	this.internal.y = initY;

	this.verticalVelocity = 0;

	this.onGround = false;

	this.Update = function (event)
	{
		var wantedX = 0;
		var wantedY = 0;
		var deltaT = event.delta/30; //usually approximately 1
		this.verticalVelocity += gravity*deltaT;

		if(this.onGround && isKeyPressed[38])
		{
			this.onGround = false;
			this.verticalVelocity = -this.jumpingPower;
			this.internal.gotoAndPlay("jump");
		}

		wantedY += this.verticalVelocity*deltaT;

		var move = 0
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
		var move = GetValidMove(rect, {x:wantedX, y:wantedY}, objTerrain.obstacles);
		this.internal.x += move.x;
		this.internal.y += move.y;

		if(Math.abs(move.y) <= EPSILON)
		{
			if(this.verticalVelocity > 0 && !this.onGround)
			{
				this.internal.gotoAndPlay("run");
				this.onGround = true;
			}
			this.verticalVelocity = 0;
		}
	}
}
