
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

LoadingScreen = function (width, height) {

    LoadingScreen.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
};
LoadingScreen.prototype =
{

};
extend(LoadingScreen, TGE.Window);