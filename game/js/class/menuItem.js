define(
    [],
    function(){

        //@TODO: set this.values to index when this.values === object
        
        /**
         * Menu item
         * @class MenuItem
         * @param game
         * @param x
         * @param y
         * @param styles
         * @param action
         * @param values
         * @constructor
         */
        var MenuItem = function(game, x, y, label, styles, action, values){

            this.action = action;

            x = x ? x : 0;
            y = y ? y : 0;
            styles = _.defaults(styles, {
                font: 'normal 12px Arial',
                fill: 'white'
            });

            Phaser.Text.call(this, game, x, y, '', styles);

            this.inputEnabled = true;
            this.interactive = true;
            this.buttonMode = true;

            this.label = label;

            this.values = values ? values : '';
            this.indexValue = 0;

            if( typeof this.values === 'object' ){
                this.value = this.values[Object.keys(this.values)[this.indexValue]];
            }else if( typeof this.values === 'array' ){
                this.value = this.values[this.indexValue];
            }else{
                this.value = this.values;    
            }

            this.setValue();
            
            if( (typeof this.values === 'array' && this.values.length) || (typeof this.values === 'object' && Object.keys(this.values).length) ){
                this.events.onInputDown.add(_.bind(this.switchValue, this));
            }else if( typeof this.action === 'function'){
                this.events.onInputDown.add(this.action, this);
            }

        };

        MenuItem.prototype = Object.create(Phaser.Text.prototype);
        MenuItem.prototype.constructor = MenuItem.prototype.constructor;

        /**
         * @method MenuItem.prototype.switchValue
         */
        MenuItem.prototype.switchValue = function switchValue(){
            this.setValue(this._nextValue());

            if(typeof this.action === 'function'){
                this.action.call(this);
            }
        };

        /**
         * @method MenuItem.prototype._nextValue
         * @return {number}
         * @private
         */
        MenuItem.prototype._nextValue = function _nextValue(){
            this.indexValue++;

            if( typeof this.values === 'string' ){
                return;
            }else if( typeof this.values === 'object' ){
                
                if( Object.keys(this.values).length <= this.indexValue ){
                    this.indexValue = 0;
                }

            }else {
                
                if( this.values.length <= this.indexValue ){
                    this.indexValue = 0;
                }
            }

            return this.indexValue;

        }

        /**
         * Set value
         * @method MenuItem.prototype.setValue
         * @param value
         */
        MenuItem.prototype.setValue = function setValue(value){
            var str = this.label;
            
            if( typeof value !== 'undefined' ){
                this.value = typeof this.values !== 'string' ? this.values[value] : value;

            }

            if( this.value ){
                str += ' : ' + this.value;    
            }

            this.setText(str);

        };

        return MenuItem;

    });