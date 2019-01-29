
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/3/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

CWGame = function () {
    // Define your game class that will inherit from the core TGE.Game class
    CWGame.superclass.constructor.call(this);

    this.uiConfig = new Config().UI;
    this.levelConfig = new Level().Config;
    this.gameModel = new GameModel();
    this.bonusUsed = true;
    this.tgsModel = new TGSModel();
    this.showScreenAfterBuyScreenClose = null;
    this.audioEnabled = true;

    //analytics
    // this.analytics = new TGE.GoogleAnalytics(GameConfig.GoogleAnalytics.LABEL, GameConfig.GoogleAnalytics.PROD_ID);
    // this.analytics = new TGE.Analytics( GameConfig.GoogleAnalytics.LABEL, GameConfig.GoogleAnalytics.QA_ID );

    // We're going to use Google Analytics

    this.assetManager.rootLocation = GameConfig.CDN_ROOT;

    var asset_data = GameAssets("" + this.uiConfig.imageFolderName, "" + this.uiConfig.audioFolderName);

    // Loading assets are what is required for the loading screen
    this.assetManager.assignImageAssetList("loading", asset_data.preGameImages);


    asset_data.gameImages = asset_data.gameImages.concat(asset_data.audioAssets);
    // Required assets are what is needed to launch the game after loading
    this.assetManager.assignImageAssetList("required", asset_data.gameImages);


    // These are the screens we let TGE manage
    for (var i = 0; i < asset_data.screenData.length; i++) {
        this.registerScreenObject(asset_data.screenData[i]);
    }

    // to check whether the buy screen in invoked from main game screen or the level select screen
    TGE.Game.GetInstance().fromGame = false;

    // Game stuff
    this.mGameClassObject = null;
    this.fontName1 = "BubbleGum";
    this.fontName2 = "Shark Soft Bites";
    this.fontName3 = "digital-7";

    this.audioPlayer = new AudioPlayer(this);


    //  this.mGameEndState = 1; // 1 - level up   ||  2 - level fail   ||  3 - Game win


};
CWGame.prototype = {
    /**
     * Defines a class object data that are created at the run time on user call
     * @param {Object} Contain all user parameters related to window
     */
    registerScreenObject: function (mWindowObjectData) {
        this.registerScreen(mWindowObjectData.screenName, function () {
            var screenObj = new window[mWindowObjectData.className](mWindowObjectData.width ? mWindowObjectData.width : this.stage.width, mWindowObjectData.height ? mWindowObjectData.height : this.stage.height);
            screenObj.instanceName = mWindowObjectData.className;
            return screenObj;
        });
    },

    subclassSetupLevel: function (mCurrentLevel) {
        this.showManagedScreen("GameScreen");
        this.mGameClassObject.subclassSetupLevel(mCurrentLevel);
    },

    subclassStartPlaying: function () {
        this.mGameClassObject.subclassStartPlaying();
    },

    subclassUpdateGame: function (elapsedTime) {
        // calls the update function from game screen

        //if timer require then use this

        this.mGameClassObject.subclassUpdateGame(elapsedTime, this.mGameTime);
    },

    subclassMouseDown: function () {

    },

    subclassEndGame: function () {

    }

};
extend(CWGame, TGE.Game);