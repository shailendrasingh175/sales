
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */


MainMenu = function (width, height) {
    MainMenu.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.playNow();

};


MainMenu.prototype =
{
    playNow: function () {
        this.close();
          this.mGameObject.StartLevel( this.mGameObject.gameModel.mLevelUnlocked);
      
       // this.mGameObject.showManagedScreen("LevelSelectScreen");
    }
};
extend(MainMenu, TGE.Window);
