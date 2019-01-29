
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

function Config() {
    this.UI =
    {
        imageFolderName: "images",
        audioFolderName: "audio",

        loadingScreen: {
            //Loading Background
            backGroundColor: "#000",
            backGround: "loading_bg",

            //Loading Text
            loadingTextInitialText: "0%",
            loadingTextPrefix: "Loading ",
            loadingTextSuffix: " %",
            loadingTextFont: "50px Arial",
            loadingTextColor: "#B2573C",
            loadingTextX: 360,
            loadingTextY: 410,

            //Loading Animation
            loadingAnimation: "NA",
            loadingAnimationX: 0,
            loadingAnimationY: 0,
            loadingAnimationFPS: 0,
            loadingAnimationRow: 0,
            loadingAnimationCol: 0,
            loadingAnimationTotalFrames: 0,
            loadingAnimationLoop: true

        },

        menuScreen: {
            //Loading Background
            backGroundColor: "#000",
            backGround: "levelSelectBg",
            rank: "rank",

            //achievement button
            achievementButton: "achievementsBtn",
            achievementButtonX: 330,
            achievementButtonY: 490,
            achievementButtonSpriteStates: 1,


            //buycoins button
            buyCoinsButton: "buyBtn",
            buyCoinsButtonX: 330,
            buyCoinsButtonY: 610,
            buyCoinsButtonSpriteStates: 1,

            //buycoins button
            continueButtonX: 330,
            continueButtonY: 730,
            continueButtonSpriteStates: 1,

            //play button
            playButton: "playBtn",
            playButtonX: 420,
            playButtonY: 680,
            playButtonSpriteStates: 1,

            //LinK button
            linkButton1: "NA",
            linkButton1Image: "",
            linkButton1X: "a",
            linkButton1Y: "a",
            linkButton1Address: "a",

            //Link Button
            linkButton2: "NA",
            linkButton2Image: "",
            linkButton2X: "a",
            linkButton2Y: "a",
            linkButton2Address: "a"

        },

        gameScreen: {
            backGroundColor: "#000",
            backGroundForAnim: "gamescreenbgforanimation",
            slotsBg: "slotsBg",
            noOfRows: 3,
            noOfCols: 5,

            menuBtn: "menuBtn",
            menuBtnX: 442,
            menuBtnY: 46,
            menuBtnSpriteStates: 1,

            instructionBtn: "helpButton",
            instructionBtnX: 367,
            instructionBtnY: 46,
            instructionBtnSpriteStates: 1,


            soundOnBtn: "SoundSprite",
            soundOnBtnX: 523,
            soundOnBtnY: 46,
            soundOnBtnSpriteStates: 1,

            soundOffBtn: "MuteSprite",
            soundOffBtnX: 523,
            soundOffBtnY: 46,
            soundOffBtnSpriteStates: 1,

            pointsBtn: "PointsChart",
            pointsBtnX: 600,
            pointsBtnY: 46,
            pointsBtnSpriteStates: 1,


            levelBtn: "levelbtn",
            levelBtnX: 150,
            levelBtnY: 30,
            levelBtnSpriteStates: 1,


            betMinusBtn: "Minus",
            betMinusBtnX: 570,
            betMinusBtnY: 640,
            betMinusBtnSpriteStates: 1,

            betPlusBtn: "Plus",
            betPlusBtnX: 474,
            betPlusBtnY: 640,
            betPlusBtnSpriteStates: 1,

            linesMinusBtn: "Minus",
            linesMinusBtnX: 164,
            linesMinusBtnY: 640,
            linesMinusBtnSpriteStates: 1,

            linesPlusBtn: "Plus",
            linesPlusBtnX: 69,
            linesPlusBtnY: 640,
            linesPlusBtnSpriteStates: 1,


            boostBtn: "boost",
            boostBtnX: 80,
            boostBtnY: 760,
            boostBtnSpriteStates: 1,


            betMaxBtn: "betMax",
            betMaxBtnX: 220,
            betMaxBtnY: 760,
            betMaxBtnSpriteStates: 1,


            buyBtn: "buyBtn",
            buyBtnX: 363,
            buyBtnY: 760,
            buyBtnSpriteStates: 1,

            spinBtn: "spin",
            spinBtnX: 550,
            spinBtnY: 760,
            spinBtnSpriteStates: 1,


            charm1: "charm1",
            charm1X: 188,
            charm1Y: 105,

            charm2: "charm2",
            charm2X: 282,
            charm2Y: 105,

            charm3: "charm3",
            charm3X: 375,
            charm3Y: 105


        },
        boost:
        {
            boost1: "boost1",
            boost1X: 320,
            boost1Y: 200,
            boost1SpriteStates: 1,
            boost1Price : 1500,

            boost2: "boost2",
            boost2X: 320,
            boost2Y: 430,
            boost2SpriteStates: 1,
            boost2Price : 3000,

            boost3: "boost3",
            boost3X: 320,
            boost3Y: 660,
            boost3SpriteStates: 1,
            boost3Price : 5000
        },
		buy:
        {
            buy1: "buy1",
            buy1X: 320,
            buy1Y: 150,
            buy1SpriteStates: 1,
            buy1Price : 15000,

            buy2: "buy2",
            buy2X: 320,
            buy2Y: 335,
            buy2SpriteStates: 1,
            buy2Price : 60000,

            buy3: "buy3",
            buy3X: 320,
            buy3Y: 520,
            buy3SpriteStates: 1,
            buy3Price : 180000,

            buy4: "buy4",
            buy4X: 320,
            buy4Y: 705,
            buy4SpriteStates: 1,
            buy4Price : 500000
        },

        achievementScreen: {
            badge1: {image: 'badge1', x: 210, y: 210},
            badge2: {image: 'badge2', x: 420, y: 220},
            badge3: {image: 'badge3', x: 210, y: 445},
            badge4: {image: 'badge4', x: 430, y: 445},
            badge5: {image: 'badge5', x: 210, y: 670},
            badge6: {image: 'badge6', x: 430, y: 670}
        } ,
        bonusMiniGame : {
           object1:{
                xPosition:185,
                yPosition:400
           },
            object2:{
                xPosition:455,
                yPosition:400
            },
            object3:{
                xPosition:185,
                yPosition:730
            },
            object4:{
                xPosition:455,
                yPosition:730
            }
        },
        ScoreBoard : {
                object1:{
                    xPosition:190,
                    yPosition:140
                },
                object2:{
                    xPosition:190,
                    yPosition:280
                },
                object3:{
                    xPosition:190,
                    yPosition:420
                },
                object4:{
                    xPosition:190,
                    yPosition:560
                },
                object5:{
                    xPosition:445,
                    yPosition:140
                },
                object6:{
                    xPosition:445,
                    yPosition:280
                },
                object7:{
                    xPosition:445,
                    yPosition:420
                },
                object8:{
                    xPosition:445,
                    yPosition:560
                },
                object9:{
                    xPosition:320,
                    yPosition:710
                }
        },
        xpProgressBar : {
            startRankX : 150,
            xPosition:150,
            yPosition:126
        }

    }
}
