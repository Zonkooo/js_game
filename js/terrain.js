function Terrain(stage, texX)
{
	level = [
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

	this.texX = texX;
	this.obstaclesBBs = [];
	this.obstaclesSprites = [];

	this.Load = function()
	{
		for(l in level)
		{
			line = level[l];
			for(c in line)
			{
				char = line[c];
				if(char == "X")
				{
					var block = new createjs.Bitmap(texX);
					block.x = c*40;
					block.y = l*40;
					stage.addChild(block);
					this.obstaclesSprites.push(block);
					this.obstaclesBBs.push(new createjs.Rectangle(block.x, block.y, 40, 40));
				}
				//add invisible blocks on each side to prevent character from falling
				this.obstaclesBBs.push(new createjs.Rectangle(-40, c*40, 40, 40));
				this.obstaclesBBs.push(new createjs.Rectangle(line.length*40, c*40, 40, 40));
			}
		}
	}

	this.TryMove = function(x)
	{
		for(o in this.obstaclesBBs)
		{
			this.obstaclesBBs[o].x -= x;
		}
		for(o in this.obstaclesSprites)
		{
			this.obstaclesSprites[o].x -= x;
		}
		return 0;
	}
}
