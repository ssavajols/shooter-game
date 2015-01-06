define(
    [],
    function(){

        var _cache = {};

        return {
            /**
             *
             * @param fileName
             * @param async
             * @param container
             * @return {*}
             */
            loadJson: function loadJson(fileName, async, container, refresh){
                var r, url;

                if( !_cache.json ){
                    _cache.json = {};
                }

                url = "./data/"+ fileName + ".json";

                if( !refresh && _cache.json[url] ){
                    return _cache.json[url];
                }

                $.ajax({
                    url: url,
                    async: !async,
                    dataType:"json",
                    success: function(response){
                        r = response;

                        _cache.json[url] = response;

                        if( typeof container !== "undefined" ){
                            container = r;
                        }
                    },
                    error: function(response){
                        console.error(response);
                    }
                });

                return r;
            }
        };
    });