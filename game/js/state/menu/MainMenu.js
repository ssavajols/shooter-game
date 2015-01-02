define(
    [
        'state/BaseMenu'
    ],
    function(BaseMenu){

        /**
         * @class MainMenu
         * @constructor
         */
        var MainMenu = function(){
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
                    preload: function(){
                        BaseMenu.prototype.preload.call(this);
                    },

                    /**
                     *
                     */
                    create: function(){
                        this.addItem('Start level 1', function(){ APPLICATION.start('level1');});
                        this.addItem('Start level 2', function(){ APPLICATION.start('level2');});
                        this.addItem('Options', function(){ APPLICATION.start('gameOption');});

                        this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

                        this.setActive();
                    },

                    /**
                     *
                     */
                    update: _.noop
                });
        };

        // PROTOTYPE
        _.extend(MainMenu.prototype, BaseMenu.prototype, {});

        return MainMenu;
    });