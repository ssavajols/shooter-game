define(
    [],
    function(){

        /**
         * @class Player
         * @extends Phase.Sprite
         * @param game
         * @param x
         * @param y
         * @param frame
         * @constructor
         */
        var Player = function Player(game, x, y, frame){

            Phaser.Sprite.call(this, game, x, y, 'ship', frame);

            this.speed = 100;
            this.lives = APPLICATION.option.gameOptions.lives;
            this.isPlayer = true;
            this.safeFrameTime = 1000;
            this.fireDelay = 100;
            this.nextFire = 0;
            this.ioEnabled = true;
            this.isSafe = false;

            this.anchor.setTo(0.5, 0.5);

            this.animations.add('left', _.range(0, 4), 6);
            this.animations.add('right', _.range(0, 4), 6);

            this.game.physics.arcade.enableBody(this);
            this.body.setSize(7, 20, -1, -3);

            this.inputs = this.game.input.keyboard.createCursorKeys();
            this.inputs.fire = this.game.input.keyboard.addKey(32);

            this.resetPosition();

            return this;

        };


        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player.prototype.constructor;

        /**
         *
         */
        Player.prototype.onUpdate = function onUpdate(){
            if( APPLICATION.option.debugBody ){
                this.game.debug.body(this);
            }

            if( this.safe > this.game.time.now ){
                this.isSafe = true;
            }else{
                this.isSafe = false;
            }

            this.io();
        };

        /**
         *
         */
        Player.prototype.io = function io(){

            if( this.ioEnabled ){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return;
            }

            var noAction = true;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if( this.inputs.left.isDown ){
                this.animations.play('left');
                this.body.velocity.x = -this.speed;
                noAction = false;
            }else if( this.inputs.right.isDown) {
                this.animations.play('right');
                this.body.velocity.x = this.speed;
                noAction = false;
            }

            if( this.inputs.up.isDown ){
                this.body.velocity.y = -this.speed;
                noAction = false;
            }else if( this.inputs.down.isDown ){
                this.body.velocity.y = this.speed;
                noAction = false;
            }

            if( this.inputs.fire.isDown ){
                this.fireBullet();
            }

            if( noAction ){
                this.animations.stop();
                this.frame = 0;
            }

        };

        /**
         *
         * @type {*}
         */
        Player.prototype.fireBullet = function fireBullet(){
            if( this.nextFire > this.game.time.now ){
                return;
            }

            this.game.state.getCurrentState().bulletManager.add(this, APPLICATION.vars.bulletTypes.PLAYER_STANDARD);

            this.nextFire = this.game.time.now + this.fireDelay;
        };

        /**
         *
         */
        Player.prototype.resetPosition = function(){
            this.position.set(this.game.world.width/2, this.game.world.height);
            this.ioEnabled = false;

            this.setSafe();

            var tween = this.game.add.tween(this);

            tween.to({y: this.game.world.height/4*3}, 250);
            tween.start();

        };

        Player.prototype.setSafe = function setSafe(){
            this.safe = this.game.time.now + this.safeFrameTime;
        };

        /**
         *
         */
        Player.prototype.hitted = function hitted(){

            if( this.isSafe ){
                return false;
            }

            --this.health;
            this.setSafe();

            if( this.health > 0 ){
                return;
            }

            --this.lives;
            this.resetPosition();

            return true;

        };


        return Player;
    });

