var preloadCount = 0;
var preloadTotal = 2;

var imgPlayer = new Image();
var objPlayer;

var imgBg = new Image();
var imgBullet = new Image();

var stage;

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate();
	imgPlayer.src = "media/joueur.png";

	imgBg.onload = preloadUpdate();
	imgBg.src = "media/bg.jpg";
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

	var objBg = new createjs.Bitmap(imgBg);
	stage.addChild(objBg);

	objPlayer = new createjs.Bitmap(imgPlayer);
	objPlayer.regX = 64;
	objPlayer.regY = 32;
	objPlayer.x = 70;
	objPlayer.y = 300;
	stage.addChild(objPlayer);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}

var speed = 4

function update()
{
	objPlayer.y = Math.min(Math.max(stage.mouseY, 32), 600-32);
	stage.update();
}
