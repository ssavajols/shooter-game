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
        var Level2 = function Level1(){
            BaseLevel.call(this);
        };


        Level2.prototype = Object.create(BaseLevel.prototype);
        Level2.prototype.constructor = Level2.prototype.constructor;

        Level2.prototype.createEnnemies = function createEnnemies(){
            _(10).times(_.bind(function(){
                this.ennemies.add(new Ennemy(this.game));
            }, this));
        };

        return Level2;
    });

