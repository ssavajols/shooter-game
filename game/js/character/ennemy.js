/**
* @class Ennemy
* @param params
* @constructor
*/
define(
    [],
    function(){

        var Ennemy = function Ennemy(game, params){
            var frame, xStart, yStart, xEnd, yEnd;

            // config
            if( this.params ){
                frame = this.params.sprite;
                xStart = this.params.position.x/100*this.game.world.width;
                xEnd = this.params.direction.x/100*this.game.world.width;
                yStart = 0;
                yEnd = this.game.world.height;
            }else{
                frame = this.game.rnd.between(0, 100-1);
                xStart = this.game.rnd.between(0,this.game.world.width);
                xEnd = xStart;
                yStart = this.game.rnd.between(0,this.game.world.height/2);;
                yEnd = yStart;
            }

            Phaser.Sprite.call(this, game, xStart, yStart, 'ennemies', frame);

            this.params = params;
            this.health = 3;
            this.timer = {bullet:null};
            this.anchor.setTo(0.5, 0.5);

            this.events.onDestroy.add(_.bind(this.onDestroy, this));
            this.events.onKilled.add(_.bind(this.onDestroy, this));

            if( this.params ){
                this.timer.bullet = setTimeout(_.bind(function(){
                    this.fireBullet();

                    if( xStart !== xEnd && yStart !== yEnd ){
                        this.move(xEnd, yEnd);
                    }

                }, this), this.params.delay*1000);
            }else {
                this.timer.bullet = setTimeout(_.bind(function(){
                    this.fireBullet();
                }, this), Math.random()*3000);
            }

        };

        Ennemy.prototype = Object.create(Phaser.Sprite.prototype);
        Ennemy.prototype.constructor = Ennemy.prototype.constructor;

        /**
         *
         * @param xEnd
         * @param yEnd
         */
        Ennemy.prototype.move = function move(xEnd, yEnd){
            TweenLite.to(this.position, this.params.speed, {x:xEnd, y:yEnd, onComplete: _.bind(function(){
                ET.dispatchEvent({type:"remove:ennemy", ennemy: this, type: "EnnemyStandard"});
            }, this)});
        };

        /**
         *
         */
        Ennemy.prototype.onUpdate = function(){
            if( APPLICATION.option.debugBody ){
                this.game.game.debug.body(this);
            }
        };

        /**
         *
         */
        Ennemy.prototype.fireBullet = function(){
            this.game.bulletManager.add(this, APPLICATION.vars.bulletTypes.ENNEMY_STANDARD);
        };

        /**
         *
         */
        Ennemy.prototype.onDestroy = function(){
            clearTimeout(this.timer.bullet);
        };

        return Ennemy;
    });

