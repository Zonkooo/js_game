var isKeyPressed = [];

var preloadCount = 0;
var preloadTotal = 5;

var objPlayer;
var objTerrain;

var imgPlayer = new Image();
var imgBg = new Image();
var imgBlock = new Image();
var imgDebug = new Image();

var stage;

function startGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));
	var text = new createjs.Text("Loading...");
	text.x = 600; text.y = 300;
	text.textAlign = "center"; text.textBaseline = "middle";
	stage.addChild(text);
	stage.update();

	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate;
	imgPlayer.src = "media/player_anim.png";

	imgBg.onload = preloadUpdate;
	imgBg.src = "media/bg.png";

	imgBlock.onload = preloadUpdate;
	imgBlock.src = "media/block.png";

	imgDebug.onload = preloadUpdate;
	imgDebug.src = "media/debug.png";

	createjs.Sound.addEventListener("fileload", preloadUpdate);
	createjs.Sound.registerSound("media/receive.wav", "jump", 4);
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount == preloadTotal)
		launchGame();
}

function launchGame()
{
	stage.removeChildAt(0); //loading text

	var objBg = new createjs.Bitmap(imgBg);
	stage.addChild(objBg);

	objTerrain = new Terrain(level1);
	objTerrain.load(stage, imgBlock);

	var spSheet = new createjs.SpriteSheet({
			images: [imgPlayer],
			frames: {height: 60, width: 54, regX: 27},
			animations: {
				run: [0, 7, "run", 0.4] ,
				jump: [8, 12, "jump", 0.4],
				still: [16, 23, "still", 0.4]
			}
		});
	var sprite = new createjs.Sprite(spSheet, "run");
	objPlayer = new Player(50, -60, sprite);
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
	objPlayer.update(event, objTerrain);

	stage.update();
}
