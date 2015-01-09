define(
    [
        'character/bullets/PlayerStandard',
        'character/bullets/EnnemyStandard'
    ],
    function(
        PlayerStandard,
        EnnemyStandard
        ){

        /**
         * @class BulletManager
         * @extends Phaser.Group
         * @param game
         * @constructor
         */
        var BulletManager = function BulletManager(game){
            Phaser.Group.call(this, game, undefined, 'bulletManager');

            this._bulletType = {};

            this._bulletType[APPLICATION.vars.bulletTypes.PLAYER_STANDARD] = PlayerStandard;
            this._bulletType[APPLICATION.vars.bulletTypes.ENNEMY_STANDARD] = EnnemyStandard;

            this.player = new Phaser.Group(this.game, this, 'player');
            this.ennemies = new Phaser.Group(this.game, this, 'ennemies');

            this.player.enableBody = true;
            this.ennemies.enableBody = true;

            console.log(this);
        };

        BulletManager.prototype = Object.create(Phaser.Group.prototype);
        BulletManager.prototype.constructor = BulletManager.prototype.constructor;

        /**
         * @method BulletManager.prototype.preload
         */
        BulletManager.prototype.preload = function preload(){
            _.each(this._bulletType, function(type){
               type.preload && type.preload();
            });
        };

        /**
         *
         * @param sprite
         * @param type
         * @return {Bullet}
         * @private
         */
        BulletManager.prototype._createBullet =  function _createBullet(sprite, type){
            return new this._bulletType[type](this.game, sprite.x, sprite.y);
        };

        /**
         *
         * @param sprite
         * @param type
         */
        BulletManager.prototype.add = function add(sprite, type){

            if( !sprite ){
                return;
            }

            var bullet = this._createBullet(sprite, type);

            if( sprite.isPlayer ){
                this.player.add(bullet);
            }

            if( !sprite.isPlayer){
                this.ennemies.add(bullet);
            }

        };

        /**
         *
         */
        BulletManager.prototype.onUpdate = function onUpdate(){
            if( APPLICATION.option.debugBody ){
                this.player.forEach(_.bind(function(el){
                    this.game.debug.body(el);
                }, this));
                this.ennemies.forEach(_.bind(function(el){
                    this.game.debug.body(el);
                }, this));
            }

            this.player.forEach(_.bind(function(el){
                this.checkInsideWorld(el, this.player);
            }, this));

            this.ennemies.forEach(_.bind(function(el){
                this.checkInsideWorld(el, this.ennemies);
            }, this));

        };

        /**
         *
         * @param sprite
         * @param group
         */
        BulletManager.prototype.checkInsideWorld = function(sprite, group){
            if( !sprite ){
                return;
            }

            var remove = sprite.x < 0
                || sprite. x > this.game.world.width
                || sprite.y < 0
                || sprite.y > this.game.world.height;

            if( remove ){
                group.remove(sprite, true);
            }
        };

        /**
         *
         */
        BulletManager.prototype.clearBullets = function clearBullets(){

              this.player.removeAll(true);
              this.ennemies.removeAll(true);

        };

        return BulletManager;
    });

