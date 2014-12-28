define(
    [],
    function(){

        var Application = function Application(option){
            this._currentLevel = 1;
            this.game = new Phaser.Game(option.width, option.height, option.renderer, option.container, option.state, option.transparent, option.antialias, option.physicsConfig);
            this.option = option;
        };

        _.extend(Application.prototype, {
            newState: function newState(key, autoStart, methods){
                this.game.state.add(key, methods, autoStart);
            },
            start: function(state){
                state && this.game.state.start( typeof state === "string" ? state : state.key);
            },
            nextLevel: function(){
                this._currentLevel++;

                if( this._currentLevel > 2 ){
                    this._currentLevel = 1;
                }

                console.log(this._currentLevel);
                this.start('level'+this._currentLevel);

            }
        });

        return Application;

    });
