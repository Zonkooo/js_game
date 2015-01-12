EPSILON = 0.1; //size of buffer between player and obstacles

GetValidMove = function(bb, direction, obstacles)
{
	//try x move
	bb.x += direction.x;
	for(b in obstacles)
	{
		var block = obstacles[b];
		var inter = intersection(bb, block);
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
	bb.y += direction.y;
	for(b in obstacles)
	{
		var block = obstacles[b];
		var inter = intersection(bb, block);
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

intersects = function(rect1, rect2) {
	return (rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y+rect2.height && rect2.y <= rect1.y + rect1.height);
};

intersection = function(rect1, rect2) {
	var x1 = rect1.x, y1 = rect1.y, x2 = x1+rect1.width, y2 = y1+rect1.height;
	if (rect2.x > x1) { x1 = rect2.x; }
	if (rect2.y > y1) { y1 = rect2.y; }
	if (rect2.x + rect2.width < x2) { x2 = rect2.x + rect2.width; }
	if (rect2.y + rect2.height < y2) { y2 = rect2.y + rect2.height; }
	return (x2 <= x1 || y2 <= y1) ? null : new createjs.Rectangle(x1, y1, x2-x1, y2-y1);
};
