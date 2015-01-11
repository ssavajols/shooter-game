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

            if( APPLICATION.vars.difficulty === "easy"){
                this.health = _.random(1, 3);
            }else if( APPLICATION.vars.difficulty === "medium" ){
                this.health = _.random(3, 8);
            }else {
                this.health = _.random(5, 12);
            }

            BaseEnnemy.call(this, game, params);
        };

        Ennemy.prototype = Object.create(BaseEnnemy.prototype);
        Ennemy.prototype.constructor = Ennemy.prototype.constructor;

        return Ennemy;
    });