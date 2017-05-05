var EPSILON = 0.01; //size of buffer between player and obstacles

function getValidMove(bb, direction, obstacles)
{
	var horizontal = {coord: "x", thickness: "width"};
	var vertical = {coord: "y", thickness: "height"};

	validateMoveInOneDimension(horizontal);
	validateMoveInOneDimension(vertical);

	return direction;

	function validateMoveInOneDimension(dimension)
	{
		bb[dimension.thickness] += Math.abs(direction[dimension.coord]);
		if(direction[dimension.coord] < 0)
			bb[dimension.coord] += direction[dimension.coord];
		for(var obs = 0; obs < obstacles.length; obs++)
		{
			var inter = bb.intersection(obstacles[obs]);
			if(inter)
			{
				var moveBack = inter[dimension.thickness] + EPSILON;
				if(direction[dimension.coord] < 0) moveBack = -moveBack;
				direction[dimension.coord] -= moveBack;
				bb[dimension.coord] -= moveBack;
				break;
			}
		}
	}
}
