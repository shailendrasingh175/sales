
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 11/22/13
 * Time: 5:22 PM
 * To change this template use File | Settings | File Templates.
 */
DailyBonusMiniGame = function () {
    DailyBonusMiniGame.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.gameScreenUIConfig = this.mGameObject.uiConfig.bonusMiniGame;
    this.bonusAmountArray = [100,1000,1500,3000,5000,750,2500,4000];
    this.setUpScreen();
};
DailyBonusMiniGame.prototype = {
    setUpScreen: function () {
        this.addChild(new TGE.Sprite().setup({image: 'daily-bounus-bg', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
        this.addChild(new TGE.Sprite().setup({image: 'platform', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.7)}));
        this.mGameObject.levelSelectScreenObject.readyDisable = this.mGameObject.levelSelectScreenObject.addChild(new TGE.Sprite().setup({image: 'btn_ready_disable',x: 430, y: 380}));
        for(var i = 1;i <= 4;i++){
            this["box"+i] = this.addChild(new TGE.Button().setup({
                image: 'box'+i+'1',
                x: this.gameScreenUIConfig["object"+(i)].xPosition,
                y: this.gameScreenUIConfig["object"+(i)].yPosition,
                numStates: 1,
                pressFunction: this.boxAnimationAfterClicked.bind(this, this.bonusAmountArray[Math.floor((Math.random() * 7))],i)}));
              this.boxAnimation(this["box"+i],i);

            this["box"+i].registrationY = 1;
        }

        this.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: this.percentageOfWidth(0.84), y: 60, numStates:1, pressFunction: this.closeBtnClicked.bind(this)}));
    },
    boxAnimation : function(obj,i){
        CWTween.to(obj, 0.05, {y: obj.y-2}, {delay: i,onComplete: this.onCompleteBoxUpAnimation.bind(this,obj,i)});
    },
    onCompleteBoxUpAnimation :function(obj,i){
        CWTween.to(obj, 0.05, {rotation : 5}, {onComplete: this.onCompleteBoxFirstRotation.bind(this,obj,i)});
    },
    onCompleteBoxFirstRotation : function(obj,i){
        CWTween.to(obj, 0.05, {rotation : -5}, {onComplete: this.backToOriginalAngle.bind(this,obj,i)});
    },
    backToOriginalAngle : function(obj,i){
        CWTween.to(obj, 0.05, {rotation : 0}, {onComplete: this.onCompleteLastRotation.bind(this,obj,i)});
    },
    onCompleteLastRotation : function(obj,i){
        CWTween.to(obj, 0.05, {y: obj.y+2}, {onComplete: this.boxAnimation.bind(this,obj,i)});
    },


    boxAnimationAfterClicked : function(bonusAmount,imageId){
        CWTween.remove(this.box1);
        CWTween.remove(this.box2);
        CWTween.remove(this.box3);
        CWTween.remove(this.box4);


        var obj = this["box"+imageId];
        CWTween.to(obj, 0.15, {y:obj.y-30/*,scaleY:1.1*/}, {onComplete: this.boxAnimationSecond.bind(this,obj,bonusAmount,imageId)});
    },
    boxAnimationSecond : function(obj,bonusAmount,imageId){
        CWTween.to(obj, 0.15, {y:obj.y+30,scaleY:0.9}, {onComplete: this.boxAnimationThird.bind(this,obj,bonusAmount,imageId)});
    },
    boxAnimationThird : function(obj,bonusAmount,imageId){
        obj.x -= 1;
        obj.setImage('box'+imageId+'2');
        CWTween.to(obj, 0.15, {scaleY:1.2}, {onComplete: this.boxAnimationFourth.bind(this,obj,bonusAmount,imageId)});
    },
    boxAnimationFourth : function(obj,bonusAmount,imageId){

        CWTween.to(obj, 0.15, {scaleY:1}, {onComplete: this.boxClicked.bind(this,bonusAmount,imageId)});
    },

    boxClicked : function(bonusAmount,imageId){
        for(var i =1;i<=4;i++){
            this["box"+i].mouseEnabled = false;
        }
        this.mGameObject.gameModel.credits += bonusAmount;
        this.mGameObject.gameModel.dailyBonusAmount = bonusAmount;
        this.mGameObject.tgsModel.saveDataAsString("credits", this.mGameObject.gameModel.credits);


        this.bonusText = this.addChild(new TGE.Text().setup({text: ''+bonusAmount,x:this["box"+imageId].x, y:this["box"+imageId].y-200,font: "50px " + this.mGameObject.fontName1, color: "#FFECD0"}));
        this.bonusText.scaleX = this.bonusText.scaleY = 0;
        this.mGameObject.levelSelectScreenObject.balanceText.text = ''+this.mGameObject.gameModel.credits;

        CWTween.to(this.bonusText, 2, {scaleX:1.2,scaleY:1.2/*,y:this["box"+imageId].y-200*/}, {onComplete:this.closeAfterAnimation.bind(this)});
    },
    closeAfterAnimation : function(){
        this.mGameObject.bonusUsed = true;
        this.mGameObject.levelSelectScreenObject.dailayBonusText.markForRemoval();
        this.close();
    },

    closeBtnClicked: function () {
        this.mGameObject.bonusUsed = false;
        this.close();
    }
};
extend(DailyBonusMiniGame, TGE.Window);