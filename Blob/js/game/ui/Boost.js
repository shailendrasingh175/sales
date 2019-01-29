
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 11/22/13
 * Time: 11:54 AM
 * To change this template use File | Settings | File Templates.
 */

Boost = function (width, height, parentObject) {
    Boost.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.mParentObject = parentObject;
    this.gameScreenUIConfig = this.mGameObject.uiConfig.boost;
    var levelID = this.mGameObject.gameModel.mLevelUnlocked;


    // boost unlocked array
    if (levelID >= 5 && levelID < 10) {
        this.mParentObject.boostUnlockedArray = [1, 1, 0];
    }
    else if (levelID >= 10) {
        this.mParentObject.boostUnlockedArray = [1, 1, 1];
    }
    else
        this.mParentObject.boostUnlockedArray = [1, 0, 0];

    this.use1 =null;
    this.use2 =null;
    this.use3 =null;
    this.setUpScreen();
};
Boost.prototype =
{
     setUpScreen: function () {
        if (!this.mParentObject.slotAnimationPlaying) {
            if (this.mParentObject.isWinAnimShown) {
                this.mParentObject.hideWinAnimation();
            }

            this.mParentObject.slotAnimationPlaying = true;

            // boost BG
            this.addChild(new TGE.Sprite().setup({image: 'boostPop', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));

            // boosts

            for (var i = 1; i <= 3; i++) {
                this["boostBG" + i] = this.addChild(new TGE.Sprite().setup({ image: 'insiderect', x: this.gameScreenUIConfig['boost' + i + "X"], y: this.gameScreenUIConfig['boost' + i + "Y"]}));
                this["boost" + i] = new TGE.Button().setup({ image: this.gameScreenUIConfig['boost' + i], x: -105, y: 2, numStates: 1, pressFunction: this.boostInstruction.bind(this, i)});   // previously we are hitting boostSelected function in it
                this["boostBG" + i].addChild(this["boost" + i]);
                this["boostBG"+i].scaleX = this["boostBG"+i].scaleY = 0;

                if(i == 3){
                    this.showAnimation();
                    this.boostClickedCallBack();
                }
            }

            // CLOSE BUTTON
            this.closeBoostBtn = this.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: 560, y: 60, numStates: 1, pressFunction: this.closeBoostPopup.bind(this)}));
        }
    },
    boostInstruction : function(i){

        this.disableButtons();
        var popup = this.mGameObject.mGameClassObject.addChild(new TGE.Sprite().setup({ image: 'popup', x:320, y: 500}));

        var popupText = new TGE.MultilineText().setup({
            text: ""
            ,font:" 25px " + this.mGameObject.fontName1,
            color: "#c46b02", x: this.percentageOfWidth(0), y: this.percentageOfHeight(-.08)});

        popup.addChild(popupText);
        popup.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: 180, y: -100, numStates: 1, pressFunction: this.removePopup.bind(this,popup)}));

        switch(i){
            case 1:
                popupText.text = "GET 10 FREE SPINS!";
                popupText.y= this.percentageOfHeight(0);
                break;
            case 2:
                popupText.text = "GET ONE FREE SPIN \n ON EVERY PAID SPIN.\nTHIS POWER IS EFFECTIVE\n FOR 5 SPINS";
                popupText.y= this.percentageOfHeight(-.05);
                break;
            case 3:
                popupText.y= this.percentageOfHeight(-.02);
                popupText.text = "WIN AN ASSURED SPIN!\n EFFECTIVE FOR 3 SPINS";
                break;

        }


    },


    removePopup : function(popup){
       popup.markForRemoval();
       this.enableButtons();
    },
    showAnimation : function(){
        var delayInc = 0.1;
        for(var i = 1; i <= 3; i++){
            CWTween.to( this["boostBG"+i],.4, { scaleX:1 , scaleY: 1}, {delay: 0.1 + delayInc, timeline : true,ease: {name: 'Back', type: 'InOut'}});
            delayInc += 0.1;
        }
    },

    // close window
    closeBoostPopup: function () {
        TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'Level '+this.mGameObject.gameModel.mLevelUnlocked);
        this.mGameObject.audioPlayer.playAudio("button", false);
        this.mParentObject.slotAnimationPlaying = false;
        this.close();
    },

    buyBoost: function (boostID,clientStatus) {
            if (clientStatus == "yes") {
                if (this.mGameObject.gameModel.credits >= this.gameScreenUIConfig["boost" + boostID + "Price"]) {
                    this.grayBg.markForRemoval();
                    TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'Level '+this.mGameObject.gameModel.mLevelUnlocked);

                    this.mGameObject.gameModel.credits -= this.gameScreenUIConfig["boost" + boostID + "Price"];
                    this.mGameObject.tgsModel.saveDataAsString("credits", this.mGameObject.gameModel.credits);
                    this.mParentObject.creditsText.text = '' + this.mGameObject.gameModel.credits;
                    this.mGameObject.gameModel.boostBuyArray[boostID - 1] = 1;
                    this.mGameObject.tgsModel.saveDataAsString("boostBuyStates", this.mGameObject.gameModel.boostBuyArray);
                    this.mGameObject.gameModel.boostUsedArray[boostID - 1] = 0;
                    this.mGameObject.tgsModel.saveDataAsString("boostUsed", this.mGameObject.gameModel.boostUsedArray);

                }
                else {
                    this.warningPopup();
                }
            }
    },


    boostClickedCallBack: function () {
        for (var i = 1; i <= 3; i++) {
            if (this.mParentObject.boostUnlockedArray[i - 1] == 0) {
                this["buy" + i] = new TGE.Button().setup({ image: "boostBuy"+i, x: 110, y: 0, numStates: 1, pressFunction: this.boostSelected.bind(this, i)});
                this["boostBG" + i].addChild(this["buy" + i]);
                this["buy" + i].mouseEnabled = false;
                this["boostBG" + i].addChild(new TGE.Sprite().setup({ image: 'insideshapeDisable', x: 0, y: 0}));
                this["boost" + i].mouseEnabled = false;

                this.unlockBoostText = this["boostBG" + i].addChild(new TGE.Text().setup({text:null ,font: " 45px " + this.mGameObject.fontName2, color: "#ffffb0", rotation:-20,x:  this["boost" + i].x+100, y: this["boost" + i].y}));
                if(i == 2)
                    this.unlockBoostText.text = "UNLOCK AT LEVEL 5";
                if(i == 3)
                    this.unlockBoostText.text = "UNLOCK AT LEVEL 10"
            }
            else {
                if (this.mGameObject.gameModel.boostUsedArray[i - 1] == 1 && this.mGameObject.gameModel.boostBuyArray[i - 1] == 0) {

                    this["buy" + i] = new TGE.Button().setup({ image: "boostBuy"+i, x: 110, y: 0, numStates: 1, pressFunction: this.confirmationBox.bind(this, i)});
                    this["boostBG" + i].addChild(this["buy" + i]);
                }
                else {
                    this["use" + i] = new TGE.Button().setup({ image: "btn_use", x: 110, y: 0, numStates: 1, pressFunction: this.boostSelected.bind(this, i)});
                    this["boostBG" + i].addChild(this["use" + i]);
                }
            }
        }
       // this.closeBoostBtn.mouseEnabled = true;
    },
    boostSelected: function (type) {
        switch (type) {
            case 1:
                this.boost1Selected();
                break;
            case 2:
                this.boost2Selected();
                break;
            case 3:
                this.boost3Selected();
                break;
        }
        this.closeBoostPopup();
    },

    boost3Selected: function () {
        this.mParentObject.boost3Activated = true;
        this.mGameObject.gameModel.boostUsedArray[2] = 1;
        this.mGameObject.tgsModel.saveDataAsString("boostUsed", this.mGameObject.gameModel.boostUsedArray);
        this.mGameObject.gameModel.boostBuyArray[2] = 0;
        this.mGameObject.tgsModel.saveDataAsString("boostBuyStates", this.mGameObject.gameModel.boostBuyArray);
        this.mParentObject.forceWinActivated = true;
    },

    boost2Selected: function () {
        this.mParentObject.boost2Activated = true;
        this.mGameObject.gameModel.boostUsedArray[1] = 1;
        this.mGameObject.tgsModel.saveDataAsString("boostUsed", this.mGameObject.gameModel.boostUsedArray);
        this.mGameObject.gameModel.boostBuyArray[1] = 0;
        this.mGameObject.tgsModel.saveDataAsString("boostBuyStates", this.mGameObject.gameModel.boostBuyArray);
        this.mParentObject.alternateFreeSpins1 = true;
    },

    boost1Selected: function () {

        this.mGameObject.audioPlayer.playAudio("FreeSpin", true);
        this.count =0;
        if(!this.shadow){
            this.shadow = this.mParentObject.addChild(new TGE.Sprite().setup({ image: 'shadow', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
            this.outline1 = this.mParentObject.addChild(new TGE.Sprite().setup({ image: 'outline1', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.435)}));
            this.outline2 = this.mParentObject.addChild(new TGE.Sprite().setup({ image: 'outline2', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.435)}));
            CWTween.to(this.outline1, 0.1, {alpha:0}, {reverse:true});
        }


        this.freeSpinsText = this.mParentObject.addChild(new TGE.Sprite().setup({image: 'text_free_spin',x: 260, y: 650}));
        this.noOfFreespin = this.freeSpinsText.addChild(new TGE.SpriteSheetAnimation().setup({
            image: "numbers_sprit",
            x:300,
            y:0,
            rows: 1,
            columns: 10,
            totalFrames: 8,
            fps: 11
        }));
        this.noOfFreespin.setSpriteIndex(this.count);
        this.freeSpinsText.scaleX = this.freeSpinsText.scaleY = 0;
        this.mParentObject.boost1Activated = true;
        this.mGameObject.gameModel.boostUsedArray[0] = 1;
        this.mGameObject.tgsModel.saveDataAsString("boostUsed", this.mGameObject.gameModel.boostUsedArray);
        this.mGameObject.gameModel.boostBuyArray[0] = 0;
        this.mGameObject.tgsModel.saveDataAsString("boostBuyStates", this.mGameObject.gameModel.boostBuyArray);
        CWTween.to(this.mParentObject, 0.3, {}, {onComplete: this.mParentObject.startAutoSpin.bind(this.mParentObject)});
    },


    boost2ActivatedCallback: function () {
        CWTween.to(this.mParentObject, 1, {}, {onComplete: this.mParentObject.startAutoSpin.bind(this.mParentObject)});
    },

    boost1ActivatedCallback: function () {
        if (this.mParentObject.boost1FreeSpinsCount >= this.mParentObject.boost1Constant) {
            this.mParentObject.slotAnimationPlaying = false;
            this.mParentObject.boost1Activated = false;
            this.mParentObject.boost1FreeSpinsCount = 0;
        }
        else {
            this.count++;
            this.freeSpinsText.scaleX = this.freeSpinsText.scaleY = 0;
            this.effect1 = new TGE.Sprite().setup({image: 'yellow_1' , x: this.freeSpinsText.x, y: this.freeSpinsText.y});
            this.effect2 = new TGE.Sprite().setup({image: 'yellow_1', x: this.freeSpinsText.x, y: this.freeSpinsText.y});
            this.mParentObject.addChild(this.effect1);
            this.mParentObject.addChild(this.effect2);

            this.effect2.scaleX = -1;
            var self = this;
            CWTween.to(this.effect1, .8, {x: this.effect1.x + 800, scaleX: 10, alpha: 0.5}, {onComplete: function () {
                self.effect1.markForRemoval();
            }});

            CWTween.to(this.effect2, .8, {x: this.effect2.x - 800, scaleX: -10, alpha: 0.5}, {onComplete: function () {
                self.effect2.markForRemoval();
                self.restartSpeen();
            }});
            this.noOfFreespin.setSpriteIndex(this.count);
//            CWTween.to(this.boost1, 1, {}, {onComplete:this.mParentObject.startAutoSpin()});
        }
    },
    restartSpeen : function(){
        this.noOfFreespin.setSpriteIndex(this.count);
        CWTween.to(this.boost1, 1, {}, {onComplete:this.mParentObject.startAutoSpin()});
    },

    warningPopup : function(boostId){
        this.disableButtons();
        this.warningPopup = this.mGameObject.mGameClassObject.addChild(new TGE.Sprite().setup({ image: 'popup', x:320, y: 500}));
        this.warningPopup.addChild(new TGE.MultilineText().setup({
            text: "YOU DON'T HAVE COINS\nTO BUY THIS ITEM.\nGO TO STORE."
            ,font:" 25px " + this.mGameObject.fontName1,
            color: "#c46b02", x: this.percentageOfWidth(0), y: this.percentageOfHeight(-.08)}));

       this.warningPopup.addChild(new TGE.Button().setup({image: 'button_yes', x: -100, y: 50, numStates: 1, pressFunction: this.yesClicked.bind(this,boostId)}));
       this.warningPopup.addChild(new TGE.Button().setup({image: 'button_no', x: 100, y: 50, numStates: 1, pressFunction: this.noClicked.bind(this)}));
    },
    yesClicked : function(){
        this.warningPopup.markForRemoval();
        this.mGameObject.showScreenAfterBuyScreenClose = null;
        this.mGameObject.showScreenAfterBuyScreenClose = 'Boost';
        this.addChild(new BuyCoins(640,832));
        this.enableButtons();
    },
    noClicked : function(){
        this.warningPopup.markForRemoval();
        this.closeBoostPopup();
        this.enableButtons();
    },

    confirmationBox : function(BoostId){
        this.disableButtons();
        this.grayBg = this.addChild(new TGE.Sprite().setup({image: 'bg_tint', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
        this.popup = this.mGameObject.mGameClassObject.addChild(new TGE.Sprite().setup({ image: 'popup', x:320, y: 500}));
        this.popup.addChild(new TGE.MultilineText().setup({
            text: "YOU WILL BE CHARGED \n" + this.gameScreenUIConfig["boost" + BoostId + "Price"] + " FROM YOUR COINS"
            ,font:" 25px " + this.mGameObject.fontName1,
            color: "#c46b02", x: this.percentageOfWidth(0), y: this.percentageOfHeight(-.08)}));

        this.popup.addChild(new TGE.Button().setup({image: 'button_yes', x: -100, y: 40, numStates: 1, pressFunction: this.yesClickedConfirmationBox.bind(this,BoostId)}));
        this.popup.addChild(new TGE.Button().setup({image: 'button_no', x: 100, y: 40, numStates: 1, pressFunction: this.noClickedConfirmationBox.bind(this)}));
    },
    yesClickedConfirmationBox: function(boostId){
        this.popup.markForRemoval();
        this["use" + boostId] = new TGE.Button().setup({ image: "btn_use", x: 110, y: 0, numStates: 1, pressFunction: this.boostSelected.bind(this, boostId)});
        this["boostBG" + boostId].addChild(this["use" + boostId]);
        this["buy" + boostId].markForRemoval();
        this.buyBoost(boostId,"yes");
        this.enableButtons();
    },
    noClickedConfirmationBox : function(){
        this.grayBg.markForRemoval();
        this.popup.markForRemoval();
        this.enableButtons();
    },
    disableButtons : function(){
        this.boost1.mouseEnabled = false;
        this.boost2.mouseEnabled = false;
        this.boost3.mouseEnabled = false;
        if(this.buy1)
            this.buy1.mouseEnabled = false;
        if(this.use1)
            this.use1.mouseEnabled = false;
        if(this.buy2)
            this.buy2.mouseEnabled = false;
        if(this.use2)
            this.use2.mouseEnabled = false;
        if(this.buy3)
            this.buy3.mouseEnabled = false;
        this.closeBoostBtn.mouseEnabled = false;
        if(this.use3)
            this.use3.mouseEnabled = false;
    },
    enableButtons : function(){
        this.boost1.mouseEnabled = true;
        if(this.mGameObject.gameModel.mLevelUnlocked>=5) {
            if(this.buy2)
                this.buy2.mouseEnabled = true;
            this.boost2.mouseEnabled = true;
        }
        if(this.mGameObject.gameModel.mLevelUnlocked>=10){
            if(this.buy3)
                this.buy3.mouseEnabled = true;
            this.boost3.mouseEnabled = true;
        }
        if(this.buy1)
            this.buy1.mouseEnabled = true;
        if(this.use1)
            this.use1.mouseEnabled = true;
        if(this.use2)
            this.use2.mouseEnabled = true;
        if(this.use3)
            this.use3.mouseEnabled = true;
        this.closeBoostBtn.mouseEnabled = true;
    }

};
extend(Boost, TGE.Window);