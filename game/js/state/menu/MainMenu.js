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

        MainMenu.prototype.preload = function preload(){

            this.load.image('game-logo', 'assets/sprite/main-title-logo.png');

            this.map.preload(this,
                [
                    { name:'bg', path:'assets/tileset/main-title-background.jpg'},
                    { name:'stars', path:'assets/tileset/stars.png'}
                ]);

            BaseMenu.prototype.preload.apply(this, arguments);

        };

        /**
         *
         */
        MainMenu.prototype.create = function(){
            this.addItem('Start game', function(){ APPLICATION.start('level1');});
            this.addItem('Start infinite game ', function(){ APPLICATION.start('LevelInfinite');});
            this.addItem('Options', function(){ APPLICATION.start('gameOption');});

            this.map.setParallaxLayer('bg', {x: -0.1, y:0});
            this.map.setParallaxLayer('stars', {x:-0.2, y:0.05}, {w: this.stage.width, h: this.stage.height});

            this.menu.position.set(this.game.width/2-this.menu.width/2, this.game.height-this.menu.height-50);

            var img = this.add.image(0, 0, 'game-logo');

            img.position.set((this.game.world.width/2)-(img.width/2), 50);

            this.setActive();
        };


        MainMenu.prototype.update = function(){

            var stars = this.map.getLayer('stars');

            if( !stars.speedAlpha ){
                stars.speedAlpha = 0.01;
            }

            if( stars.alpha < 0.3 ){
                stars.speedAlpha = 0.005;
            }else if( stars.alpha > 0.7 ){
                stars.speedAlpha = -0.005;
            }

            stars.alpha += stars.speedAlpha;

            BaseMenu.prototype.update.apply(this, arguments);
        };

        return MainMenu;
    });