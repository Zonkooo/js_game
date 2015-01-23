EPSILON = 0.1; //size of buffer between player and obstacles

GetValidMove = function(bb, direction, obstacles)
{
	//try x move
	bb.width += Math.abs(direction.x);
	if(direction.x < 0)
		bb.x += direction.x;
	for(b in obstacles)
	{
		var block = obstacles[b];
		var inter = bb.intersection(block);
		if(inter)
		{
			moveback = inter.width + EPSILON;
			if(direction.x < 0) moveback = -moveback;
			direction.x -= moveback;
			bb.x -= moveback;
			break;
		}
	}
	//try y move
	bb.height += Math.abs(direction.y);
	if(direction.y < 0)
		bb.y += direction.y;
	for(b in obstacles)
	{
		var block = obstacles[b];
		var inter = bb.intersection(block);
		if(inter)
		{
			moveback = inter.height + EPSILON;
			if(direction.y < 0) moveback = -moveback;
			direction.y -= moveback;
			break;
		}
	}
	return direction;
}
