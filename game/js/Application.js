define(
    [],
    function(){

        /**
         * @class Application
         * @param option
         * @constructor
         */
        var Application = function Application(option){
            this.game = new Phaser.Game(option.width, option.height, option.renderer, option.container, option.state, option.transparent, option.antialias, option.physicsConfig);

            setTimeout(_.bind(function(){
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }, this), 0);

            this.option = option;
            this.vars = option.gameOptions; // quickly access to game options
        };

        /**
         *
         * @param key
         * @param autoStart
         * @param methods
         */
        Application.prototype.newState = function newState(key, autoStart, methods){
            this.game.state.add(key, methods, autoStart);
        };

        /**
         *
         * @param state
         */
        Application.prototype.start = function(state){
            state && this.game.state.start( typeof state === "string" ? state : state.key);
        };

        /**
         *
         */
        Application.prototype.nextState = function nextState(){
            //@TODO: code this part
//            this.start();
        };
        /**
         *
         */
        Application.prototype.previousState = function previousState(){
            //@TODO: code this part
//            this.start();
        };

        return Application;

    });
