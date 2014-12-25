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
	"..............................",
	"...........XX........XX.......",
	".........XXXXX................",
	"........XXXXXX......XXX.......",
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	];

	this.texX = texX;
	this.childs = [];

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
					block.boundingBox = new createjs.Rectangle(block.x, block.y, 40, 40);
					stage.addChild(block);
					this.childs.push(block);
				}
				//add invisible blocks on each side to prevent character from falling
				var wallLeft = {}, wallRight = {};
				wallLeft.boundingBox = new createjs.Rectangle(-40, c*40, 40, 40);
				wallRight.boundingBox = new createjs.Rectangle(30*40, c*40, 40, 40);
				this.childs.push(wallLeft);
				this.childs.push(wallRight);
			}
		}
	}

	this.ValidateMove = function(bb)
	{
		for(b in this.childs)
		{
			var block = this.childs[b];
			if(intersects(bb, block.boundingBox))
				return false;
		}
		return true;
	}

	intersects = function(rect1, rect2) {
		return (rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y+rect2.height && rect2.y <= rect1.y + rect1.height);
	};
}
