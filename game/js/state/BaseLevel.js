define(
    [
        "character/Player",
        "character/Ennemy",
        "character/explosion",
        "class/BulletManager",
        "class/ParallaxMap",
    ],
    function(Player, Ennemy, Explosion, BulletManager, ParallaxMap){

        /**
         * @class BaseLevel
         * @constructor
         */
        var BaseLevel = function Level(){
            this.initialize();
            this.player = null;
            this.bulletManager = null;
            this.explosions = null;
            this.map = new ParallaxMap();
        };

        _.extend(BaseLevel.prototype, {
            initialize: _.noop,

            /**
             *
             */
            preload: function(){

                this.load.spritesheet('fire', 'assets/sprite/fireball.png', 32, 32);
                this.load.spritesheet('ship', 'assets/sprite/spaceship.png', 32, 32);
                this.load.spritesheet('explosion', 'assets/sprite/explosion.png', 64, 64);
                this.load.spritesheet('ennemies', 'assets/sprite/spaceshipennemies.png', 32, 32);

            },

            /**
             *
             */
            create: function(){

                console.log("create");

                this.bulletManager = new BulletManager(this.game);
                this.player = new Player(this.game, 0, 0);

                this.game.add.existing(this.player);

                this.ennemies = this.add.group();
                this.explosions = this.add.group();

                this.ennemies.enableBody = true;
                this.createEnnemies();

                if( this.map.getLayers() === null ){
                    console.error('no map loaded');
                }

            },

            /**
             *
             */
            update: function update(){


                this.player.onUpdate();
                this.ennemies.forEach(function(e){
                    e.instance.onUpdate();
                });
                this.bulletManager.onUpdate();

                if( this.map.getLayers() !== null){
                    this.map.getLayers().forEach(function(layer){
                       layer.tilePosition.x += layer.speed.x;
                       layer.tilePosition.y += layer.speed.y;
                    });
                }

                this.collisions();
            },

            /**
             *
             */
            shutdown: function shutdown(){
                console.log("shutdown");

                this.player.destroy(true);
                this.ennemies.destroy(true);
                this.bulletManager.destroy(true);
                this.explosions.destroy(true);

                // REMOVE ELEMENTS HERE
            },

            /**
             *
             */
            collisions:function collisions(){

                console.log(this.bulletManager.player.length, this.bulletManager.ennemies.length, this.explosions.length);

                try {
                    this.physics.arcade.overlap(this.player, this.ennemies, this.playerHitted, null, this);
                    this.physics.arcade.overlap(this.bulletManager.ennemies, this.player, this.playerHitted, null, this);
                    this.physics.arcade.overlap(this.bulletManager.player, this.ennemies, this.ennemyDead, null, this);
                }catch(e){
                    console.error(e);
                }

            },

            /**
             *
             * @param bullet
             * @param ennemy
             */
            ennemyDead: function ennemyDead(bullet, ennemy){
                console.log('collision bullet');

                this.explosions.add(new Explosion(this.game, ennemy.position.x, ennemy.position.y, 1, this.game.rnd.between(5, 7)/10));

                ennemy.damage(bullet.power);
                bullet.damage(1);

                if( ennemy.health > 0 ){
                    return;
                }

                this.ennemies.remove(ennemy, true);

                if( !this.ennemies.length) {
                    APPLICATION.start('MainMenu');
                }

            },

            /**
             *
             * @param ennemy
             * @param player
             */
            playerHitted : function playerHitted(ennemy, player){


                if( !this.player.hitted() ){
                    return;
                }

                this.explosions.add(new Explosion(this.game, player.position.x, player.position.y, 1, 1));

                if( this.player.lives === 0 ){
                    this.end();
                }

            },

            /**
             *
             */
            end: function end(){
                APPLICATION.start('MainMenu');
            }


        });

        return BaseLevel;
    });

