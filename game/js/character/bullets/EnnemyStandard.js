define(
    [
        './Bullet'
    ],
    function(Bullet){

        /**
         * @class EnnemyStandard
         * @extends Bullet
         * @return {EnnemyStandard}
         * @constructor
         */
        var EnnemyStandard = function EnnemyStandard(game, x, y){
            Bullet.call(this, game, x, y, 'fire', 50);

            this.speed = 200;

            this.anchor.set(0.5, 0.5);
            this.body.setSize(9, 20);

            this.body.velocity.y = this.speed;
            this.body.velocity.x = this.game.rnd.between(-this.disperse, this.disperse);

            return this;

        };

        EnnemyStandard.prototype = Object.create(Bullet.prototype);
        EnnemyStandard.prototype.constructor = EnnemyStandard.prototype.constructor;

        return EnnemyStandard;
    });