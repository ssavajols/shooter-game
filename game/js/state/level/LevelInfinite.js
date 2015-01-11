define(
    [
        'state/BaseLevel',
        "character/ennemy/ennemies",
    ],
    function(BaseLevel, Ennemy){

        /**
         * @class Level1
         * @extends BaseLevel
         * @constructor
         */
        var LevelInfinite = function LevelInfinite(){
            BaseLevel.call(this);

            this.availableEnnemyClasses = {
                0: [1, 2]
            };

        };


        LevelInfinite.prototype = Object.create(BaseLevel.prototype);
        LevelInfinite.prototype.constructor = LevelInfinite.prototype.constructor;

        /**
         *
         */
        LevelInfinite.prototype.preload = function preload(){

            this.map.preload(this,
                [
                    { name:'galaxy', path:'assets/tileset/galaxy.jpg'},
                    { name:'stars', path:'assets/tileset/stars.png'}
                ]);

            BaseLevel.prototype.preload.apply(this, arguments);
        };

        /**
         * @method LevelInfinite.prototype.create
         */
        LevelInfinite.prototype.create = function create(){
            this.startTime = this.game.time.now;

            this.map.setParallaxLayer('galaxy', {x: 0.05, y:0.1});
            this.map.setParallaxLayer('stars', {x:0.2, y:0.3}, {w: this.stage.width, h: this.stage.height});

            BaseLevel.prototype.create.apply(this, arguments);


            this.score = this.game.add.text(0, 0, 0,  {font: 'normal 11px munroregular', stroke: 'black', strokeThickness: 3, fill:"white", align:"center"});

            this.score.value = -1;

            this.updateScore();
        };

        /**
         * @method LevelInfinite.prototype.createEnnemies
         */
        LevelInfinite.prototype.createEnnemies = function createEnnemies(){
            var ennemyClass = this._getRandomEnnemy();
            var params = {
                0: 1,
                1: _.random(20, 80),
                2: 0,
                sprite: _.random(0 , 99)
            };
            var e = new this.ennemiesClasses[this.ennemiesData[ennemyClass].class](this.game, params);


            this.ennemies.add(e);
        }; 


        /**
         * @method LevelInfinite.prototype.update
         */
        LevelInfinite.prototype.update = function update(){

            var stars = this.map.getLayer('stars');

            var currentTime = this.game.time.now-this.startTime;

            this.score.position.set(this.game.width/2-this.score.width/2, 5);
            if( (currentTime%1000) < currentTime/1000)  {
                this.createEnnemies();
            }


            if( !stars.speedAlpha ){
                stars.speedAlpha = 0.01;
            }

            if( stars.alpha < 0.3 ){
                stars.speedAlpha = 0.005;
            }else if( stars.alpha > 0.7 ){
                stars.speedAlpha = -0.005;
            }

            stars.alpha += stars.speedAlpha;

            BaseLevel.prototype.update.apply(this, arguments);
        };

        /**
        * @method LevelInfinite.prototype._getRandomEnnemy
        * @private
        */
        LevelInfinite.prototype._getRandomEnnemy = function _getRandomEnnemy(){
            var arr;
            for( var attr in this.availableEnnemyClasses ){
                attr = attr*1;
                if( attr <= (this.game.time.now-this.startTime)){
                    arr = attr;
                }
            }

            return this.availableEnnemyClasses[arr][_.random(0, this.availableEnnemyClasses[arr].length-1)]; 
        };

        /**
         * @method LevelInfinite.prototype.shutdown
         */
        LevelInfinite.prototype.shutdown = function shutdown(){
            clearInterval(this.randomTimer);
            BaseLevel.prototype.shutdown.apply(this, arguments);
        };

        /**
         * @method LevelInfinite.prototype.end
         */
        LevelInfinite.prototype.end = function end(){
            if(this.player.health < 0){
                APPLICATION.start('MainMenu');
            }
        };

        /**
         * @method LevelInfinite.prototype.updateScore
         */
        LevelInfinite.prototype.updateScore = function updateScore(){
            this.score.setText('SCORE\n' + (++this.score.value));
        };

        /**
         * @method LevelInfinite.prototype.ennemyDead
         */
        LevelInfinite.prototype.ennemyDead = function ennemyDead(){
            this.updateScore();

            BaseLevel.prototype.ennemyDead.apply(this, arguments);
        };
        
        /**
         * @method LevelInfinite.prototype.shutdown
         */
        LevelInfinite.prototype.shutdown = function shutdown(){
            this.score.destroy();
        };


        return LevelInfinite;
    });

