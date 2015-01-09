
define(
    [
        './strategy/moves'
    ],
    function(moves){

        /**
         * @class Ennemy
         * @uses Phaser.Sprite
         * @param params
         * @constructor
         */
        var Ennemy = function Ennemy(game, params){
            var xStart, yStart;

            this.params = params;

            // config
            if( this.params ){
                this.move = this.params.move ? new moves[this.params.move]() : new moves['EnnemyMove001']();

                xStart = this.params[1]/100*game.world.width;
                yStart = this.params[2]/100*game.world.height;
            }else{
                this.move = new moves['EnnemyMove001']();

                xStart = game.rnd.between(0,game.world.width);
                yStart = game.rnd.between(0,game.world.height/2);;
            }
            
            this.game.physics.arcade.enableBody(this);

            this.move.setAnimation(this, xStart, yStart, this.params);


            this.timer = {bullet:null};
            this.anchor.setTo(0.5, 0.5);

            this.events.onDestroy.add(_.bind(this.onDestroy, this));
            this.events.onKilled.add(_.bind(this.onDestroy, this));

            this.move.do();
        };

        Ennemy.prototype = Object.create(Phaser.Sprite.prototype);
        Ennemy.prototype.constructor = Ennemy.prototype.constructor;

        /**
         * @method Ennemy.prototype.onUpdate
         */
        Ennemy.prototype.onUpdate = function(){
            if( APPLICATION.option.debugBody ){
                this.game.debug.body(this);
            }

            this.move.onUpdate && this.move.onUpdate();
        };

        /**
         * @method Ennemy.prototype.fireBullet
         */
        Ennemy.prototype.fireBullet = function(){
            this.game.state.getCurrentState().bulletManager.add(this, APPLICATION.vars.bulletTypes.ENNEMY_STANDARD);
        };

        /**
         *
         */
        Ennemy.prototype.onDestroy = function(){
            clearTimeout(this.timer.bullet);
        };

        return Ennemy;
    });

