define(
    [
        './Bullet'
    ],
    function(Bullet){

        /**
         * @class PlayerStandard
         * @extends Bullet
         * @return {PlayerStandard}
         * @constructor
         */
        var PlayerStandard = function PlayerStandard(game, x, y){
            Bullet.call(this, game, x, y, 'fire', 20);

            this.anchor.set(0.5, 0.5);
            this.body.setSize(9, 20);

            this.body.velocity.y = -this.speed;
            this.body.velocity.x = this.game.rnd.between(-this.disperse, this.disperse);

            return this;
        };

        PlayerStandard.prototype = Object.create(Bullet.prototype);
        PlayerStandard.prototype.constructor = PlayerStandard.prototype.constructor;

        return PlayerStandard;
    });