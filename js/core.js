var isKeyPressed = [];

var preloadCount = 0;
var preloadTotal = 2;

var objPlayer;
var objTerrain;

var imgPlayer = new Image();
var imgBg = new Image();
var imgBlock = new Image();

var stage;

var gravity = 1;

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate();
	imgPlayer.src = "media/player.png";

	imgBg.onload = preloadUpdate();
	imgBg.src = "media/bg.jpg";

	imgBlock.onload = preloadUpdate();
	imgBlock.src = "media/block.png";
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

	objTerrain = new Terrain(stage, imgBlock);
	objTerrain.Load();

	objPlayer = new Player(50, -40, new createjs.Bitmap(imgPlayer));
	stage.addChild(objPlayer.internal);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);

	//manage keyboard state
	document.onkeydown = function(e){
	    var key = code(e);
	    isKeyPressed[key] = true;
//		alert(key);
	};
	document.onkeyup = function(e){
	    var key = code(e);
	    isKeyPressed[key] = false;
	};
}

function code(e)
{
	e = e || window.event;
	return(e.keyCode || e.which);
}

function update(event)
{
	objPlayer.Update(event);

	stage.update();
}
