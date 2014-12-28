define(
    [
        'state/BaseMenu'
    ],
    function(BaseMenu){

        var GameOption = function(){
            BaseMenu.apply(this, arguments);

            _.extend(this,
                // PROPERTIES
                {
                },
                // METHODS
                {
                    preload: function(){
                        BaseMenu.prototype.preload.call(this);
                    },
                    create: function(){
                        this.addItem('Difficulty');
                        this.addItem('Lives');
                        this.addItem('Retour', function(){ APPLICATION.start('MainMenu');});

                        this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

                    },
                    update: _.noop
                });
        };

        // PROTOTYPE
        _.extend(GameOption.prototype, BaseMenu.prototype, {});

        return GameOption;
    });