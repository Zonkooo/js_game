function Terrain(level)
{
	var levelWidth = level[0].length * 40;
	var screenWidth = 1200;
	var levelHeight = level.length * 40;
	var screenHeight = 600;

	this.obstaclesBBs = [];
	this.obstaclesSprites = [];
	this.offsetX = 0;
	this.offsetY = 0;

	this.load = function(stage, texX)
	{
		for(var l = 0; l < level.length; l++)
		{
			var line = level[l];
			for(var c = 0; c < line.length; c++)
			{
				var char = line[c];
				if(char == "X")
				{
					var block = new createjs.Bitmap(texX);
					block.x = c*40;
					block.y = l*40;
					stage.addChild(block);
					this.obstaclesSprites.push(block);
					this.obstaclesBBs.push(new createjs.Rectangle(block.x, block.y, 40, 40));
				}
			}
			//add invisible blocks on each side to prevent character from falling
			this.obstaclesBBs.push(new createjs.Rectangle(-40, l*40, 40, 40));
			this.obstaclesBBs.push(new createjs.Rectangle(line.length*40, l*40, 40, 40));
		}
	}

	this.tryMoveX = function(x)
	{
		var remaining = 0;
		if(x > 0 && levelWidth - screenWidth < this.offsetX + x)
		{
			remaining = x;
			x = levelWidth - screenWidth - this.offsetX;
			remaining -= x;
		}
		else if(x < 0 && this.offsetX + x < 0)
		{
			remaining = x + this.offsetX;
			x = -this.offsetX;
		}
		
		for(var oBB = 0; oBB < this.obstaclesBBs.length; oBB++)
			this.obstaclesBBs[oBB].x -= x;
		for(var oS = 0; oS < this.obstaclesSprites.length; oS++)
			this.obstaclesSprites[oS].x -= x;
		this.offsetX += x;
		
		return remaining;
	}

	this.tryMoveY = function(y)
	{
		var remaining = 0;
		if(y > 0 && levelHeight - screenHeight < this.offsetY + y)
		{
			remaining = y;
			y = levelHeight - screenHeight - this.offsetY;
			remaining -= y;
		}
		else if(y < 0 && this.offsetY + y < 0)
		{
			remaining = y + this.offsetY;
			y = -this.offsetY;
		}

		for(var oBB = 0; oBB < this.obstaclesBBs.length; oBB++)
			this.obstaclesBBs[oBB].y -= y;
		for(var oS = 0; oS < this.obstaclesSprites.length; oS++)
			this.obstaclesSprites[oS].y -= y;
		this.offsetY += y;

		return remaining;
	}
}
