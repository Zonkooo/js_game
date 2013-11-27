var preloadCount = 0;
var preloadTotal = 0;

var stage;
var nodes = new Array();

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	launchGame();
	//imgPlayer.onload = preloadUpdate();
	//imgPlayer.src = "media/joueur.png";
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
	
	circle = new createjs.Shape();
	circle.graphics.beginFill("white").drawCircle(0, 0, 5000);
	stage.addChild(circle);		
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
	stage.addEventListener("click", createNode);
}

function createNode(event)
{
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(event.stageX, event.stageY, 20);
	stage.addChild(circle);
	nodes[nodes.length] = circle;
}

function update()
{
//	for(i = 0; i < nodes.length; i++)
//	{
//		//?
//	}

	stage.update();	
}