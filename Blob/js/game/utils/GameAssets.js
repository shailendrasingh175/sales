
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 4/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

GameAssets = function (imagesFolder, audioFolder) {

    var gameFont1 = new Font();
    gameFont1.fontFamily = "BubbleGum";
    gameFont1.src = "assets/fonts/Bubblegum.ttf";

    var gameFont2 = new Font();
    gameFont2.fontFamily = "Shark Soft Bites";
    gameFont2.src = "assets/fonts/SharkSoftBites.ttf";

    var gameFont3 = new Font();
    gameFont3.fontFamily = "digital-7";
    gameFont3.src = "assets/fonts/digital-7.ttf";

    var asset_object = {};

    /**
     * These are the screens we let TGE manage
     * Regiser screen class data
     * screenName - this is the class name that are used when calling screen
     * className - this is the class name that is actually present
     * width - window width (if you not specifiy it take default stage width)
     * height - window height (if you not specifiy it take default stage height)
     */
    asset_object.screenData = [
        { screenName: 'loading', className: 'LoadingScreen'},
        { screenName: 'mainmenu', className: 'MainMenu' },
        { screenName: 'Achievements', className: 'Achievements'},
        { screenName: 'GameScreen', className: 'GameScreen'},
        { screenName: 'LevelSelectScreen', className: 'LevelSelectScreen'},
        { screenName: 'BuyCoins', className: 'BuyCoins'},
        { screenName: 'MiniGame', className: 'MiniGame'},
        { screenName: 'HighStrikerMiniGame', className: 'HighStrikerMiniGame'},
        { screenName: 'Boost', className: 'Boost'},
        { screenName: 'DailyBonusMiniGame', className: 'DailyBonusMiniGame'},
        { screenName: 'ScoreBoard', className: 'ScoreBoard'}
    ];

    // These are assets required for the loading screen
    asset_object.preGameImages = [
        /*Loading screen images*/
        // { id: "loading_bg", url: imagesFolder + '/loadingscreen/loadingbg.jpg'},
        // { id: "Donat", url: imagesFolder + '/loadingscreen/Donat.png'},
        // { id: "mascot", url: imagesFolder + '/loadingscreen/mascot.png'},
        // { id: "logosplash", url: imagesFolder + '/loadingscreen/logosplash.png'}
    ];

    // These are assets we need for the game
    asset_object.gameImages = [

        { id:'scoresprite0', url:imagesFolder + '/game/scoresprite0.png',sheet:imagesFolder +'/imagePack3.png' },


        //splashScreen
        // { id: 'Play_button', url: imagesFolder + '/splashScreen/Play_button.png',sheet:imagesFolder +'/imagePack1.png'  },
        // { id: 'Sweet_Surprise_splash', url: imagesFolder + '/splashScreen/Sweet_Surprise_splash.jpg'},
        // { id: "logocodewalla", url: imagesFolder + '/loadingscreen/logocodewalla.png',sheet:imagesFolder +'/imagePack2.png'   },
        // { id: "logotresensa", url: imagesFolder + '/loadingscreen/logotresensa.png',sheet:imagesFolder +'/imagePack2.png'   },

        // buttons
        { id: 'helpButton', url: imagesFolder + '/buttons/helpButton.png',sheet:imagesFolder +'/imagePack4.png'   },
        { id: 'MuteSprite', url: imagesFolder + '/buttons/MuteSprite.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'PointsChart', url: imagesFolder + '/buttons/PointsChart.png',sheet:imagesFolder +'/imagePack4.png'   },
        { id: 'SoundSprite', url: imagesFolder + '/buttons/SoundSprite.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'buyBtn', url: imagesFolder + '/buttons/buyBtn.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'menuBtn', url: imagesFolder + '/buttons/menuBtn.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'playBtn', url: imagesFolder + '/buttons/playBtn.png',sheet:imagesFolder +'/imagePack4.png'   },
        { id: 'achievement', url: imagesFolder + '/mainmenuscreen/achievement.png',sheet:imagesFolder +'/imagePack2.png'   },
        { id: 'buyBig', url: imagesFolder + '/mainmenuscreen/buyBig.png' ,sheet:imagesFolder +'/imagePack2.png'  },
        { id: 'continue', url: imagesFolder + '/mainmenuscreen/continue.png' ,sheet:imagesFolder +'/imagePack2.png'  },
        { id: 'btn_ready', url: imagesFolder + '/mainmenuscreen/btn_ready.png' ,sheet:imagesFolder +'/imagePack2.png'  },
        { id: 'btn_ready_disable', url: imagesFolder + '/mainmenuscreen/btn_ready_disable.png' ,sheet:imagesFolder +'/imagePack2.png'  },

        // user controls
        { id: 'Minus', url: imagesFolder + '/buttons/Minus.png',sheet:imagesFolder +'/imagePack4.png'   },
        { id: 'Plus', url: imagesFolder + '/buttons/Plus.png',sheet:imagesFolder +'/imagePack4.png'   },

        // spinning buttons
        { id: 'betMax', url: imagesFolder + '/buttons/betMax.png',sheet:imagesFolder +'/imagePack4.png'   },
        { id: 'spin', url: imagesFolder + '/buttons/spin.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        // { id: 'boost', url: imagesFolder + '/buttons/boost.png' ,sheet:imagesFolder +'/imagePack4.png'  },

        // //daily bonus
        // { id: 'platform', url: imagesFolder + '/dailyBonus/platform.png'},
        // { id: 'box11', url: imagesFolder + '/dailyBonus/box11.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        // { id: 'box12', url: imagesFolder + '/dailyBonus/box12.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        // { id: 'box21', url: imagesFolder + '/dailyBonus/box21.png',sheet:imagesFolder +'/imagePack3.png'   },
        // { id: 'box22', url: imagesFolder + '/dailyBonus/box22.png',sheet:imagesFolder +'/imagePack4.png'   },
        // { id: 'box31', url: imagesFolder + '/dailyBonus/box31.png',sheet:imagesFolder +'/imagePack4.png'   },
        // { id: 'box32', url: imagesFolder + '/dailyBonus/box32.png',sheet:imagesFolder +'/imagePack4.png'   },
        // { id: 'box41', url: imagesFolder + '/dailyBonus/box41.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        // { id: 'box42', url: imagesFolder + '/dailyBonus/box42.png',sheet:imagesFolder +'/imagePack4.png'   },
        // { id: 'daily-bounus-bg', url: imagesFolder + '/dailyBonus/daily-bounus-bg.jpg'},


        // in game assets
        { id: "gamescreenbgforanimation", url: imagesFolder + '/gamescreen/gamescreenbgforanimation.png'},
        { id: "slotsBg", url: imagesFolder + '/gamescreen/slotsBg.png'},
        { id: "InstructionsScreen", url: imagesFolder + '/gamescreen/InstructionsScreen.jpg'},
        { id: 'rankFull', url: imagesFolder + '/gamescreen/rankFull.png',sheet:imagesFolder +'/imagePack3.png'   },
        { id: 'button_no', url: imagesFolder + '/gamescreen/button_no.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'button_yes', url: imagesFolder + '/gamescreen/button_yes.png',sheet:imagesFolder +'/imagePack3.png'   },
        { id: 'popup', url: imagesFolder + '/gamescreen/popup.png' ,sheet:imagesFolder +'/imagePack3.png'  },
       // { id: 'free_spin', url: imagesFolder + '/gamescreen/free_spin.png' },
        { id: 'text_free_spin', url: imagesFolder + '/gamescreen/text_free_spin.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'numbers_sprit', url: imagesFolder + '/gamescreen/numbers_sprit.png'},
        { id: 'yellow_1', url: imagesFolder + '/gamescreen/yellow_1.png',sheet:imagesFolder +'/imagePack3.png'   },
        { id: 'shadow', url: imagesFolder + '/gamescreen/shadow.png'},
        { id: 'outline1', url: imagesFolder + '/gamescreen/outline1.png'},
        { id: 'outline2', url: imagesFolder + '/gamescreen/outline2.png'},
        { id: 'bg_tint', url: imagesFolder + '/gamescreen/bg_tint.png'},
        { id: 'bonus', url: imagesFolder + '/gamescreen/bonus.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'scatter', url: imagesFolder + '/gamescreen/scatter.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'text_unlock-now', url: imagesFolder + '/gamescreen/text_unlock-now.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'effect_achivment', url: imagesFolder + '/gamescreen/effect_achivment.png',sheet:imagesFolder +'/imagePack5.png'},

        // reward texts
        { id: 'Yummy', url: imagesFolder + '/gamescreen/yummy.png',sheet:imagesFolder +'/imagePack3.png'   },
        { id: 'CandyLightFull', url: imagesFolder + '/gamescreen/candylightfull.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'Jellycious', url: imagesFolder + '/gamescreen/jellycious.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'Chocolate', url: imagesFolder + '/gamescreen/chocolate.png',sheet:imagesFolder +'/imagePack3.png'   },

        //xp bar
        { id: 'bar', url: imagesFolder + '/gamescreen/bar.png' ,sheet:imagesFolder +'/imagePack2.png'  },

        //winning animation
        { id: 'winningAnimationBG', url: imagesFolder + '/gamescreen/winningAnimationBG.png'},
        { id: 'blinking_star', url: imagesFolder + '/gamescreen/blinking_star.png' ,sheet:imagesFolder +'/imagePack2.png'  },

        //tutorial
        { id: 'bonusPin', url: imagesFolder + '/gamescreen/bonusPin.png',sheet:imagesFolder +'/imagePack5.png'  },
        { id: 'freeSpin', url: imagesFolder + '/gamescreen/freeSpin.png' ,sheet:imagesFolder +'/imagePack3.png'  },
        { id: 'wildSpin', url: imagesFolder + '/gamescreen/wildSpin.png',sheet:imagesFolder +'/imagePack5.png'},

        // menu - level select
        { id: 'levelSelectBg', url: imagesFolder + '/mainmenuscreen/levelSelectBg.jpg'},

        // buy screen
		// { id: 'insiderect', url: imagesFolder + '/buyscreen/insiderect.png',sheet:imagesFolder +'/imagePack4.png'   },
		// { id: 'btn1', url: imagesFolder + '/buyscreen/btn1.png',sheet:imagesFolder +'/imagePack4.png'   },
		// { id: 'btn2', url: imagesFolder + '/buyscreen/btn2.png' ,sheet:imagesFolder +'/imagePack4.png'  },
		// { id: 'btn3', url: imagesFolder + '/buyscreen/btn3.png' ,sheet:imagesFolder +'/imagePack4.png'  },
		// { id: 'btn4', url: imagesFolder + '/buyscreen/btn4.png',sheet:imagesFolder +'/imagePack4.png'   },
		// { id: 'amount1', url: imagesFolder + '/buyscreen/amount1.png' ,sheet:imagesFolder +'/imagePack4.png'  },
		// { id: 'amount2', url: imagesFolder + '/buyscreen/amount2.png' ,sheet:imagesFolder +'/imagePack4.png'  },
		// { id: 'amount3', url: imagesFolder + '/buyscreen/amount3.png',sheet:imagesFolder +'/imagePack4.png'   },
		// { id: 'amount4', url: imagesFolder + '/buyscreen/amount4.png',sheet:imagesFolder +'/imagePack4.png'   },

        // slot objects
        { id: 'Mint', url: imagesFolder + '/slotobjects/Mint.png'},
        { id: 'CokeGum', url: imagesFolder + '/slotobjects/CokeGum.png'},
        { id: 'ChocolateBunny', url: imagesFolder + '/slotobjects/ChocolateBunny.png'},
        { id: 'GummyBear', url: imagesFolder + '/slotobjects/GummyBear.png'},
        { id: 'Jelly', url: imagesFolder + '/slotobjects/Jelly.png'},
        { id: 'ToffeeApple', url: imagesFolder + '/slotobjects/ToffeeApple.png'},
        { id: 'CandyFloss', url: imagesFolder + '/slotobjects/CandyFloss.png' },
        { id: 'GingerBreadMan', url: imagesFolder + '/slotobjects/GingerBreadMan.png'},
        { id: 'PartyCake', url: imagesFolder + '/slotobjects/PartyCake.png' },
        { id: 'Bonus', url: imagesFolder + '/slotobjects/Bonus.png' },
        { id: 'Scatter', url: imagesFolder + '/slotobjects/Scatter.png' },
        { id: 'Wild', url: imagesFolder + '/slotobjects/Wild.png' },

        // lines
        { id: 'line_1', url: imagesFolder + '/lines/line_1.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'line_2', url: imagesFolder + '/lines/line_2.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'line_3', url: imagesFolder + '/lines/line_3.png' ,sheet:imagesFolder +'/imagePack4.png'  },
        { id: 'line_4', url: imagesFolder + '/lines/line_4.png' ,sheet:imagesFolder +'/imagePack6.png'},
        { id: 'line_5', url: imagesFolder + '/lines/line_5.png' ,sheet:imagesFolder +'/imagePack6.png'},
        { id: 'line_6', url: imagesFolder + '/lines/line_6.png' ,sheet:imagesFolder +'/imagePack7.png'},
        { id: 'line_7', url: imagesFolder + '/lines/line_7.png' ,sheet:imagesFolder +'/imagePack6.png'},
        { id: 'line_8', url: imagesFolder + '/lines/line_8.png' ,sheet:imagesFolder +'/imagePack5.png'},
        { id: 'line_9', url: imagesFolder + '/lines/line_9.png' ,sheet:imagesFolder +'/imagePack5.png'},
        { id: 'line_10', url: imagesFolder + '/lines/line_10.png',sheet:imagesFolder +'/imagePack8.png' },
        { id: 'line_11', url: imagesFolder + '/lines/line_11.png' ,sheet:imagesFolder +'/imagePack8.png'},
        { id: 'line_12', url: imagesFolder + '/lines/line_12.png' ,sheet:imagesFolder +'/imagePack6.png'},
        { id: 'line_13', url: imagesFolder + '/lines/line_13.png' ,sheet:imagesFolder +'/imagePack7.png'},
        { id: 'line_14', url: imagesFolder + '/lines/line_14.png',sheet:imagesFolder +'/imagePack8.png' },
        { id: 'line_15', url: imagesFolder + '/lines/line_15.png' ,sheet:imagesFolder +'/imagePack7.png'},
        { id: 'line_16', url: imagesFolder + '/lines/line_16.png' ,sheet:imagesFolder +'/imagePack7.png'},
        { id: 'line_17', url: imagesFolder + '/lines/line_17.png',sheet:imagesFolder +'/imagePack7.png' },
        { id: 'line_18', url: imagesFolder + '/lines/line_18.png' ,sheet:imagesFolder +'/imagePack6.png'},
        { id: 'line_19', url: imagesFolder + '/lines/line_19.png',sheet:imagesFolder +'/imagePack8.png' },
        { id: 'line_20', url: imagesFolder + '/lines/line_20.png',sheet:imagesFolder +'/imagePack5.png' },
        { id: 'line_21', url: imagesFolder + '/lines/line_21.png',sheet:imagesFolder +'/imagePack5.png' },
        { id: 'line_22', url: imagesFolder + '/lines/line_22.png',sheet:imagesFolder +'/imagePack5.png' },
        { id: 'line_23', url: imagesFolder + '/lines/line_23.png',sheet:imagesFolder +'/imagePack5.png' },
        { id: 'line_24', url: imagesFolder + '/lines/line_24.png',sheet:imagesFolder +'/imagePack5.png' },
        { id: 'line_25', url: imagesFolder + '/lines/line_25.png',sheet:imagesFolder +'/imagePack5.png' },

        // power-ups
        { id: 'boost1', url: imagesFolder + '/powerups/boost1.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'boost2', url: imagesFolder + '/powerups/boost2.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'boost3', url: imagesFolder + '/powerups/boost3.png' ,sheet:imagesFolder +'/imagePack1.png'},
		{ id: 'boostBuy1', url: imagesFolder + '/powerups/boostBuy1.png',sheet:imagesFolder +'/imagePack1.png' },
		{ id: 'boostBuy2', url: imagesFolder + '/powerups/boostBuy2.png',sheet:imagesFolder +'/imagePack1.png' },
		{ id: 'boostBuy3', url: imagesFolder + '/powerups/boostBuy3.png',sheet:imagesFolder +'/imagePack1.png' },
		{ id: 'btn_use', url: imagesFolder + '/powerups/btn_use.png',sheet:imagesFolder +'/imagePack1.png' },
		{ id: 'boostPop', url: imagesFolder + '/powerups/boostPop.jpg'},
		{ id: 'insideshapeDisable', url: imagesFolder + '/powerups/insideshapeDisable.png',sheet:imagesFolder +'/imagePack1.png' },

        // // achievements screen
        // { id: 'badge1', url: imagesFolder + '/achievementScreen/badge1.png',sheet:imagesFolder +'/imagePack4.png' },
        // { id: 'badge2', url: imagesFolder + '/achievementScreen/badge2.png' ,sheet:imagesFolder +'/imagePack4.png'},
        // { id: 'badge3', url: imagesFolder + '/achievementScreen/badge3.png' ,sheet:imagesFolder +'/imagePack4.png'},
        // { id: 'badge4', url: imagesFolder + '/achievementScreen/badge4.png',sheet:imagesFolder +'/imagePack4.png' },
        // { id: 'badge5', url: imagesFolder + '/achievementScreen/badge5.png',sheet:imagesFolder +'/imagePack4.png' },
        // { id: 'badge6', url: imagesFolder + '/achievementScreen/badge6.png' ,sheet:imagesFolder +'/imagePack4.png'},
        // { id: 'ribban', url: imagesFolder + '/achievementScreen/ribban.png',sheet:imagesFolder +'/imagePack4.png' },

//         // mini game
//         { id: 'miniGameBg', url: imagesFolder + '/minigame/miniGameBg.png'},
//         { id: 'layer1', url: imagesFolder + '/minigame/layer1.png',sheet:imagesFolder +'/imagePack1.png' },
//         { id: 'layer2', url: imagesFolder + '/minigame/layer2.png' ,sheet:imagesFolder +'/imagePack1.png'},
//         { id: 'layer3', url: imagesFolder + '/minigame/layer3.png' ,sheet:imagesFolder +'/imagePack2.png'},
//         { id: 'striker', url: imagesFolder + '/minigame/striker.png' ,sheet:imagesFolder +'/imagePack1.png'} ,
//         { id: 'target_pointer', url: imagesFolder + '/minigame/target_pointer.png' ,sheet:imagesFolder +'/imagePack1.png'} ,
// //        { id: 'star', url: imagesFolder + '/minigame/star.png' } ,
//         { id: 'tableShadow', url: imagesFolder + '/minigame/tableShadow.png' ,sheet:imagesFolder +'/imagePack1.png'} ,
//         { id: 'sprit_left_side', url: imagesFolder + '/minigame/sprit_left_side.png',sheet:imagesFolder +'/imagePack1.png' } ,
//         { id: 'sprit_right-side', url: imagesFolder + '/minigame/sprit_right-side.png',sheet:imagesFolder +'/imagePack1.png' } ,
//         { id: 'destroySprit', url: imagesFolder + '/minigame/destroySprit.png'} ,

        // //high striker mini game
        // { id: 'arow', url: imagesFolder + '/highStrikerMiniGame/arow.png' ,sheet:imagesFolder +'/imagePack2.png'},
        // { id: 'BG', url: imagesFolder + '/highStrikerMiniGame/BG.jpg'},
        // { id: 'hammer', url: imagesFolder + '/highStrikerMiniGame/hammer.png' ,sheet:imagesFolder +'/imagePack2.png'},
        // { id: 'hammer-base', url: imagesFolder + '/highStrikerMiniGame/hammer-base.png',sheet:imagesFolder +'/imagePack2.png' },
        // { id: 'level_glow', url: imagesFolder + '/highStrikerMiniGame/level_glow.png',sheet:imagesFolder +'/imagePack2.png' },
        // { id: 'point-ball', url: imagesFolder + '/highStrikerMiniGame/point-ball.png',sheet:imagesFolder +'/imagePack2.png' },
        // { id: 'Text_01', url: imagesFolder + '/highStrikerMiniGame/Text_01.png' ,sheet:imagesFolder +'/imagePack3.png'},
        // { id: 'Text_02', url: imagesFolder + '/highStrikerMiniGame/Text_02.png' ,sheet:imagesFolder +'/imagePack2.png'},
        // { id: 'Text_03', url: imagesFolder + '/highStrikerMiniGame/Text_03.png',sheet:imagesFolder +'/imagePack2.png' },
        // { id: 'Text_04', url: imagesFolder + '/highStrikerMiniGame/Text_04.png' ,sheet:imagesFolder +'/imagePack2.png'},
        // { id: 'Text_05', url: imagesFolder + '/highStrikerMiniGame/Text_05.png',sheet:imagesFolder +'/imagePack2.png' },

        // score board

     //   { id: 'bk_points', url: imagesFolder + '/scoreBoard/bk_points.png' },
        { id: 'close_btn', url: imagesFolder + '/scoreBoard/close_btn.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'p1', url: imagesFolder + '/scoreBoard/p1.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'p2', url: imagesFolder + '/scoreBoard/p2.png' ,sheet:imagesFolder +'/imagePack1.png'},
        { id: 'p3', url: imagesFolder + '/scoreBoard/p3.png' ,sheet:imagesFolder +'/imagePack1.png'},
        { id: 'p4', url: imagesFolder + '/scoreBoard/p4.png' ,sheet:imagesFolder +'/imagePack1.png'} ,
        { id: 'p5', url: imagesFolder + '/scoreBoard/p5.png' ,sheet:imagesFolder +'/imagePack1.png'},
        { id: 'p6', url: imagesFolder + '/scoreBoard/p6.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'p7', url: imagesFolder + '/scoreBoard/p7.png' ,sheet:imagesFolder +'/imagePack1.png'},
        { id: 'p8', url: imagesFolder + '/scoreBoard/p8.png',sheet:imagesFolder +'/imagePack1.png' },
        { id: 'p9', url: imagesFolder + '/scoreBoard/p9.png' ,sheet:imagesFolder +'/imagePack1.png'}

    ];

    // These are sound effects required for the game
    asset_object.audioAssets = [
        { id: 'button', url: audioFolder+'/button.ogg',    backup_url: audioFolder+'/button.mp3',     assetType: "audio" },
        { id: 'slotSpin_start',    url: audioFolder+'/slotSpin_start.ogg',       backup_url: audioFolder+'/slotSpin_start.mp3',        assetType: "audio" },
        { id: 'ReelSpinBG',    url: audioFolder+'/ReelSpinBG.ogg',       backup_url: audioFolder+'/ReelSpinBG.mp3',        assetType: "audio" },
        { id: 'FreeSpin',    url: audioFolder+'/FreeSpin.ogg',       backup_url: audioFolder+'/FreeSpin.mp3',        assetType: "audio" },
        { id: 'cw_logo',    url: audioFolder+'/cw_logo.ogg',       backup_url: audioFolder+'/cw_logo.mp3',        assetType: "audio" },
        { id: 'splashandmenus_bg',    url: audioFolder+'/splashandmenus_bg.ogg',       backup_url: audioFolder+'/splashandmenus_bg.mp3',        assetType: "audio" }

    ];

    return asset_object;
};