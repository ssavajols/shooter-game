define(
    [],
    function(){
        var Ennemy = function Ennemy(params){

            this.state = APPLICATION.game.state.getCurrentState();
            this.params = params;
            this.timer = {bullet:null};
            this.sprite = null;
            this._delayBullet = null;
            this.initialize();
        };

        _.extend(Ennemy.prototype, {

            initialize: function(){
                var r, xStart, yStart, xEnd, yEnd, delayHealth;

                if( this.params ){
                    r = this.params.sprite;
                    xStart = this.params.position.x/100*this.state.world.width;
                    xEnd = this.params.direction.x/100*this.state.world.width;
                    yStart = 0;
                    yEnd = this.state.world.height;

                }else{
                    r = this.state.rnd.between(0, 100-1);
                    xStart = this.state.rnd.between(0,this.state.world.width);
                    xEnd = xStart;
                    yStart = this.state.rnd.between(0,this.state.world.height/2);;
                    yEnd = yStart;
                }


                this.sprite = this.state.add.sprite(xStart, yStart, 'ennemies', r);
                this.sprite.events.onDestroy.add(_.bind(this.onDestroy, this));
                this.sprite.events.onKilled.add(_.bind(this.onDestroy, this));

                this.sprite.anchor.x = this.sprite.anchor.y = 0.5;

                if( this.params ){
                    setTimeout(_.bind(function(){
                        this.fireBullet();

                        if( xStart !== xEnd && yStart !== yEnd ){
                            this.move(xEnd, yEnd);
                        }

                    }, this), this.params.delay*1000);
                }else {
                    this.fireBullet();
                }


            },

            move: function move(xEnd, yEnd){
                TweenLite.to(this.sprite.position, this.params.speed, {x:xEnd, y:yEnd, onComplete: _.bind(function(){
                    ET.dispatchEvent({type:"remove:ennemy", ennemy: this.sprite, type: "EnnemyStandard"});
                }, this)});
            },

            onUpdate: function(){
//                this.state.game.debug.body(this.sprite);
            },

            fireBullet: function(){

                this._delayBullet = this.state.rnd.between(200, 2000);

                clearTimeout(this.timer.bullet);
                this.timer.bullet = setTimeout(_.bind(function(){
                    if( window.ET ){
                        ET.emit({type:"bullet:add", sprite: this.sprite});

                        this.fireBullet();
                    }
                }, this), this._delayBullet);
            },

            onDestroy: function(){
                console.log('detroy ennemy');
                clearTimeout(this.timer.bullet);
            }
        });

        return Ennemy;
    });

