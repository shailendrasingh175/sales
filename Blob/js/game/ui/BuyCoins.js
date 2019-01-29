
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 4/15/13
 * Time: 12:41 PM
 * To change this template use File | Settings | File Templates.
 */
BuyCoins = function () {
    BuyCoins.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.gameScreenUIConfig = this.mGameObject.uiConfig.buy;
    this.setUpScreen();
};
BuyCoins.prototype =
{
    setUpScreen: function () {
        this.addChild(new TGE.Sprite().setup({ image: "boostPop", x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
        // go to main menu
        var creditsArray = [15000,60000,180000,500000];

        for (var i = 1; i <= 4; i++) {

            this["buyBG" + i] = this.addChild(new TGE.Sprite().setup({ image: 'insiderect', x: this.gameScreenUIConfig['buy' + i + "X"], y: this.gameScreenUIConfig['buy' + i + "Y"]}));
            this["buyBG" + i].addChild(new TGE.Sprite().setup({image: "amount"+i,x:-85, y:0}));
            this["buy" + i] = new CustomDepressedButton().setup({ image: 'btn'+i, x: 120, y: 0, numStates: 1, pressFunction:this.buyCredits.bind(this,this.mGameObject.data[i-1]["id"],creditsArray[i-1])}); //this.buyBoost.bind(this, i)});
            this["buyBG" + i].addChild(this["buy" + i]);

            this["buyBG"+i].scaleX = this["buyBG"+i].scaleY = 0;

            if(i == 4){
                this.showAnimation();
            }
        }
        this.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: 560, y: 60, numStates: 1, pressFunction: this.showRequiredScreen.bind(this,this.mGameObject.showScreenAfterBuyScreenClose)}));
    },


    showAnimation : function(){
        var delayInc = 0.1;
        for(var i = 1; i <= 4; i++){
            CWTween.to( this["buyBG"+i],.4, { scaleX:1 , scaleY: 1}, {delay: 0.1 + delayInc, timeline : true,ease: {name: 'Back', type: 'InOut'}});
            delayInc += 0.1;
        }
    },
    buyCredits: function (id,value) {


        this.mGameObject.audioPlayer.playAudio("button", false);
        var b =  this.mGameObject.gameModel.credits + value;
        TGS.Microtransactions.PurchaseProduct({
            productID: id,
            gameDataUpdates: {"credits": b},
            onSuccess: this.madePurchase.bind(this,b,value),
            onFailure: this.purchaseFailed.bind(this)});

    },
    purchaseFailed: function()
    {

        this.showRequiredScreen(this.mGameObject.showScreenAfterBuyScreenClose);
    },
    madePurchase: function(value)
    {

        this.mGameObject.gameModel.credits += value;
        TGE.Game.GetInstance().analytics.logCustomEvent("Credits "+value,'UnlockLevel '+this.mGameObject.gameModel.mLevelUnlocked);
        this.mGameObject.tgsModel.saveDataAsString("credits", this.mGameObject.gameModel.credits);
        if (this.mGameObject.showScreenAfterBuyScreenClose == "LevelSelectScreen") {
            this.mGameObject.levelSelectScreenObject.balanceText.text = '' + this.mGameObject.gameModel.credits;
        }
        else {
            this.mGameObject.mGameClassObject.creditsText.text = '' + this.mGameObject.gameModel.credits;
        }
        this.showRequiredScreen(this.mGameObject.showScreenAfterBuyScreenClose);

    },
    showRequiredScreen: function (screenName){

        this.mGameObject.audioPlayer.playAudio("button", false);

       if(this.mGameObject.showScreenAfterBuyScreenClose == "GameScreen"){

           this.mGameObject.mGameClassObject.isUpdateStart = false;
           this.mGameObject.mGameClassObject.slotAnimationPlaying = false;
       }
        TGE.Game.GetInstance().analytics.logCustomEvent(""+screenName,'UnlockLevel '+this.mGameObject.gameModel.mLevelUnlocked);
        this.close();

    }
};
extend(BuyCoins, TGE.Window);