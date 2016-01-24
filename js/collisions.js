var EPSILON = 0.1; //size of buffer between player and obstacles

function getValidMove(bb, direction, obstacles)
{
	//try x move
	bb.width += Math.abs(direction.x);
	if(direction.x < 0)
		bb.x += direction.x;
	for(var bX = 0; bX < obstacles.length; bX++)
	{
		var interX = bb.intersection(obstacles[bX]);
		if(interX)
		{
			var moveBackX = interX.width + EPSILON;
			if(direction.x < 0) moveBackX = -moveBackX;
			direction.x -= moveBackX;
			bb.x -= moveBackX;
			break;
		}
	}
	//try y move
	bb.height += Math.abs(direction.y);
	if(direction.y < 0)
		bb.y += direction.y;
	for(var bY = 0; bY < obstacles.length; bY++)
	{
		var interY = bb.intersection(obstacles[bY]);
		if(interY)
		{
			var moveBackY = interY.height + EPSILON;
			if(direction.y < 0) moveBackY = -moveBackY;
			direction.y -= moveBackY;
			break;
		}
	}
	return direction;
}
