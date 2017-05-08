
QUnit.test("no collision if no obstacle", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:1, y:1};
    var actual = getValidMove(boundingBox, wanted, []);
    assert.equal(actual, wanted);
});

QUnit.test("no collision if no obstacle far", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:1, y:1};
    var obstacles = [new createjs.Rectangle(100, 0, 10, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    assert.equal(actual, wanted);
});

QUnit.test("don't move if already close to obstacle", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:1, y:0};
    var obstacles = [new createjs.Rectangle(10, 0, 10, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, 0);
    assert.equal(actual.y, wanted.y);
});

QUnit.test("move as much as possible if obstacle in the way X", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:10, y:0};
    var obstacles = [new createjs.Rectangle(15, 0, 10, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, 5);
    assert.equal(actual.y, wanted.y);
});

QUnit.test("if ending on pointy corner, do all X and as much of Y as possible", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:10, y:10};
    var obstacles = [new createjs.Rectangle(15, 15, 10, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.y, 5);
    assert.equal(actual.x, wanted.x);
});

QUnit.test("shorten both X and Y if ending in corner", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:10, y:10};
    var obstacles = [new createjs.Rectangle(15, 5, 10, 10), new createjs.Rectangle(5, 15, 10, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, 5);
    closeEnough(assert, actual.y, 5);
});

QUnit.test("cannot cross obstacles that are less than one frame thick", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:20, y:0};
    var obstacles = [new createjs.Rectangle(15, 0, 2, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, 5);
    assert.equal(actual.y, wanted.y);
});

QUnit.test("cannot cross obstacles that are less than one frame thick in negative direction", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:-20, y:0};
    var obstacles = [new createjs.Rectangle(-7, 0, 2, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, -5);
    assert.equal(actual.y, wanted.y);
});

QUnit.test("if double intersection, closest one is used", function(assert) {
    var boundingBox =  new createjs.Rectangle(0, 0, 10, 10);
    var wanted = {x:20, y:0};
    var obstacles = [new createjs.Rectangle(15, 0, 2, 10), new createjs.Rectangle(12, 0, 2, 10)];
    var actual = getValidMove(boundingBox, wanted, obstacles);
    closeEnough(assert, actual.x, 2);
    assert.equal(actual.y, wanted.y);
});

function closeEnough(assert, actual, expected)
{
    assert.ok(Math.abs(actual-expected) < 2*EPSILON, "expected " + expected + " +-" + 2*EPSILON + " got " + actual);
}