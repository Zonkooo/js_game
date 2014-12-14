function Player(initX, initY, bitmap)
{
	var self = this; //to use in events

	this.speed = 8;
	this.jumpingPower = 15;

	this.internal = bitmap;
	this.internal.x = initX;
	this.internal.y = initY;

	this.verticalVelocity = 0;

	this.Update = function()
	{
		if(this.internal.y == 360 && isKeyPressed[38])
			this.verticalVelocity = -this.jumpingPower;
		this.internal.y += this.verticalVelocity;

		var move = 0
		if(isKeyPressed[37])
			move += -this.speed;
		if(isKeyPressed[39])
			move += this.speed;
		this.internal.x += move;

		//handle collision with the ground
		if(this.internal.y >= 360 && this.verticalVelocity >= 0)
		{
			this.internal.y = 360;
			this.verticalVelocity = 0;
		}

		if(this.internal.y != 360) //apply gravity only if airborne
			this.verticalVelocity += 1;
	}
}
