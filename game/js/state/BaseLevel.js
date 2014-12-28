define(
    [
        "character/Player",
        "character/Ennemy",
        "character/Bullet"
    ],
    function(Player, Ennemy, Bullets){
        var BaseLevel = function Level(){
            this.initialize();
            this.player = null;
            this.bullets = null;
        };

        _.extend(BaseLevel.prototype, {
            initialize: _.noop,

            preload: function(){

                this.load.spritesheet('fire', 'assets/sprite/fireball.png', 64, 64);
                this.load.spritesheet('ship', 'assets/sprite/spaceship.png', 100, 100);
                this.load.spritesheet('ennemies', 'assets/sprite/spaceshipennemies.png', 44, 44);

            },

            create: function(){

                console.log("create");
                this.player = new Player();
                this.bullets = new Bullets();

                this.ennemies = this.add.group();

                this.ennemies.enableBody = true;
                this.createEnnemies();

                console.log(this);


            },


            update: function update(){

                this.player.onUpdate();
                this.ennemies.forEach(function(e){
                    e.instance.onUpdate();
                });
                this.bullets.onUpdate();
                this.collisions();

            },

            shutdown: function shutdown(){
                console.log("shutdown");

                // REMOVE ELEMENTS HERE
            },

            collisions:function collisions(){

//        console.log(this.player, this.ennemies, this.bullets);

                this.physics.arcade.overlap(this.player.sprite, this.ennemies, this.playerDead, null, this);
                this.physics.arcade.overlap(this.bullets.ennemies, this.player.sprite, this.playerDead, null, this);
                this.physics.arcade.overlap(this.bullets.player, this.ennemies, this.ennemyDead, null, this);
            },

            ennemyDead: function ennemyDead(bullet, ennemy){
                console.log('collision bullet');

                bullet && bullet.kill();

                this.ennemies.remove(ennemy, true);

                if( !this.ennemies.length) {
                    APPLICATION.start('MainMenu');
                }

            },

            playerDead : function playerDead(){
                console.log('collision player');
                this.player.dead();
                APPLICATION.start('MainMenu');
            }


        });

        return BaseLevel;
    });

