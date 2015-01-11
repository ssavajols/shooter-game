define(
    [
        '../BaseEnnemy'
    ],
    function(BaseEnnemy){

        /**
         * @class Ennemy002
         * @extends BaseEnnemy
         * @constructor
         */
        var Ennemy = function(game, params){

            Phaser.Sprite.call(this, game, 0, 0, 'birds', 0);

            if( APPLICATION.vars.difficulty === "easy"){
                this.health = 1;
            }else if( APPLICATION.vars.difficulty === "medium" ){
                this.health = _.random(2, 4);
            }else {
                this.health = _.random(3, 6);
            }

            this.scale.x = this.game.rnd.between(0, 1) ? -1 : 1;

            this.animations.add('fly', _.range(0, 3).concat(_.range(3,0, -1)), 6, true);


            this.animations.play('fly');

            BaseEnnemy.call(this, game, params);
        };

        Ennemy.prototype = Object.create(BaseEnnemy.prototype);
        Ennemy.prototype.constructor = Ennemy.prototype.constructor;

        return Ennemy;
    });