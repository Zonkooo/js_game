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
		var moveBackUsed = 0;
		for(var obs = 0; obs < obstacles.length; obs++)
		{
			var inter = bb.intersection(obstacles[obs]);
			if(inter)
			{
				var moveBack;
				if(direction[dimension.coord] < 0)
					moveBack = inter[dimension.coord] + inter[dimension.thickness] - bb[dimension.coord] + EPSILON;
				else
					moveBack = inter[dimension.coord] - (bb[dimension.coord] + bb[dimension.thickness]) - EPSILON;

				if(Math.abs(moveBack) > Math.abs(moveBackUsed))
					moveBackUsed = moveBack;
			}
		}
		direction[dimension.coord] += moveBackUsed;
		bb[dimension.coord] += moveBackUsed;

		if(Math.abs(direction[dimension.coord]) < EPSILON)
			direction[dimension.coord] = 0;
	}
}
