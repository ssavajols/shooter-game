
define(
    [
        'state/BaseMenu'
    ],
    function(BaseMenu){

        /**
         * @class GameOption
         * @extends BaseMenu
         * @extends BaseMenu
         */
        var GameOption = function(){
            BaseMenu.apply(this, arguments);
        };

        GameOption.prototype = Object.create(BaseMenu.prototype);
        GameOption.prototype.constructor = GameOption.prototype.constructor;

        /**
         *
         */
        GameOption.prototype.create = function(){
            this.addItem('Difficulty');
            this.addItem('Lives: '+APPLICATION.option.gameOptions.lives, _.bind(this.liveAction, this));
            this.addItem('Retour', function(){ APPLICATION.start('MainMenu');});

            this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

            this.setActive();
        };

        /**
         *
         * @param text
         */
        GameOption.prototype.liveAction = function(text){
            APPLICATION.vars.lives = APPLICATION.vars.lives === 3 ? 5 :3;
            text.setText('Lives: '+ APPLICATION.vars.lives);
        };

        return GameOption;
    });