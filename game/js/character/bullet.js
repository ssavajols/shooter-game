define(
    [
        './bullets/PlayerStandard',
        './bullets/EnnemyStandard'
    ],
    function(
        PlayerStandard,
        EnnemyStandard
        ){

        var Bullets = function Bullets(){

            this.bulletType = [
                PlayerStandard,
                EnnemyStandard
            ];

            this.bulletTypeName = {
                PLAYER_STANDARD: 0,
                ENNEMY_STANDARD: 1
            }

            this.state = APPLICATION.game.state.getCurrentState();
            this.initialize();
        };

        _.extend(Bullets.prototype, {

            _createBullet: function(sprite, type){
                return new this.bulletType[this.bulletTypeName[type]](sprite);
            },

            initialize: function initialize(){

                this.player = this.state.add.group();
                this.ennemies = this.state.add.group();


                this.player.enableBody = true;
                this.ennemies.enableBody = true;

                if( window.ET ){
                    ET.addEventListener('bullet:add', this.onAdd.bind(this));
                }

            },

            onAdd: function onAdd(event){
                this.add(event.data.sprite);
            },
            add: function add(sprite, type){

                var f;

                if( !sprite ){
                    return;
                }

                var bullet = this._createBullet(sprite, type);

                if( sprite.isPlayer ){
                    this.player.add(bullet.sprite);
                }else{
                    this.ennemies.add(bullet.sprite);
                }

//                if( sprite.key === "ship"){
//                    f = this.player.create(sprite.x, sprite.y, "fire");
//                }

//                if( sprite.key === "ennemies"){
//                    f = this.ennemies.create(sprite.x, sprite.y, "fire");
//                }



//                var tween = this.state.add.tween(f);
//                var r = this.state.rnd.between(-this.disperse, this.disperse);

//                this.setAnimation(f);

//                f.anchor.x = f.anchor.y = 0.5;


//                if( sprite.key === "ship"){
//                    f.rotation = Math.PI*(90+r/(this.disperse/10))/180;
//                    tween.to({y:0, x: sprite.x+r}, 500);
//                }
//
//                if( sprite.key === "ennemies" ){
//
//                    f.rotation = Math.PI*-(90+r/(this.disperse/10))/180;
//                    tween.to({y:this.state.world.height, x: sprite.x+r}, 2000);
//                }
//
//                tween.onComplete.add(function(){
//                    f.kill();
//                });
//
//                tween.start();
//
//                f.tween = tween;
//
//                f.body.setSize(9, 20);
//
//                this.sprites.push(f);

            },


            onUpdate: function onUpdate(){
                this.player.forEach(_.bind(function(el){
                    this.state.game.debug.body(s);
                }, this));
                this.ennemies.forEach(_.bind(function(el){
                    this.state.game.debug.body(s);
                }, this));
            },

//            setAnimation: function setAnimation(sprite){
//                sprite.animations.add('fire', _.range(8), 30, true);
//                sprite.animations.play('fire');
//            },

            // @TODO: clean bullets !!!
            clearBullets: function(){
              this.player.forEach(function(el){
                  if( el ){
                    el.kill();
                    el.destroy();
                  }
              });
              this.ennemies.forEach(function(el){
                  if( el ){
                      el.kill();
                      el.destroy();
                  }
              });
            },
            destroy: function destroy(){
                this.clearBullets();

                if( window.ET ){
                    ET.removeAllListeners("bullet:add", this.onAdd.bind(this));
                }

            }
        });

        return Bullets;
    });

