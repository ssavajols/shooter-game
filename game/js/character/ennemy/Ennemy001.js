define(
    [
        '../BaseEnnemy'
    ],
    function(BaseEnnemy){

        /**
         * @class Ennemy001
         * @extends BaseEnnemy
         * @constructor
         */
        var Ennemy = function(game, params){

            Phaser.Sprite.call(this, game, 0, 0, 'ennemies', params.sprite || 1);
            this.health = 3;

            BaseEnnemy.call(this, game, params);
        };

        Ennemy.prototype = Object.create(BaseEnnemy.prototype);
        Ennemy.prototype.constructor = Ennemy.prototype.constructor;

        return Ennemy;
    });