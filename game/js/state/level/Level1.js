define(
    [
        'tools/utils',
        'state/BaseLevel',
        "character/Ennemy",
        'class/ParallaxMap'
    ],
    function(utils, BaseLevel, Ennemy, ParallaxMap){
        var Level1 = function Level1(){
            BaseLevel.call(this);
        };

        _.extend(Level1.prototype, BaseLevel.prototype, {

            /**
             *
             */
            preload: function(){
                this.data = utils.loadJson("a", true);

                this.map.preload(this,
                    [
                        { name:'map', path:'assets/tileset/mapx0y2.jpg'},
                        { name:'map2', path:'assets/tileset/cloud.png'}
                    ]);

                BaseLevel.prototype.preload.apply(this, arguments);
            },

            /**
             *
             */
            create: function(){


                this.map.setParallaxLayer('map', {x: 0, y:0.1});
                this.map.setParallaxLayer('map2', {x:0.5, y:1}, {w: this.stage.width, h: this.stage.height});

                this.map.getLayer('map2').blendMode = Phaser.blendModes.SATURATION;

                BaseLevel.prototype.create.apply(this, arguments);
//                this.world.children[0].z = 10;
//                this.world.children[1].z = 20;
//                this.world.children[2].z = 30;
//                this.world.children[3].z = 30;
//                this.world.children[4].z = 30;
//                console.log(this.world.sort("z", Phaser.Group.SORT_ASCENDING));
            },

            /**
             *
             */
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

