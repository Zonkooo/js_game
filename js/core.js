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

//percentage of the screen we try to keep around the player (if it enters it we move the background)
//0.5 means the player is always in the center
var viewBuffer = 0.3;

function startGame()
{
	stage = new createjs.Stage("gameCanvas");
	var text = new createjs.Text("Loading...");
	text.x = stage.canvas.width/2; text.y = stage.canvas.height/2;
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
	imgBlock.src = "media/crate.png";

	imgDebug.onload = preloadUpdate;
	imgDebug.src = "media/debug.png";

	createjs.Sound.addEventListener("fileload", preloadUpdate);
	createjs.Sound.registerSound("media/receive.wav", "jump", 4);
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount === preloadTotal)
		launchGame();
}

function launchGame()
{
	stage.removeChildAt(0); //loading text
	var level = level1;

	var objBg = new createjs.Bitmap(imgBg);
	stage.addChild(objBg);

	objTerrain = new Terrain(level.map);
	objTerrain.load(stage, imgBlock);

	var spSheet = new createjs.SpriteSheet({
			images: [imgPlayer],
			//regX in the middle of the sprite to allow turning left and right by just flipping scaleX
			frames: {height: 60, width: 54, regX: 27, regY: 53},
			animations: {
				run: [0, 7, "run", 0.4] ,
				jump: [8, 12, "jump", 0.4],
				still: [16, 23, "still", 0.4]
			}
		});
	var sprite = new createjs.Sprite(spSheet, "run");
	objPlayer = new Player(level.startPos.x, level.startPos.y, sprite);
	stage.addChild(objPlayer.internal);

	createjs.Ticker.framerate = 30;
	createjs.Ticker.addEventListener("tick", update);

	//manage keyboard state
	document.onkeydown = function(e){
		var key = code(e);
		isKeyPressed[key] = true;
		//alert(key);
	};
	document.onkeyup = function(e){
		var key = code(e);
		isKeyPressed[key] = false;
	};
}

function code(e)
{
	e = e || window.event;
	return e.key;
}

function update(event)
{
	objPlayer.update(event, objTerrain);

	stage.update();
}
