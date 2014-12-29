define(
    [],
    function(){

        var options = {
            width:480,
            height:640,
            renderer: Phaser.AUTO,
            container: 'gameContainer',
            state: null,
            transparent: false,
            antialias: false,
            physicsConfig: null,
            gameOptions: {
                lives:1,
                difficulty:1,
                addLive: function(){
                    console.log(this.lives++);
                }
            }
        };

        return options;
    });