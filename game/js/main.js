define(
    [
        "Application",
        "option",

        "tools/utils",

        // EVENT MANAGER
        'eventManager/global',

        // MENU
        'state/menu/MainMenu',
        'state/menu/GameOption',

        // SCENE

        // LEVELS
        'state/level/Level1',
        'state/level/Level2'
    ],
    function(
            Application,
            option,
            utils,
            ET,
            MainMenu,
            GameOption,
            Level1,
            Level2
        ){

        window.APPLICATION = new Application(option);

        APPLICATION.newState('level1', false, new Level1());
        APPLICATION.newState('level2', false, new Level2());

        APPLICATION.newState('MainMenu', false, new MainMenu());
        APPLICATION.newState('gameOption', false, new GameOption());

    });
