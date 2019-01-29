
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 8/29/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */
LevelSelectScreen = function (width, height) {
    LevelSelectScreen.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.mGameObject.levelSelectScreenObject = this;
    this.setUpScreen();
};


LevelSelectScreen.prototype =
{
    setUpScreen: function () {
      this.mGameObject.audioPlayer.playAudio("splashandmenus_bg", false);
      this.menuUIConfig = this.mGameObject.uiConfig.menuScreen;
        this.backgroundColor = this.menuUIConfig.backGroundColor;
        this.levelChanged = false;
        // Main Menu Background
        this.addChild(new TGE.Sprite().setup({ image: this.menuUIConfig.backGround, x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));

		
        // Achievements
        this.addChild(new CustomDepressedButton().setup({ image: "achievement", x: this.menuUIConfig.achievementButtonX, y: this.menuUIConfig.achievementButtonY , numStates: 1, pressFunction: this.showAchievementScreen.bind(this, "Achievements")}));

        //  Buy coins
        this.addChild(new CustomDepressedButton().setup({ image: "buyBig", x: this.menuUIConfig.buyCoinsButtonX, y: this.menuUIConfig.buyCoinsButtonY, numStates: this.menuUIConfig.buyCoinsButtonSpriteStates, pressFunction: this.showRequiredScreen.bind(this)}));


        // Play button
        this.addChild(new CustomDepressedButton().setup({ image: "continue", x: this.menuUIConfig.continueButtonX, y: this.menuUIConfig.continueButtonY , numStates: this.menuUIConfig.continueButtonSpriteStates, pressFunction: this.playNow.bind(this)}));

        // ready disable
        this.readyDisable = this.addChild(new TGE.Sprite().setup({image: 'btn_ready_disable',x: 430, y: 380}));

        this.balanceText = this.addChild(new TGE.Text().setup({text: '' +  this.mGameObject.gameModel.credits, font: "40px " +  this.mGameObject.fontName1, color: "#ee9143", x: 225, y: 250}));

    },
    // OnTGSReady: function () {
    //     TGS.GetDateTime(this.timeCalculation.bind(this));
    // },
    readyClicked : function(){
        this.addChild(new DailyBonusMiniGame(640,836));
    },


    playNow: function () {
        this.mGameObject.audioPlayer.playAudio("button", false);

         this.mGameObject.mPlaying = false;
         this.mGameObject.mPaused = false;
         this.mGameObject.clearScene();
        this.setupFade(0.5, "#972");
        this.mGameObject.StartLevel( this.mGameObject.gameModel.mLevelUnlocked);
        this.mGameObject.audioManager.Pause("splashandmenus_bg");
        this.close();
    },
    changeLevel: function (param) {

        if (!this.levelChanged)
             this.mGameObject.mCurrentLevel = 0;
        this.levelChanged = true;
        switch (param) {
            case 1 :
                 this.mGameObject.mCurrentLevel++;
                if ( this.mGameObject.mCurrentLevel >  this.mGameObject.gameModel.mLevelUnlocked) {
                     this.mGameObject.mCurrentLevel = 1;
                }

                break;
            case -1 :
                 this.mGameObject.mCurrentLevel--;
                if ( this.mGameObject.mCurrentLevel < 1) {
                     this.mGameObject.mCurrentLevel =  this.mGameObject.gameModel.mLevelUnlocked;
                }
                break;
        }

    },
    showRequiredScreen: function () {

        this.mGameObject.showScreenAfterBuyScreenClose = null;
        this.mGameObject.showScreenAfterBuyScreenClose = 'LevelSelectScreen';
        this.mGameObject.audioPlayer.playAudio("button", false);
        this.mGameObject.audioManager.Pause("splashandmenus_bg");
        this.addChild(new BuyCoins(640,836));
    },
    showAchievementScreen: function (screenName) {
        this.mGameObject.audioManager.Pause("splashandmenus_bg");
        this.mGameObject.showManagedScreen(screenName);
        this.close();
    },
    timeCalculation : function (currentDate) {

//         var lastAttempt = currentDate;
         // var prevDate = new Date(TGS.DataStore.FetchStringValue("lastAttempt", currentDate));
         var current = new Date(currentDate);

      if (current.getDate() >prevDate.getDate() || current.getMonth() > prevDate.getMonth() || current.getYear() > prevDate.getYear()){
        //1f(current.getHours() > prevDate.getHours() || current.getMinutes() > prevDate.getMinutes() || current.getSeconds() > prevDate.getSeconds()){
            this.mGameObject.bonusUsed = false;
            // this.mGameObject.tgsModel.saveDataAsString("lastAttempt", currentDate);
        }
         if(current.getDate() == prevDate.getDate() && current.getMonth() == prevDate.getMonth() && current.getYear() == prevDate.getYear())
         {
             // TGE.Game.GetInstance().tgsModel.saveDataAsString("lastAttempt", currentDate);
         }

        if( this.mGameObject.bonusUsed == false){
            if(this.readyDisable){
                this.readyDisable.markForRemoval();
            }
            this.dailayBonusText = this.addChild(new CustomDepressedButton().setup({image: 'btn_ready',x: 430, y: 380, numStates: 1,pressFunction:this.readyClicked.bind(this)}));
            CWTween.to(this.dailayBonusText,.3, {scaleX:1.1,scaleY:1.1}, {reverse:true});
        }
    }
};
extend(LevelSelectScreen, TGE.Window);
