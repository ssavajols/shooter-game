define(
    [
        'state/BaseLevel',
        "character/Ennemy"
    ],
    function(BaseLevel, Ennemy){
        var Level2 = function Level1(){
            BaseLevel.call(this);
        };

        _.extend(Level2.prototype, BaseLevel.prototype, {
            createEnnemies: function createEnnemies(){
                _(10).times(_.bind(function(){
                    var e = new Ennemy();
                    e.sprite.instance = e;
                    this.ennemies.add(e.sprite);
                }, this));
            }
        });

        return Level2;
    });

