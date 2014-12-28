var Level2 = function Level1(){
    Level.call(this);
};

_.extend(Level2.prototype, Level.prototype, {
    createEnnemies: function createEnnemies(){
        _(10).times(_.bind(function(){
            var e = new Ennemy();
            e.sprite.instance = e;
            this.ennemies.add(e.sprite);
        }, this));
    }
});