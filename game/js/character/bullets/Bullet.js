define(
    [],
    function(){


        /**
         * @class Bullet
         * @extend Phaser.Sprite
         * @return {Bullet}
         * @constructor
         */
        var Bullet = function Bullet(game, x, y, spriteSheet, frame){
            Phaser.Sprite.call(this, game, x, y, spriteSheet, frame);

            this.game.physics.arcade.enableBody(this);

            this.power = 1;
            this.speed = 500;
            this.disperse = 30;

            this.events.onKilled.add(_.bind(this.onKilled, this));

            return this;
        };

        Bullet.prototype = Object.create(Phaser.Sprite.prototype);
        Bullet.prototype.constructor = Bullet;

        /**
         *
         */
        Bullet.prototype.onKilled = function onKilled(){
            this.parent.remove(this, true);
        };

        return Bullet;
    });