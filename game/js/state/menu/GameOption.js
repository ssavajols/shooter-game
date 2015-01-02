
define(
    [
        'state/BaseMenu'
    ],
    function(BaseMenu){

        /**
         * @class GameOption
         * @extends BaseMenu
         */
        var GameOption = function(){
            BaseMenu.apply(this, arguments);

            _.extend(this,
                // PROPERTIES
                {
                },
                // METHODS
                {
                    /**
                     *
                     */
                    create: function(){
                        this.addItem('Difficulty');
                        this.addItem('Lives: '+APPLICATION.option.gameOptions.lives, _.bind(this.liveAction, this));
                        this.addItem('Retour', function(){ APPLICATION.start('MainMenu');});

                        this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

                        this.setActive();
                    },

                    /**
                     *
                     */
                    update: _.noop,

                    /**
                     *
                     * @param text
                     */
                    liveAction: function(text){
                        APPLICATION.vars.lives = APPLICATION.vars.lives === 3 ? 5 :3;
                        text.setText('Lives: '+ APPLICATION.vars.lives);
                    }
                });
        };

        // PROTOTYPE
        _.extend(GameOption.prototype, BaseMenu.prototype, {});

        return GameOption;
    });