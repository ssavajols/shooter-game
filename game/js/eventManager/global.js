define(
    [],
    function(){
        var ET = {};
        PIXI.EventTarget.call(ET);

        window.ET = ET;

        return ET;
    });