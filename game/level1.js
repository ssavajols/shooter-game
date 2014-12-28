var Level1 = function Level1(){
    Level.call(this);
};

_.extend(Level1.prototype, Level.prototype, {
    createEnnemies: function createEnnemies(){

        _.each(ennemyData.ennemySequence, _.bind(function(params){
            var e = new Ennemy(params);
            e.sprite.instance = e;
            this.ennemies.add(e.sprite);
        }, this));

    }
});