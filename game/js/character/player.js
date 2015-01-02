define(
    [],
    function(){
        var Player = function Player(){

            this.state = APPLICATION.game.state.getCurrentState();
            this.speed = 2;
            this.lives = APPLICATION.option.gameOptions.lives;

            this.sprite = null;

            this.initialize();
        };

        _.extend(Player.prototype, {

            initialize: function(){
                this.sprite = this.state.add.sprite(0, 0, 'ship');
                this.sprite.isPlayer = true;

                this.resetPosition();
                this.sprite.anchor.x = this.sprite.anchor.y = 0.5;

                this.sprite.animations.add('left', _.range(0, 4), 10, false);
                this.sprite.animations.add('right',_.range(0, 4).reverse(), 10, false);

                this.state.game.physics.arcade.enable(this.sprite);

                this.inputs = this.state.input.keyboard.createCursorKeys();
                this.inputs.fire = this.state.input.keyboard.addKey(32);

                this.sprite.body.setSize(7, 20, -1, -3);

            },

            onUpdate: function onUpdate(){
//                this.state.game.debug.body(this.sprite);
                this.io();
            },

            io: function io(){
                var noAction = true;

                if( this.inputs.left.isDown ){
                    this.sprite.animations.play('left', 10, false);
                    this.sprite.position.x -= this.speed;
                    noAction = false;
                }else if( this.inputs.right.isDown) {
                    this.sprite.animations.play('right', 10, false);
                    this.sprite.position.x += this.speed;
                    noAction = false;
                }

                if( this.inputs.up.isDown ){
                    this.sprite.position.y -= this.speed;
                    noAction = false;
                }else if( this.inputs.down.isDown ){
                    this.sprite.position.y += this.speed;
                    noAction = false;
                }

                if( this.inputs.fire.isDown ){
                    this.fireBullet();
                }

                if( noAction ){
                    this.sprite.animations.stop();
                    this.sprite.frame = 0;
                }


            },

            fireBullet: _.throttle(function(){
                if( window.ET ){
                    ET.emit({type:"bullet:add", sprite: this.sprite, type: "PlayerStandard"});
                }
            }, 100),

            resetPosition: function(){
                this.sprite.position.set(this.state.world.width/2, this.state.world.height/3*2);
            },

            die: function(){
                --this.lives;
                ET.dispatchEvent({type: 'player:dead'});
                this.resetPosition();
            },

            dead: function dead(){
                this.sprite.kill();
            },

            destroy: function(){
                this.sprite.destroy();
            }
        });

        return Player;
    });

