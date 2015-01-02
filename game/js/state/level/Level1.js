define(
    [
        'tools/utils',
        'state/BaseLevel',
        "character/Ennemy"
    ],
    function(utils, BaseLevel, Ennemy){
        var Level1 = function Level1(){
            BaseLevel.call(this);
        };

        _.extend(Level1.prototype, BaseLevel.prototype, {
            preload: function(){
                this.data = utils.loadJson("a", true);
                BaseLevel.prototype.preload.apply(this, arguments);
            },
            createEnnemies: function createEnnemies(){

                _.each(this.data.ennemySequence, _.bind(function(params){
                    var e = new Ennemy(params);
                    e.sprite.instance = e;
                    this.ennemies.add(e.sprite);
                }, this));

            }
        });

        return Level1;
    });

