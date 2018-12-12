function Terrain(level)
{
	var levelWidth;
	var levelHeight;
	var screenWidth = stage.canvas.width;
	var screenHeight = stage.canvas.height;

	this.obstaclesBBs = [];
	this.obstaclesSprites = [];
	this.offsetX = 0;
	this.offsetY = 0;

	this.load = function(stage, texX)
	{
		levelWidth = level[0].length * texX.width;
		levelHeight = level.length * texX.height;

		for(var l = 0; l < level.length; l++)
		{
			var line = level[l];
			for(var c = 0; c < line.length; c++)
			{
				var char = line[c];
				if(char == "X")
				{
					var block = new createjs.Bitmap(texX);
					block.x = c*texX.width;
					block.y = l*texX.height;
					stage.addChild(block);
					this.obstaclesSprites.push(block);
					this.obstaclesBBs.push(new createjs.Rectangle(block.x, block.y, texX.width, texX.height));
				}
			}
			//add invisible blocks on each side to prevent character from falling
			this.obstaclesBBs.push(new createjs.Rectangle(-texX.width, l*texX.height, texX.width, texX.height));
			this.obstaclesBBs.push(new createjs.Rectangle(line.length*texX.width, l*texX.height, texX.width, texX.height));
		}
	}

	//will move the terrain by x, except if we reach a boundary,
	//in which case it returns by how much the character should move
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
