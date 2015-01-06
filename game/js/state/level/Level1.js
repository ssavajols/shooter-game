define(
    [
        'tools/utils',
        'state/BaseLevel',
        "character/Ennemy",
        'class/ParallaxMap'
    ],
    function(utils, BaseLevel, Ennemy){

        /**
         * @class Level1
         * @extends BaseLevel
         * @constructor
         */
        var Level1 = function Level1(){
            BaseLevel.call(this);
        };


        Level1.prototype = Object.create(BaseLevel.prototype);
        Level1.prototype.constructor = Level1.prototype.constructor;

        Level1.prototype.preload = function(){
            this.data = utils.loadJson("level1-ennemies", true);

            this.map.preload(this,
                [
                    { name:'map', path:'assets/tileset/mapx0y2.jpg'},
                    { name:'map2', path:'assets/tileset/cloud.png'}
                ]);

            BaseLevel.prototype.preload.apply(this, arguments);
        };

        /**
         *
         */
        Level1.prototype.create = function(){

            this.map.setParallaxLayer('map', {x: 0, y:0.1});
            this.map.setParallaxLayer('map2', {x:0.5, y:1}, {w: this.stage.width, h: this.stage.height});

            this.map.getLayer('map2').blendMode = Phaser.blendModes.SATURATION;

            BaseLevel.prototype.create.apply(this, arguments);
        };

        /**
         *
         */
        Level1.prototype.createEnnemies = function createEnnemies(){

            _.each(this.data.ennemySequence, _.bind(function(params){
                this.ennemies.add(new Ennemy(this.game, params));
            }, this));

        };

        return Level1;
    });

