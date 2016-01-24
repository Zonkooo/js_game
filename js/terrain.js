function Terrain(stage, texX)
{
	var level = [
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	"............................................................",
	".....................XX...XX................................",
	"...........XX...............................................",
	"........XXXXXX....................X.X......................X",
	"........XXXXXX......XXX............X......................XX",
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	];
	var levelWidth = level[0].length * 40;
	var screenWidth = 1200;

	this.obstaclesBBs = [];
	this.obstaclesSprites = [];
	this.offsetX = 0;

	this.load = function()
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

	this.tryMove = function(x)
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
}
