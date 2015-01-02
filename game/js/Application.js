define(
    [],
    function(){

        /**
         * @class Application
         * @param option
         * @constructor
         */
        var Application = function Application(option){
            this._currentLevel = 1;
            this.game = new Phaser.Game(option.width, option.height, option.renderer, option.container, option.state, option.transparent, option.antialias, option.physicsConfig);

            setTimeout(_.bind(function(){
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }, this), 0);

            this.option = option;
            this.vars = option.gameOptions; // quickly access to game options
        };

        _.extend(Application.prototype, {
            /**
             *
             * @param key
             * @param autoStart
             * @param methods
             */
            newState: function newState(key, autoStart, methods){
                this.game.state.add(key, methods, autoStart);
            },

            /**
             *
             * @param state
             */
            start: function(state){
                state && this.game.state.start( typeof state === "string" ? state : state.key);
            },

            /**
             *
             */
            nextLevel: function(){
                this._currentLevel++;

                if( this._currentLevel > 2 ){
                    this._currentLevel = 1;
                }

                this.start('level'+this._currentLevel);

            }
        });

        return Application;

    });
