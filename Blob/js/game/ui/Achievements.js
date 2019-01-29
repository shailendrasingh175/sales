
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 4/15/13
 * Time: 12:41 PM
 * To change this template use File | Settings | File Templates.
 */
Achievements = function () {

    Achievements.superclass.constructor.apply(this, arguments);
    this.mGameObject =  TGE.Game.GetInstance();
    this.menuUIConfig =  this.mGameObject.uiConfig.menuScreen;
    this.badgeDetails =  this.mGameObject.uiConfig.achievementScreen;
    this.backgroundColor = this.menuUIConfig.backGroundColor;

    this.badgeArray = [];
    this.setUpScreen();
};
Achievements.prototype =
{
    setUpScreen: function () {
        TGE.Game.GetInstance().analytics.logAchievementEvent("achievementScreen",0,'UnlockLevel '+this.mGameObject.gameModel.mLevelUnlocked);

        var _badgeUnlockedArray = this.mGameObject.gameModel.badgeUnlockedArray;
        this.addChild(new TGE.Sprite().setup({image: 'boostPop', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
        this.addChild(new TGE.Sprite().setup({image: 'ribban', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.07)}));
        this.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: this.percentageOfWidth(0.88), y: 60, numStates: this.menuUIConfig.playButtonSpriteStates, pressFunction: this.showRequiredScreen.bind(this)}));// this.showMainMenu

        var length = Object.keys(this.badgeDetails).length;
        for (var i = 0; i < length; i++) {
            this.badgeArray.push(this.addChild(new TGE.Sprite().setup({image: this.badgeDetails['badge' + (i + 1)].image, x: this.badgeDetails['badge' + (i + 1)].x, y: this.badgeDetails['badge' + (i + 1)].y})));
            this.badgeArray[i].alpha = 0.2;
        }
        for (var j = 0; j < _badgeUnlockedArray.length; j++) {
            if (_badgeUnlockedArray[j] == 1) {
                this.badgeArray[j].alpha = 1;
            }
        }

    },
    showRequiredScreen: function () {
        TGE.Game.GetInstance().analytics.logAchievementEvent("MenuScreen",0,'UnlockLevel '+this.mGameObject.gameModel.mLevelUnlocked);
        this.mGameObject.audioPlayer.playAudio("button", false);
        this.close();
        this.mGameObject.showManagedScreen("LevelSelectScreen");
    }
};
extend(Achievements, TGE.Window);

