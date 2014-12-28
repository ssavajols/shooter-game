var Bullets = function Bullets(){

    this.state = application.game.state.getCurrentState();
    this.tweens = [];
    this.disperse = 80;
    this.sprites = [];

    this.initialize();
};

_.extend(Bullets.prototype, {

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
    add: function add(sprite){

        var f;

            if( !sprite ){
                return;
            }

            try {

            if( sprite.key === "ship"){
             f = this.player.create(sprite.x, sprite.y, "fire");
            }

            if( sprite.key === "ennemies"){
             f = this.ennemies.create(sprite.x, sprite.y, "fire");
            }



             var tween = this.state.add.tween(f);
             var r = this.state.rnd.between(-this.disperse, this.disperse);

             this.setAnimation(f);

             f.anchor.x = f.anchor.y = 0.5;

             if( sprite.key === "ship"){
                 f.rotation = Math.PI*(90+r/(this.disperse/10))/180;
                 tween.to({y:0, x: sprite.x+r}, 500);
             }

             if( sprite.key === "ennemies" ){

                 f.rotation = Math.PI*-(90+r/(this.disperse/10))/180;
                 tween.to({y:this.state.world.height, x: sprite.x+r}, 2000);
             }

             tween.onComplete.add(function(){
                f.kill();
             });

             tween.start();

             f.tween = tween;

             f.body.setSize(15, 30);

             this.sprites.push(f);

             }catch(e){
//                console.warn(e);
             }
         },
    onUpdate: function onUpdate(){
        this.sprites.forEach(_.bind(function(s){
            this.state.game.debug.body(s);
        }, this));
    },

    setAnimation: function setAnimation(sprite){
        sprite.animations.add('fire', _.range(8), 30, true);
        sprite.animations.play('fire');
    },
    destroy: function destroy(){
        this.player.forEach(function(el){
            el.tween.stop(true);
        });

        this.sprites.length = 0;


        if( window.ET ){
            ET.removeAllListeners("bullet:add", this.onAdd.bind(this));
        }

    }
});