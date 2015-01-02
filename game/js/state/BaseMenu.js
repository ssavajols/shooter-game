define(
    [],
    function(){

        /**
         * @class BaseMenu
         * @constructor
         */
        var BaseMenu = function(){
            this.menu = null;
            this.inputs = null;
        };

        // PROTOTYPE
        _.extend(BaseMenu.prototype, {
            /**
             *
             */
            preload: function(){
                this.menu = this.add.group();

                this.inputs = this.input.keyboard.createCursorKeys();
                this.inputs.valid = this.input.keyboard.addKey(32);

                this.inputs.valid.onDown.add(_.bind(this.triggerSelectedMenu, this));

                this.inputs.right.onDown.add(_.bind(this.cursorDown, this));
                this.inputs.down.onDown.add(_.bind(this.cursorDown, this));
                this.inputs.left.onDown.add(_.bind(this.cursorUp, this));
                this.inputs.up.onDown.add(_.bind(this.cursorUp, this));
            },
            /**
             *
             */
            create: _.noop,
            /**
             *
             */
            update: _.noop,
            /**
             *
             */
            shutdown: function(){
                this.menu.destroy(true);
            },
            /**
             *
             * @param item
             * @param callback
             */
            addItem: function(item, callback){
                var textObject;
                var y;
                var first = this.menu.getFirstExists();

                if( first ){
                    y = this.menu.length*(first.height+5);
                }

                if( typeof item === "string" ){
                    textObject = this.add.text(0, y, item, {font: 'normal 16px munroregular', fill:"white"});
                }else{
                    textObject = item;
                }

                this.menu.add(this.decoredMenuItem(textObject, callback));

            },
            /**
             *
             * @param textObject
             * @param callback
             * @returns {*}
             */
            decoredMenuItem: function(textObject, callback){

                textObject.inputEnabled = true;
                textObject.interactive = true;
                textObject.buttonMode = true;

                if( typeof callback === "function" ){
                    textObject.events.onInputDown.add(callback, this);
                }

                textObject.events.onInputOver.add(_.bind(function(el){
                    this.setActive(el);
                }, this), textObject);

                return textObject;
            },
            /**
             *
             * @param element
             */
            setActive: function(element){

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
            },
            /**
             *
             * @returns {number}
             * @private
             */
            _getActiveIndex: function(){
                var index = 0;

                this.menu.forEach(_.bind(function(el){
                    if( el.isSelected ){
                        index = this.menu.getIndex(el);
                    }
                }, this));

                return index;
            },
            /**
             *
             */
            cursorDown: function(){
                var selectedIndex = this._getActiveIndex()+1;

                this.setActive(this.menu.getAt(selectedIndex > this.menu.length-1 ? 0 : selectedIndex));
            },
            /**
             *
             */
            cursorUp: function(){
                var selectedIndex = this._getActiveIndex()-1;

                this.setActive(this.menu.getAt(selectedIndex < 0 ? this.menu.length-1 : selectedIndex));
            },
            /**
             *
             */
            triggerSelectedMenu: function(){
                this.menu.forEach(function(el){
                   if( el.isSelected ){
                       el.events.onInputDown.dispatch(el, null);
                   }
                });
            }
        });

        return BaseMenu;
    });