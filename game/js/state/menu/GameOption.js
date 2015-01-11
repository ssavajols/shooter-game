
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
         * @method GameOption.prototype.create
         */
        GameOption.prototype.create = function(){
            this.addItem('Difficulty', this.setDifficulty, ['easy', 'medium', 'hard']);
            this.addItem('Lives', this.setLive, [3, 5]);
            this.addItem('Retour', function(){ APPLICATION.start('MainMenu');});

            this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

            this.setActive();
        };

        /**
         * @method GameOption.prototype.setLive
         */
        GameOption.prototype.setLive = function setLive(){
            APPLICATION.option.gameOptions.lives = this.value;
        };

        /**
         * @method GameOption.prototype.setDifficulty
         */
        GameOption.prototype.setDifficulty = function setDifficulty(){
            APPLICATION.option.gameOptions.difficulty = this.value;
        };

        return GameOption;
    });