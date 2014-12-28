var loadJson = function loadJson(fileName, async, container){
    var r;

    console.log(arguments);
    $.ajax({
        url: "./data/"+ fileName + ".json",
        async: !async,
        dataType:"json",
        success: function(response){
            r = response;

            if( typeof container !== "undefined" ){
                container = r;
            }
        },
        error: function(response){
            console.error(response);
        }
    });

    return r;
};