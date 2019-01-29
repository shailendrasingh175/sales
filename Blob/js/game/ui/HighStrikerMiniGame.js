
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 11/19/13
 * Time: 2:29 PM
 * To change this template use File | Settings | File Templates.
 */
HighStrikerMiniGame = function () {
    HighStrikerMiniGame.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    this.setUpScreen();
};
HighStrikerMiniGame.prototype = {
    setUpScreen: function () {
        this.addChild(new TGE.Sprite().setup({image: 'BG', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
        this.addChild(new TGE.Sprite().setup({ image: "level_glow", x: 109.8, y: 558}));
        this.addChild(new TGE.Sprite().setup({ image: "hammer-base", x: 326, y: 712}));
        this.pointBall = this.addChild(new TGE.Sprite().setup({ image: "point-ball", x: 326, y: 606}));


        this.arrow = this.addChild(new TGE.Sprite().setup({image: 'arow', x: 103, y: 484}));     //370
        this.winningText = this.addChild(new TGE.Sprite().setup({image: null,x: 300, y: 200}));

		this.winningAmountText = this.winningText.addChild(new TGE.Text().setup({text: '', font: " 50px " + this.mGameObject.fontName1, color: "#DE8602", x:0, y:200}));
		this.winningText.scaleX = this.winningText.scaleY = 0;
        this.playAnim(true);
        this.hammer = this.addChild(new TGE.Button().setup({image: "hammer", x: 580, y: 536,registrationX:0.86,registrationY:0.5, numStates: 1, pressFunction: this.hammerAnimation.bind(this)}));
        this.hammer.rotation = 45;

        CWTween.to(this.hammer,1,{rotation:60},{reverse:true});
    },

    checkRange: function (x, n, m) {
        if (x >= n && x <= m) {
            return x;
        }
        else {
            return !x;
        }
    },
    hammerAnimation : function(){
        CWTween.remove(this.hammer);
        CWTween.to(this.hammer,.03,{rotation:0,y:670},{onComplete:this.calculateResult.bind(this)});
    },


    calculateResult: function () {
        var currWin = 0;
        this.hammer.mouseEnabled = false;
        var num = Math.round(this.arrow.y);
		var changedY = 0;
        this.playAnim(false);
        switch (num) {
            case this.checkRange(num, 375, 400):	//1
                currWin = 300;   // winning amount
                this.winningText.setImage("Text_05");
				this.winningAmountText.text = ''+currWin;
				changedY = 142;
                break;
            case this.checkRange(num, 401, 425):	//2
                currWin = 250;
                this.winningText.setImage("Text_04");
				this.winningAmountText.text = '' + currWin;
				changedY = 194;
                break;
            case this.checkRange(num, 426, 450):	//3
                currWin = 250;
                this.winningText.setImage("Text_04");
				this.winningAmountText.text = '' + currWin;
				changedY = 242;
                break;
            case this.checkRange(num, 451, 475):	//4
                currWin = 250;
                this.winningText.setImage("Text_04");
                this.winningAmountText.text = ''+currWin;
				changedY = 288;
				break;
            case this.checkRange(num, 476, 500):	//5
                currWin = 200;
                this.winningText.setImage("Text_03");
                this.winningAmountText.text = '' + currWin;
				changedY = 332;
				break;
            case this.checkRange(num, 501, 525):	//6
                currWin = 200;
                this.winningText.setImage("Text_03");
				this.winningAmountText.text = '' + currWin;
				changedY = 376;
                break;
            case this.checkRange(num, 526, 550):	//7
                currWin = 150;
                this.winningText.setImage("Text_02");
				this.winningAmountText.text = '' + currWin;
				changedY = 428;
                break;
            case this.checkRange(num, 551, 575):	//8
                currWin = 150;
                this.winningText.setImage("Text_02");
				this.winningAmountText.text = '' + currWin;
				changedY = 470;
                break;
            case this.checkRange(num, 576, 600):	//9
                currWin = 100;
                this.winningText.setImage("Text_01");
				this.winningAmountText.text = ''+currWin;
				changedY = 520;
                break;
            case this.checkRange(num, 601, 625):	//10
                currWin = 100;
                this.winningText.setImage("Text_01");
				this.winningAmountText.text = '' + currWin;
				changedY = 558;
                break;
        }

        this.mGameObject.gameModel.credits += currWin;       
	   this.showPointBallAnimation(changedY);

    },
	
	showPointBallAnimation : function(yValue){
		CWTween.to(this.pointBall, 0.2, {y: yValue}, {onComplete : this.showWinningMessageAnimation.bind(this)});
	},
	showWinningMessageAnimation : function(){
		CWTween.to(this.winningText,.8, {scaleX:1,scaleY:1}, {onComplete : this.closeMiniGameDelay.bind(this)});
	},

    playAnim: function (bool) {
        if (bool) {
            CWTween.to(this.arrow, 0.3, {y: 635}, {reverse: true})
        }
        else {
            CWTween.remove(this.arrow);
        }

    },
    closeMiniGameDelay: function () {

        CWTween.to(this, 2, {}, {onComplete: this.closeMiniGame.bind(this)});
    },
    closeMiniGame: function () {
        this.mGameObject.mGameClassObject.creditsText.text = '' + this.mGameObject.gameModel.credits;
        this.mGameObject.mGameClassObject.miniGameActivated = false;
        this.mGameObject.mGameClassObject.slotAnimationPlaying = false;
        this.close();
    }
};
extend(HighStrikerMiniGame, TGE.Window);