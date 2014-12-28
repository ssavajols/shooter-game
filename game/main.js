var application = new Application();
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var bullets;
var ennemies;
var cursors;
var player;
var fire;
var ET = {};
PIXI.EventTarget.call(ET);

var ennemyData = loadJson("a", true);
var bulletData = loadJson("bullet", true);

application.newState('level1', false, new Level1());
application.newState('level2', false, new Level2());


application.start('level'+ _.random(1,2));