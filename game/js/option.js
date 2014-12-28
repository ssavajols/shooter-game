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
            gameOptions: {}
        };

        return options;
    });