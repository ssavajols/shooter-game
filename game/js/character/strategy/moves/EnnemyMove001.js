define(
    [],
    function(){

        var Strategy = function(){

            this.do = function(){

                this.timer = setTimeout(_.bind(function(){
                    
                    if( this.sprite.body === null ){
                        clearInterval(this.interval);
                        return;
                    }

                    this.sprite.revive(this.sprite.health);

                    this.sprite.body.velocity.y = 50;
                    this.sprite.body.velocity.x = 40+Math.random()*10;

                    this.sprite.body.velocity.x = _.random(-1, 1) * this.sprite.body.velocity.x;

                    clearInterval(this.interval);

                    this.interval = setInterval(_.bind(function(){
                        if( this.sprite.body === null ){
                            clearInterval(this.interval);
                            return;
                        }
                        this.sprite.body.velocity.x = -this.sprite.body.velocity.x;
                    }, this), 2000);    
                }, this), this.options[3]);
                
            };

            this.setAnimation = function setAnimation(sprite, x, y, options){

                this.options = options;
                this.sprite = sprite;

                this.sprite.position.set(x, y);
                this.sprite.kill();

                return this;
            };

            this.onUpdate = function(){
                if( !this.sprite.game ){
                    return;
                }
                try {
                    if(this.sprite.position.y > this.sprite.game.world.height) {
                        clearInterval(this.interval);
                        clearTimeout(this.timer);
                        this.sprite.parent.remove(this.sprite, true);
                    }
                }catch(e){
                    console.error(e);
                }

                
            }
        };

        return Strategy;
    });