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
        var Level2 = function Level2(){
            BaseLevel.call(this);

            this.availableEnnemyClasses = {
                0: [1, 2]
            };

        };


        Level2.prototype = Object.create(BaseLevel.prototype);
        Level2.prototype.constructor = Level2.prototype.constructor;

        /**
         * @method Level2.prototype.create
         */
        Level2.prototype.create = function create(){
            this.startTime = this.game.time.now;

            this.score = this.game.add.text(0, 0, 0,  {font: 'normal 11px munroregular', fill:"white"});
            this.score.value = -1;

            this.updateScore();

            BaseLevel.prototype.create.apply(this, arguments);
        }; 

        /**
         * @method Level2.prototype.createEnnemies
         */
        Level2.prototype.createEnnemies = function createEnnemies(){
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
         * @method Level2.prototype.update
         */
        Level2.prototype.update = function update(){

            var currentTime = this.game.time.now-this.startTime;

            if( (currentTime%1000) < currentTime/1000)  {
                this.createEnnemies();
            }

            BaseLevel.prototype.update.apply(this, arguments);
        };

        /**
        * @method Level2.prototype._getRandomEnnemy
        * @private
        */
        Level2.prototype._getRandomEnnemy = function _getRandomEnnemy(){
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
         * @method Level2.prototype.shutdown
         */
        Level2.prototype.shutdown = function shutdown(){
            clearInterval(this.randomTimer);
            BaseLevel.prototype.shutdown.apply(this, arguments);
        };

        /**
         * @method Level2.prototype.end
         */
        Level2.prototype.end = function end(){
            if(this.player.health < 0){
                APPLICATION.start('MainMenu');
            }
        };

        /**
         * @method Level2.prototype.updateScore
         */
        Level2.prototype.updateScore = function updateScore(){
            this.score.setText('score : ' + (++this.score.value));  
        };

        /**
         * @method Level2.prototype.ennemyDead
         */
        Level2.prototype.ennemyDead = function ennemyDead(){
            this.updateScore();

            BaseLevel.prototype.ennemyDead.apply(this, arguments);
        };
        
        /**
         * @method Level2.prototype.shutdown
         */
        Level2.prototype.shutdown = function shutdown(){
            this.score.destroy();
        };


        return Level2;
    });

