define(function(){

    /**
     * @class MapLoader
     * @constructor
     */
    var MapLoader = function MapLoader(){

        /**
         *
         * @type {null}
         * @private
         */
        this._map = null;

        /**
         *
         * @type {{}}
         * @private
         */
        this._layers = {};

        /**
         *
         * @type {null}
         * @private
         */
        this._mapName = null;

        /**
         *
         * @type {null}
         * @private
         */
        this._fileMap = null;

        /**
         *
         * @type {null}
         * @private
         */
        this._tileMapName = null;

        /**
         *
         * @type {null}
         * @private
         */
        this._tileMapFile = null;

        /**
         *
         * @type {null}
         * @private
         */
        this._state = null;
    };

    /**
     *
     * @param name
     * @param file
     * @param tileMapName
     * @param tileMapFile
     * @param state
     * @return {MapLoader}
     */
    MapLoader.prototype.preload = function preload(mapName, fileMap, tileMapName, tileMapFile, state){

        this._mapName = mapName;
        this._fileMap = fileMap;
        this._tileMapName = tileMapName;
        this._tileMapFile = tileMapFile;
        this._state = state;

        this._state.load.image(this._mapName, this._fileMap);
        this._state.load.tilemap(this._tileMapName, this._tileMapFile, null, Phaser.Tilemap.TILED_JSON);

        return this;
    };

    /**
     * @param name
     * @param file
     * @param tileMapName
     * @param tileMapFile
     * @return MapLoader
     */
    MapLoader.prototype.setMap = function setMap(){

        this._map = this._state.add.tilemap(this._tileMapName);
        this._map.addTilesetImage(this._mapName)
        this._layers.defaultLayer = this._map.createLayer('level1');
        this._layers.defaultLayer.resizeWorld();

        return this;
    };

    /**
     *
     * @param name
     * @return {*|Phaser.TilemapLayer|PhaserTilemapLayer}
     */
    MapLoader.prototype.createLayer = function createLayer(name){
        return this._layers[name] = this._map.createLayer(name);
    };

    /**
     *
     * @return {_map}
     */
    MapLoader.prototype.getMap = function getMap(){
        return this._map;
    };

    /**
     *
     * @return {_layers}
     */
    MapLoader.prototype.getLayers = function getLayers(){
        return this._layers;
    };

    /**
     *
     * @param index
     * @return {*}
     */
    MapLoader.prototype.getLayer = function getLayer(index){
        return typeof this._layers[index] !== 'undefined' ? this._layers[index] : undefined;
    };

    return MapLoader;
});