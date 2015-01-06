define(
    [],
    function(){

        var options = {
            width:240, // Canvas width
            height:320, // Canvas height
            renderer: Phaser.AUTO, // PIXI Renderer
            container: 'gameContainer', // DOM element where the canvas will be generated
            state: 'MainMenu', // First state to load
            transparent: false, // Canvas background
            antialias: false, // Antialiasing
            physicsConfig: null, // PhysicsConfig

            debugBody: true, // Show debug bodies object

            // Global game options
            gameOptions: {
                lives:3,
                difficulty:1,
                bulletTypes: {
                    PLAYER_STANDARD: 1,
                    ENNEMY_STANDARD: 2
                }
            }
        };

        return options;
    });