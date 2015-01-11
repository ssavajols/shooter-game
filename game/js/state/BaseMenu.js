define(
    [
        'class/MenuItem',
        "class/ParallaxMap",
    ],
    function(MenuItem, ParallaxMap){

        /**
         * @class BaseMenu
         * @constructor
         */
        var BaseMenu = function(){
            this.menu = null;
            this.inputs = null;
            this.map = new ParallaxMap();
        };

        /**
         * @method BaseMenu.prototype.preload
         */
        BaseMenu.prototype.preload = function(){
            this.menu = this.add.group();

            this.add.existing(this.menu);

            this.inputs = this.input.keyboard.createCursorKeys();
            this.inputs.valid = this.input.keyboard.addKey(32);

            this.inputs.valid.onDown.add(_.bind(this.triggerSelectedMenu, this));

            this.inputs.right.onDown.add(_.bind(this.cursorDown, this));
            this.inputs.down.onDown.add(_.bind(this.cursorDown, this));
            this.inputs.left.onDown.add(_.bind(this.cursorUp, this));
            this.inputs.up.onDown.add(_.bind(this.cursorUp, this));
        };

        /**
         * @method BaseMenu.prototype.create
         */
        BaseMenu.prototype.create = _.noop;

        /**
         * @method BaseMenu.prototype.update
         */
        BaseMenu.prototype.update = function update(){
            if( this.map.getLayers() !== null){
                this.map.getLayers().forEach(function(layer){
                    layer.tilePosition.x += layer.speed.x;
                    layer.tilePosition.y += layer.speed.y;
                });
            }
        };

        /**
         * @method BaseMenu.prototype.shutdown
         */
        BaseMenu.prototype.shutdown = function(){
            this.menu.destroy(true);
        };

        /**
         * @method BaseMenu.prototype.addItem
         * @param item
         * @param callback
         */
        BaseMenu.prototype.addItem = function(label, action, values){
            var y = 0;
            var first = this.menu.getFirstExists();

            if( first ){
                y = this.menu.length*(first.height+5);
            }

            menuItem = new MenuItem(this.game, 0, y, label, {font: 'normal 16px munroregular', fill:"white", stroke: "black", strokeThickness: 3}, action, values);

            this.menu.add(this.decoredMenuItem(menuItem));
            
        };

        /**
         * @method BaseMenu.prototype.decoredMenuItem
         * @param textObject
         * @param callback
         * @returns {*}
         */
        BaseMenu.prototype.decoredMenuItem = function(menuItem){

            menuItem.events.onInputOver.add(_.bind(function(el){
                this.setActive(el);
            }, this), menuItem);

            return menuItem;
        };

        /**
         * @method BaseMenu.prototype.setActive
         * @param element
         */
        BaseMenu.prototype.setActive = function(element){

            if( !element ){
                element = this.menu.getFirstExists();
            }

            this.menu.forEach(function(el){
               if( el === element ){
                   el.alpha = 1;
                   el.isSelected = true;
               }else{
                   el.alpha = 0.7;
                   el.isSelected = false;
               }
            });
        };

        /**
         * @method BaseMenu.prototype._getActiveIndex
         * @returns {number}
         * @private
         */
        BaseMenu.prototype._getActiveIndex = function(){
            var index = 0;

            this.menu.forEach(_.bind(function(el){
                if( el.isSelected ){
                    index = this.menu.getIndex(el);
                }
            }, this));

            return index;
        };

        /**
         * @method BaseMenu.prototype.cursorDown
         */
        BaseMenu.prototype.cursorDown = function(){
            var selectedIndex = this._getActiveIndex()+1;

            this.setActive(this.menu.getAt(selectedIndex > this.menu.length-1 ? 0 : selectedIndex));
        };

        /**
         * @method BaseMenu.prototype.cursorUp
         */
        BaseMenu.prototype.cursorUp = function(){
            var selectedIndex = this._getActiveIndex()-1;

            this.setActive(this.menu.getAt(selectedIndex < 0 ? this.menu.length-1 : selectedIndex));
        };

        /**
         * @method BaseMenu.prototype.triggerSelectedMenu
         */
        BaseMenu.prototype.triggerSelectedMenu = function(){
            this.menu.forEach(function(el){
               if( el.isSelected ){
                   el.events.onInputDown.dispatch(el, null);
               }
            });
        };

        return BaseMenu;
    });