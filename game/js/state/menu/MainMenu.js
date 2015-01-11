define(
    [
        'state/BaseMenu'
    ],
    function(BaseMenu){

        /**
         * @class MainMenu
         * @extends BaseMenu
         * @constructor
         */
        var MainMenu = function(){
            BaseMenu.apply(this, arguments);
        };


        MainMenu.prototype = Object.create(BaseMenu.prototype);
        MainMenu.prototype.constructor = MainMenu.prototype.constructor;

        /**
         *
         */
        MainMenu.prototype.create = function(){
            this.addItem('Start game', function(){ APPLICATION.start('level1');});
            this.addItem('Start infinite game ', function(){ APPLICATION.start('LevelInfinite');});
            this.addItem('Options', function(){ APPLICATION.start('gameOption');});

            this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

            this.setActive();
        };

        return MainMenu;
    });