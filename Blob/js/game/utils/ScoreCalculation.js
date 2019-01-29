
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/15/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */

ScoreCalculation = function (setOfSymbols) {
    ScoreCalculation.superclass.constructor.apply(this, arguments);
    this.imageDetails = setOfSymbols.slotObjectsDetails;
    this.mGameObject = TGE.Game.GetInstance();
};

ScoreCalculation.prototype =
{
    getPoints: function (arr, lineNumber) {
        return this.checkForSimilarity(arr, lineNumber);
    },

    checkForSimilarity: function (arr, lineNumber) {
        var cnt = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != arr[i + 1]) {
                break;
            }
            else {
                cnt++;
            }
        }
        if (cnt < 2)
            return 0;
        else {
            this.mGameObject.mGameClassObject.winninglinesArray.push(lineNumber);
            return this.getPointArray(arr[0], cnt)

        }

    },

    getPointArray: function (objName, objCnt) {
        var score = 0;
        switch (objName) {

            case 'Scatter' :
                if (!this.mGameObject.mGameClassObject.forceWinActivated && this.mGameObject.mGameClassObject.scatterActivated == false && !this.mGameObject.mGameClassObject.boost1Activated) {
                    this.mGameObject.mGameClassObject.scatterFreeSpinsCount += this.mapPointsWithSymbolCount(10, objCnt); // 10 is the index of symbol "scatter"
                    this.mGameObject.mGameClassObject.scatterActivated = true;
                    for (var i = 0; i < this.imageDetails.length; i++) {
                        if (objName == this.imageDetails[i].ObjName[0]) {

                            score += this.mapPointsWithSymbolCount(i, objCnt)
                        }
                    }
                    this.mGameObject.mGameClassObject.tempResult= 'Scatter';
                    return true;
                }
                else{
                    return true;
                }
                break;
            case 'Bonus':
            {
                if (!this.mGameObject.mGameClassObject.forceWinActivated && !this.mGameObject.mGameClassObject.boost1Activated) {
                    this.mGameObject.mGameClassObject.extraBallsForMiniGame = this.mapPointsWithSymbolCount(11, objCnt);  // 11 is the index of symbol "bonus"
                    this.mGameObject.mGameClassObject.miniGameActivated = true;

                    for (var i = 0; i < this.imageDetails.length; i++) {
                        if (objName == this.imageDetails[i].ObjName[0]) {

                            score += this.mapPointsWithSymbolCount(i, objCnt)
                        }
                    }
                //    CWTween.to(this, 3, {}, {onComplete: this.actionAfterBonusTriggred.bind(this)});
                    this.mGameObject.mGameClassObject.tempResult= 'Bonus';
                }
                return true;
            }
                break;
            default:
            {
                for (var i = 0; i < this.imageDetails.length; i++) {
                    if (objName == this.imageDetails[i].ObjName[0]) {

                        score += this.mapPointsWithSymbolCount(i, objCnt)
                    }
                }
                this.mGameObject.mGameClassObject.tempResult= null;
                return (score * this.mGameObject.mGameClassObject.betAmt);
            }
                break;
        }
    },
    actionAfterBonusTriggred : function(){
        if(!this.mGameObject.mGameClassObject.boost1Activated && !this.mGameObject.mGameClassObject.boost2Activated && !this.mGameObject.mGameClassObject.scatterActivated){
           this.miniGamePopup();
            this.mGameObject.mGameClassObject.disableButtons();

        }
    },
    miniGamePopup : function(){
        this.popup = this.mGameObject.mGameClassObject.addChild(new TGE.Sprite().setup({ image: 'popup', x:320, y: 450}));
        this.popup.addChild(new TGE.MultilineText().setup({
            text: "YOU HAVE GOT BONUS.\n START MINI GAME?"
            ,font:" 35px " + this.mGameObject.fontName2,
            color: "#c46b02", x:0, y: -70}));
       this.popup.addChild(new CustomDepressedButton().setup({image: 'button_yes', x: -100, y: 40, numStates: 1, pressFunction: this.yesClicked.bind(this)}));
       this.popup.addChild(new CustomDepressedButton().setup({image: 'button_no', x: 100, y: 40, numStates: 1, pressFunction: this.noClicked.bind(this)}));
        this.popup.scaleX = this.popup.scaleY = 0;

        CWTween.to(this.popup,.5, {scaleX:1,scaleY:1}, {});

    },

    mapPointsWithSymbolCount: function (index, objCnt) {
        var value = 0;
        switch (objCnt) {

            // 3 symbols
            case 2:
                value += this.imageDetails[index].ObjName[1][0];
                this.mGameObject.mGameClassObject.rewardText = this.imageDetails[index].ObjName[1][1];
                break;
            // 4 symbols
            case 3:
                value += this.imageDetails[index].ObjName[2][0];
                this.mGameObject.mGameClassObject.rewardText = this.imageDetails[index].ObjName[2][1];
                break;
            // 5 symbols
            case 4:
                value += this.imageDetails[index].ObjName[3][0];
                this.mGameObject.mGameClassObject.rewardText = this.imageDetails[index].ObjName[3][1];
                break;
        }
        return value;
    },
    yesClicked: function () {
        if (!this.miniGame1Shown) {
            this.miniGame1Shown = true;
            this.mGameObject.showManagedScreen('MiniGame');
        }
        else {
            this.miniGame1Shown = false;
            this.mGameObject.showManagedScreen('HighStrikerMiniGame');
        }
      //  this.tutorialBg.markForRemoval();
        this.popup.markForRemoval();
    },
    noClicked: function () {
       // this.tutorialBg.markForRemoval();
        CWTween.to(this.popup,.5, {scaleX:0,scaleY:0}, {onComplete: this.animationAfterClickedNo.bind(this)});
    },
    animationAfterClickedNo: function(){
        this.popup.markForRemoval();
        this.mGameObject.mGameClassObject.enableButtons();
    },
    removePopup: function (calledFrom) {
        if(calledFrom == "bonus") {
           // this.miniGamePopup();
        }
       // this.tutorialBg.markForRemoval();
    }
};
extend(ScoreCalculation, TGE.Window);
