function Player(initX, initY, bitmap)
{
	var self = this; //to use in events

	this.speed = 8;
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
			this.verticalVelocity = -this.jumpingPower;
		}

		wantedY += this.verticalVelocity*deltaT;

		var move = 0
		if(isKeyPressed[37])
			move += -this.speed;
		if(isKeyPressed[39])
			move += this.speed;
		wantedX += move*deltaT;

		var rect = new createjs.Rectangle(this.internal.x, this.internal.y, 20, 40);
		//try to move only on x
		rect.x += wantedX;
		if(wantedX == 0 || objTerrain.ValidateMove(rect))
			this.internal.x += wantedX;
		else
			rect.x -= wantedX;
		//try to move on y
		rect.y += wantedY;
		if(objTerrain.ValidateMove(rect))
		{
			this.internal.y += wantedY;
			this.onGround = false;
		}
		else
		{
			if(this.verticalVelocity > 0)
				this.onGround = true;
			this.verticalVelocity = 0;
		}
	}
}
