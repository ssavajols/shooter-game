define(
    [],
    function(){

        var BaseMenu = function(){
            this.menu = null;
        };

        // PROTOTYPE
        _.extend(BaseMenu.prototype, {
            preload: function(){
                this.menu = this.add.group();
            },
            create: _.noop,
            update: _.noop,
            shutdown: function(){
                this.menu.destroy(true);
            },
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
            decoredMenuItem: function(textObject, callback){

                textObject.inputEnabled = true;
                textObject.interactive = true;
                textObject.buttonMode = true;

                if( typeof callback === "function" ){
                    textObject.events.onInputDown.add(callback, this);
                }

                textObject.alpha = 0.7;

                textObject.events.onInputOver.add(function(){
                    this.alpha = 1;
                }, textObject);

                textObject.events.onInputOut.add(function(){
                    this.alpha = 0.7;
                }, textObject);

                return textObject;
            }
        });

        return BaseMenu;
    });