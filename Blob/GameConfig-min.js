// Game Config Global
var GameConfig = {

    PROD_ENV:true,
    LOG_LEVEL:0,
    CDN:{
        ENABLED:false
    },

    GAME_ID:'sweetsurpriseslots',
    TITLE:'Sweet Surprise Slots',
    HOST:'http://games.tresensa.com',
    PATH:'/sweet-surprise-slots/',
    VERSION:'1.0.0',

    ORIENTATION:'portrait', // portrait|landscape
    CANVAS_ID:'game_canvas',
    REORIENT_ID:'wrong_orientation',
    PRELOADER_DIV:'preloader',



    CONSTRUCTOR:'CWGame',
    SOURCE:[
        "js/game/CWGame.js",

        "js/game/utils/CWTween-min-0.4.1.js",
        "js/game/utils/GameAssets.js",
        "js/game/utils/ScoreCalculation.js",
        "js/game/utils/GameModel.js",
        "js/game/utils/TGSModel.js",
        "js/game/utils/SparkleEffect.js",
        "js/game/utils/AudioPlayer.js",
        "js/game/utils/MultilineText.js",
        "js/game/utils/CustomDepressedButton.js",

        "js/config/LevelConfig.js",
        "js/config/Config.js",

      /*  "js/game/ui/PauseScreen.js",*/
        "js/game/ui/LoadingScreen.js",
        "js/game/ui/MainMenu.js",
        "js/game/ui/LevelSelectScreen.js",
        "js/game/ui/Achievements.js",
        "js/game/ui/GameScreen.js",
        "js/game/ui/BuyCoins.js",
        "js/game/ui/MiniGame.js",
        "js/game/ui/HighStrikerMiniGame.js",
        "js/game/ui/Boost.js",
        "js/game/ui/DailyBonusMiniGame.js",
        "js/game/ui/ScoreBoard.js",

        "js/game/imagePack/imagePack1.js",
        "js/game/imagePack/imagePack2.js",
        "js/game/imagePack/imagePack3.js",
        "js/game/imagePack/imagePack4.js",
        "js/game/imagePack/imagePack5.js",
        "js/game/imagePack/imagePack6.js",
        "js/game/imagePack/imagePack7.js",
        "js/game/imagePack/imagePack8.js"
    ],

    ADS:{
        GAMEOVER_PLACEMENT_ID:'3014619',
        REPLAY_PLACEMENT_ID:'3014620'
    },

    TGL:{
        VERSION:'1.0'
    },
    TGS:{
        ENABLED:true,
        VERSION:'0.3'//,
       // HOST:'stg-tgs.tresensa.com'
    },

    TGE:{
        ENABLED:true,
        FONT_LOADER:true,
        VERSION:'1.0'
    },

    MoreGames:{
        ENABLED:false

    },
    GoogleAnalytics:{
        ENABLED:true,
        QA_ID:'UA-45002398-1',
        PROD_ID:'UA-45002398-1',
        NATIVE_ID:'',
        LABEL:'Sweet Surprise Slots'
    },

    Playnomics:{
        ENABLED:false,
        APP_ID:''
    },

    Quantcast:{
        ENABLED:true
    },

    Flurry:{
        ENABLED:true
    }
};