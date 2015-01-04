define(
    [],
    function(){

        /**
         * @class ParallaxMap
         * @return {ParallaxMap}
         */
        var ParallaxMap = function ParallaxMap(){

            /**
             *
             * @type {Array}
             * @private
             */
            this._layers = null;

            /**
             *
             * @type {null}
             * @private
             */
            this._state = null;

            /**
             *
             * @type {Array}
             * @private
             */
            this._files = [];

            return this;

        };

        /**
         *
         * @param state
         * @param files
         * @return {ParallaxMap}
         */
        ParallaxMap.prototype.preload = function preload(state, files){

            this._state = state;
            this._files = files;
            this._layers = new Phaser.Group(state);


            _.each(this._files, _.bind(function(file){
                this._state.load.image(file.name, file.path);
            }, this));

            return this;
        };

        /**
         *
         * @param image
         * @param speed
         * @return {ParallaxMap}
         */
        ParallaxMap.prototype.setParallaxLayer = function setParallaxLayer(image, speed, size){

            _.each(this._files, _.bind(function(file){
                if( file.name === image){

                    var x = 0;
                    var y = 0;
                    var w = size ? size.w : this._state.cache.getImage(file.name).width;
                    var h = size ? size.h : this._state.cache.getImage(file.name).height;

                    var tileSprite = new Phaser.TileSprite(APPLICATION.game, x, y, w, h, file.name);

                    tileSprite.speed = new Phaser.Point(speed.x, speed.y);

                    this._layers.add(tileSprite);
                }
            }, this));

            return this;
        };

        /**
         *
         * @return {_layers}
         */
        ParallaxMap.prototype.getLayers = function getLayers(){
            return this._layers;
        };

        /**
         *
         * @param key
         * @return {layer}
         */
        ParallaxMap.prototype.getLayer = function getLayer(key){
            var layer;

            this._layers.forEach(function(l){
               layer = l.key === key ? l : layer;
            });

            return layer;
        };

        return ParallaxMap;
    });