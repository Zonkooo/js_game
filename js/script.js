var preloadCount = 0;
var preloadTotal = 1;

var imgPlayer = new Image();
var objPlayer;

var stage;

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate();
	imgPlayer.src = "media/joueur.png";
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount == preloadTotal)
		launchGame();
}

function launchGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));
	objPlayer = new createjs.Bitmap(imgPlayer);
	objPlayer.regX = 64;
	objPlayer.x = 64;

	stage.addChild(objPlayer);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}

var moveIncrement = 4;

function update()
{
	objPlayer.x += moveIncrement;
	if(objPlayer.x > 800 - 64 || objPlayer.x < 64)
	{
		moveIncrement = -(moveIncrement*1.2);
		objPlayer.y += 64;
		objPlayer.scaleX = -objPlayer.scaleX;
	}
	stage.update();
}
