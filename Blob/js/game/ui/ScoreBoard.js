
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 11/28/13
 * Time: 5:14 PM
 * To change this template use File | Settings | File Templates.
 */

ScoreBoard = function () {
    ScoreBoard.superclass.constructor.apply(this, arguments);
    this.mGameObject =  TGE.Game.GetInstance();
    this.mParentObject = this.mGameObject.mGameClassObject;
    this.mParentObject.slotAnimationPlaying = true;
    this.gameScreenUIConfig = this.mGameObject.uiConfig.ScoreBoard;
    this.setUp();
};


ScoreBoard.prototype =
{
    setUp : function(){
        this.bg = this.addChild(new TGE.Sprite().setup({image: 'boostPop',x: this.percentageOfWidth(0.5), y:this.percentageOfHeight(0.5)}));
        this.bg.scaleX = 1.1;
        for(var i = 1; i <= 9; i++){
            this["objectBg"+i] = new TGE.Sprite().setup({image: 'p'+i,x: this.gameScreenUIConfig["object"+i].xPosition, y: this.gameScreenUIConfig["object"+i].yPosition});
            this.addChild(this["objectBg"+i]);
            this["objectBg"+i].scaleX = this["objectBg"+i].scaleY = 0;
            if(i == 9){
                this.showAnimation();
            }
        }
         this.addChild(new TGE.Button().setup({ image: "close_btn", x: 570, y: 60, numStates: 1, pressFunction: this.closeBetPopup.bind(this)}));
    },
    showAnimation : function(){
        var delayInc = 0.1;
        for(var i = 1; i <= 9; i++){
            CWTween.to( this["objectBg"+i],.4, { scaleX:.98 , scaleY:.98}, {delay: 0.1 + delayInc, timeline : true,ease: {name: 'Back', type: 'InOut'}});
            delayInc += 0.1;
        }
    },
    closeBetPopup : function(){
        this.mGameObject.audioPlayer.playAudio("button", false);
        this.mParentObject.slotAnimationPlaying = false;
        this.markForRemoval();
    }
};
extend(ScoreBoard, TGE.Window);


