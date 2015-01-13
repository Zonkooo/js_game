function Terrain(stage, texX)
{
	level = [
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	"..............................",
	".....................XX.......",
	"...........XX.................",
	"........XXXXXX................",
	"........XXXXXX......XXX.......",
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	];

	this.texX = texX;
	this.obstacles = [];

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
					this.obstacles.push(new createjs.Rectangle(block.x, block.y, 40, 40));
				}
				//add invisible blocks on each side to prevent character from falling
				this.obstacles.push(new createjs.Rectangle(-40, c*40, 40, 40));
				this.obstacles.push(new createjs.Rectangle(30*40, c*40, 40, 40));
			}
		}
	}
}
