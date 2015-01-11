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
        'state/level/LevelInfinite'
    ],
    function(
            Application,
            option,
            utils,
            ET,
            MainMenu,
            GameOption,
            Level1,
            LevelInfinite
        ){

        window.APPLICATION = new Application(option);

        APPLICATION.newState('level1', false, new Level1());
        APPLICATION.newState('LevelInfinite', false, new LevelInfinite());

        APPLICATION.newState('MainMenu', false, new MainMenu());
        APPLICATION.newState('gameOption', false, new GameOption());

    });
