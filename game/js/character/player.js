define(
    [],
    function(){
        var Player = function Player(){

            this.state = APPLICATION.game.state.getCurrentState();
            this.speed = 3;

            this.sprite = null;

            this.initialize();
        };

        _.extend(Player.prototype, {

            initialize: function(){
                this.sprite = this.state.add.sprite(this.state.world.width/2, this.state.world.height/3*2, 'ship');
                this._initialize = true;

                this.sprite.anchor.x = this.sprite.anchor.y = 0.5;

                this.sprite.animations.add('left', _.range(0, 8), 10, false);
                this.sprite.animations.add('right',_.range(0, 8).reverse(), 10, false);

                this.state.game.physics.arcade.enable(this.sprite);

                this.inputs = this.state.input.keyboard.createCursorKeys();
                this.inputs.fire = this.state.input.keyboard.addKey(32);

                this.sprite.body.setSize(20, 20, 0, 0);

            },

            onUpdate: function onUpdate(){
                this.state.game.debug.body(this.sprite);
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
                    ET.emit({type:"bullet:add", sprite: this.sprite});
                }
            }, 100),

            dead: function dead(){
                this.sprite.kill();
            },

            destroy: function(){
                this.sprite.destroy();
            }
        });

        return Player;
    });

