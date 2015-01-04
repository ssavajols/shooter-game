define(
    [],
    function(){

        /**
         * @class Explosion
         * @param game
         * @param x
         * @param y
         * @param frame
         * @param scale
         * @constructor
         */
        var Explosion = function Explosion(game, x, y, frame, scale){
            Phaser.Sprite.call(this, game, x, y, 'explosion', frame);

            this.anchor.setTo(0.5, 0.5);

            this.blendMode = Phaser.blendModes.SCREEN;

            var tween = game.add.tween(this);
            var to = {
                x:this.position.x+10+ _.random(-15, 10),
                y:this.position.y+10+ _.random(-15, 10)
            };

            this.rotation = Math.PI* _.random(0,360)/180;
            this.scale.set(scale, scale);
            console.log(scale);



            tween.to(to, 500);

            tween.onComplete.add(_.bind(function(){
                 this.destroy();
            }, this));

            this.animations.add('move', _.range(0, 20), 32);
            this.animations.play('move');

            tween.start();
        };

        Explosion.prototype = Object.create(Phaser.Sprite.prototype);
        Explosion.prototype.constructor = Explosion.prototype.constructor;

        return Explosion;
    });