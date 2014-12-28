define(
    [
        'state/BaseLevel',
        "character/Ennemy"
    ],
    function(BaseLevel, Ennemy){
        var Level1 = function Level1(){
            BaseLevel.call(this);
        };

        _.extend(Level1.prototype, BaseLevel.prototype, {
            createEnnemies: function createEnnemies(){

                _.each(ennemyData.ennemySequence, _.bind(function(params){
                    var e = new Ennemy(params);
                    e.sprite.instance = e;
                    this.ennemies.add(e.sprite);
                }, this));

            }
        });

        return Level1;
    });

