define(
    [
       './Ennemy001',
       './Ennemy002'
    ],
    function(
        Ennemy001,
        Ennemy002
    ){
        var ennemies = {};

        ennemies['Ennemy001'] = Ennemy001;
        ennemies['Ennemy002'] = Ennemy002;

        return ennemies;
    });