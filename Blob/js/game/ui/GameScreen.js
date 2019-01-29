/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

GameScreen = function(width, height) {

  GameScreen.superclass.constructor.apply(this, arguments);
  this.mGameObject = TGE.Game.GetInstance();
  this.mGameObject.mGameClassObject = this;
  this.mGameObject.clearScene();
};
GameScreen.prototype = {
  subclassSetupLevel: function(levelID) {
    this.mGameObject.isGameScreenCalled = true;
    this.gameScreenUIConfig = this.mGameObject.uiConfig.gameScreen;
    this.levelNumber = this.mGameObject.levelConfig.levels["level" + levelID];
    this.levelName = this.levelNumber.levelName;
    this.setOfSymbols = this.mGameObject.levelConfig.setOfSlotObjects.set1;
    this.lineDetails = this.mGameObject.levelConfig.linesCoordinates;
    this.scoreCalculation = new ScoreCalculation(this.setOfSymbols);
    this.backgroundColor = this.gameScreenUIConfig.backGroundColor;
    this.noOfObjectsInColumn = this.setOfSymbols.slotObjectsDetails.length;
    this.betCnt = 0;
    this.betAmt = this.levelNumber.bettingAmount[0];
    this.cnt = 1; // min number of line for betting
    this.totalBetAmt = this.betAmt * this.cnt;
    this.midY = this.percentageOfHeight(0.435); // y-cord of object that is placed in middle.
    this.numberOfObjectsBelowMid = 6;
    this.nColumns = this.gameScreenUIConfig.noOfCols;
    this.imagePadding = 125;
    this.spinFactor = 50;
    this.tweakableValue = 10;
    this.myValue = 0;
    this.arrayOfWildCards = [];
    this.lineArray = [];
    this.winninglinesArray = [];
    this.winLinesImageArray = [];
    this.rewardText = "";
    this.tempResult = null;

    // random values considered for the spinning time.... (no calculations done! :P)
    this.timerFactor = [
      (Math.floor(Math.random() * 3) + this.spinFactor) * this.imagePadding,
      (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue))) * this.imagePadding,
      (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 2))) * this.imagePadding,
      (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 3))) * this.imagePadding,
      (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 4))) * this.imagePadding
    ];

    // credits count
    if (this.mGameObject.gameModel.credits >= 100000) {
      this.mGameObject.gameModel.badgeUnlockedArray[5] = 1;
    }
    this.maxXP = this.levelNumber.target.maxXP;
    this.minXP = this.levelNumber.target.minXP;

    this.updateGameFields(this.mGameObject.gameModel.credits, this.mGameObject.gameModel.xp, this.mGameObject.gameModel.mLevelUnlocked, /*this.levelName,*/ this.betAmt, this.cnt, this.totalBetAmt);

  },
  subclassStartPlaying: function() {
    this.slotAnimationPlaying = false;
    this.scatterActivated = false;
    this.miniGame1Shown = false;
    this.scatterFreeSpinsCount = 0;
    this.isWinAnimShown = false;
    this.alternateFreeSpins1 = false;
    this.alternateFreeSpins2 = false;
    this.slotObjectArray = [];
    this.forceWinActivated = false;
    this.boost1Activated = false;
    this.boost2Activated = false;
    this.boost3Activated = false;
    this.boost1Constant = 10; // 10 free spins
    this.boost1FreeSpinsCount = 0;
    this.boost2Constant = 5; // 1 free spin for next 10 spins
    this.btnCLickCntForBoost2 = 0; // 10 spin counts
    this.boost3Constant = 3; // force win for next 3 spins
    this.btnCLickCntForBoost3 = 0; // 3 spin counts
    this.freeSpinsCount = 0;
    this.someCount = 0;

    //  set slots background image (5 columns only background)
    this.addChild(new TGE.Sprite().setup({ image: this.gameScreenUIConfig.slotsBg, x: 320, y: 362 }));

    // create the slot objects for showing animation
    this.createSlotObjectsForAnimation(1);
    // temp btn to chk functionality --- comment out this
    //this.addChild(new TGE.Button().setup({ image: this.levelNumber.bettingButtons.min, x: 330, y: 800, numStates: 3, pressFunction: this.spinReel.bind(this, this.levelNumber.bettingButtons.minBetAmount)}));
    // uncomment the following function to make the game playable............
    this.buildSlotMachine(); // create the layout of slot machine
    //this.startRankX = this.rankFull.x;


    // directly triggers minigame
    //this.close();
    //this.mGameObject.showManagedScreen('MiniGame');
    //this.mGameObject.showManagedScreen('HighStrikerMiniGame');
    //this.scoreCalculation.miniGamePopup();

  },
  buildSlotMachine: function() {
    // xp background
    this.bar = this.addChild(new TGE.Sprite().setup({ image: 'bar', x: 245.49, y: 126 }));
    this.bar.scaleX = this.bar.scaleY = 1.1;

    this.rankFull = this.addChild(new TGE.Sprite().setup({ image: "rankFull", x: this.mGameObject.uiConfig.xpProgressBar.xPosition, y: this.mGameObject.uiConfig.xpProgressBar.yPosition }));

    // set background image    (gamescreenbgforanimation)
    this.addChild(new TGE.Sprite().setup({ image: this.gameScreenUIConfig.backGroundForAnim, x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5) }));

    // set instructions button
    // this.addChild(new CustomDepressedButton().setup({image: "play", x: this.percentageOfWidth(0.85), y: 415, numStates: 1, pressFunction: this.playButtonClicked.bind(this)}));
    this.instructionBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.instructionBtn, x: this.gameScreenUIConfig.instructionBtnX, y: this.gameScreenUIConfig.instructionBtnY, numStates: this.gameScreenUIConfig.instructionBtnSpriteStates, pressFunction: this.showRequiredPopup.bind(this) }));

    // set sound button
    this.SoundBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.soundOnBtn, x: this.gameScreenUIConfig.soundOnBtnX, y: this.gameScreenUIConfig.soundOnBtnY, numStates: this.gameScreenUIConfig.soundOnBtnSpriteStates, pressFunction: this.toggleSound.bind(this) }));
    this.setAudioImage();
    // set points button
    this.pointChartBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.pointsBtn, x: this.gameScreenUIConfig.pointsBtnX, y: this.gameScreenUIConfig.pointsBtnY, numStates: this.gameScreenUIConfig.pointsBtnSpriteStates, pressFunction: this.showScoreBoard.bind(this) }));


    this.homeButton = this.addChild(new TGE.Sprite().setup({ image: this.gameScreenUIConfig.menuBtn, x: this.gameScreenUIConfig.menuBtnX, y: this.gameScreenUIConfig.menuBtnY }));


    // set menu button
    // this.homeButton = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.menuBtn, x: this.gameScreenUIConfig.menuBtnX, y: this.gameScreenUIConfig.menuBtnY, numStates: this.gameScreenUIConfig.menuBtnSpriteStates}));

    // set buy button
    // this.buyBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.buyBtn, x: this.gameScreenUIConfig.buyBtnX, y: this.gameScreenUIConfig.buyBtnY, numStates: this.gameScreenUIConfig.buyBtnSpriteStates, pressFunction: this.showBuyScreen.bind(this)}));

    //set bet minus button
    this.betMinusBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.betMinusBtn, x: this.gameScreenUIConfig.betMinusBtnX, y: this.gameScreenUIConfig.betMinusBtnY, numStates: this.gameScreenUIConfig.betMinusBtnSpriteStates, pressFunction: this.placeBet.bind(this, -1) }));

    // set bet plus button
    this.betPlusBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.betPlusBtn, x: this.gameScreenUIConfig.betPlusBtnX, y: this.gameScreenUIConfig.betPlusBtnY, numStates: this.gameScreenUIConfig.betPlusBtnSpriteStates, pressFunction: this.placeBet.bind(this, 1) }));

    // lines minus button
    this.lineMinusBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.linesMinusBtn, x: this.gameScreenUIConfig.linesMinusBtnX, y: this.gameScreenUIConfig.linesMinusBtnY, numStates: this.gameScreenUIConfig.linesMinusBtnSpriteStates, pressFunction: this.multiLineSelection.bind(this, -1) }));

    // lines plus button
    this.linePlusBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.linesPlusBtn, x: this.gameScreenUIConfig.linesPlusBtnX, y: this.gameScreenUIConfig.linesPlusBtnY, numStates: this.gameScreenUIConfig.linesPlusBtnSpriteStates, pressFunction: this.multiLineSelection.bind(this, 1) }));

    // max bet
    this.maxBetBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.betMaxBtn, x: this.gameScreenUIConfig.boostBtnX, y: this.gameScreenUIConfig.boostBtnY, numStates: this.gameScreenUIConfig.betMaxBtnSpriteStates, pressFunction: this.betMax.bind(this) }));

    // spin
    this.spinBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.spinBtn, x: this.gameScreenUIConfig.spinBtnX, y: this.gameScreenUIConfig.spinBtnY, numStates: this.gameScreenUIConfig.spinBtnSpriteStates, pressFunction: this.spinReel.bind(this, 'ButtonClick') }));

    // bet count text

    this.betAmountText = this.addChild(new TGE.Text().setup({ text: "" + this.betAmt, font: " 34px " + this.mGameObject.fontName1, color: "#FF9900", x: 560, y: 617 }));

    // lines count text
    this.linesCountText = this.addChild(new TGE.Text().setup({ text: "" + this.cnt, font: " 34px " + this.mGameObject.fontName1, color: "#FF9900", x: 160, y: 617 }));

    // total bet
    this.totalBetText = this.addChild(new TGE.Text().setup({ text: '' + this.totalBetAmt, font: " 35px " + this.mGameObject.fontName1, color: "#B5540D", x: 318, y: 635 }));

    //        // level rank image
    //        this.rankHighlight = this.addChild(new TGE.Sprite().setup({ image: "rankHighlight", x: this.percentageOfWidth(0.5), y: 164}));

    // level rank text
    this.levelRankText = this.addChild(new TGE.Text().setup({ text: '' + this.mGameObject.gameModel.mLevelUnlocked, font: "23px " + this.mGameObject.fontName2, color: "#D62401", x: 110, y: 126 })); //150,80 ...55

    // credits count
    this.creditsText = this.addChild(new TGE.Text().setup({ text: '' + this.mGameObject.gameModel.credits, font: " 35px " + this.mGameObject.fontName2, color: "#FC6100", x: 520, y: 112 }));
    // XP count
    // this.XPText = this.addChild(new TGE.Text().setup({text: '' + this.mGameObject.gameModel.xp, font: " 17px " + this.mGameObject.fontName1, color: "#FADBA0", x: 100, y: 128}));

    // boost

    // this.boostBtn = this.addChild(new TGE.Sprite().setup({ image: this.gameScreenUIConfig.boostBtn, x: this.gameScreenUIConfig.boostBtnX, y: this.gameScreenUIConfig.boostBtnY }));

    // this.boostBtn = this.addChild(new CustomDepressedButton().setup({ image: this.gameScreenUIConfig.boostBtn, x: this.gameScreenUIConfig.boostBtnX, y: this.gameScreenUIConfig.boostBtnY, numStates: this.gameScreenUIConfig.boostBtnSpriteStates, pressFunction: this.boostClicked.bind(this) }));

    //miniGameScoreText
    this.miniGameScoreText = this.addChild(new TGE.Text().setup({ text: null, font: " 34px " + this.mGameObject.fontName1, color: "#FF9900", x: 560, y: 628 }));
    this.addChild(this.miniGameScoreText);

    this.calculateXPProgressBar(0);
  },
  showScoreBoard: function() {
    if (!this.slotAnimationPlaying) {
      //TGE.Game.GetInstance().analytics.logCustomEvent("pointsScreen",'Level '+this.mGameObject.gameModel.mLevelUnlocked);
      this.mGameObject.audioPlayer.playAudio("button", false);
      this.mGameObject.showManagedScreen("ScoreBoard");
    }
  },

  createSlotObjectsForAnimation: function(bool) {
    var length = this.noOfObjectsInColumn; // number of objects
    var randomArr = [];
    for (var i = 1; i <= length; ++i) {
      var random = Math.round(Math.random() * (length - 1));
      if (randomArr.indexOf(random) == -1) {
        randomArr.push(random);
      } else {
        i--;
      }
    }

    if (bool) {
      this.slotObjectArray = [];
    } else {

    }


    var diffX = 114; //170; // row - padding between 2 objects
    var startX = 95; //150;
    for (var i = 0; i < this.nColumns; i++) {
      if (bool) {
        this.slotObjectArray[i] = [];
      }

      var tempY = this.imagePadding * (-this.numberOfObjectsBelowMid); // column - padding between 2 objects
      for (var j = 0; j < length; j++) {
        var imageName = this.setOfSymbols.slotObjectsDetails[randomArr[j]].ObjName[0];
        if (bool) {
          this.slotObjectArray[i][j] = this.addChild(new TGE.Sprite().setup({ image: imageName, x: startX + (i * diffX), y: tempY + this.midY }));
        } else {

          this.slotObjectArray[i][j].setImage(imageName);
          this.slotObjectArray[i][j].x = startX + (i * diffX);
          this.slotObjectArray[i][j].y = tempY + this.midY;
        }

        this.slotObjectArray[i][j].instanceName = imageName;
        tempY += this.imagePadding;

      }
    }
  },
  disableButtons: function() { // disable all buttons on screen
    this.spinBtn.mouseEnabled = false;
    this.maxBetBtn.mouseEnabled = false;
    // this.boostBtn.mouseEnabled = false;
    // this.buyBtn.mouseEnabled = false;
    this.SoundBtn.mouseEnabled = false;
    this.pointChartBtn.mouseEnabled = false;
    this.instructionBtn.mouseEnabled = false;
    this.homeButton.mouseEnabled = false;
    this.betPlusBtn.mouseEnabled = false;
    this.betMinusBtn.mouseEnabled = false;
    this.linePlusBtn.mouseEnabled = false;
    this.lineMinusBtn.mouseEnabled = false;
  },

  // enable all buttons on screen
  enableButtons: function() {
    this.spinBtn.mouseEnabled = true;
    this.maxBetBtn.mouseEnabled = true;
    // this.boostBtn.mouseEnabled = true;
    // this.buyBtn.mouseEnabled = true;
    this.SoundBtn.mouseEnabled = true;
    this.pointChartBtn.mouseEnabled = true;
    this.instructionBtn.mouseEnabled = true;
    this.homeButton.mouseEnabled = true;
    this.betPlusBtn.mouseEnabled = true;
    this.betMinusBtn.mouseEnabled = true;
    this.linePlusBtn.mouseEnabled = true;
    this.lineMinusBtn.mouseEnabled = true;
  },


  subclassUpdateGame: function(elapsedTime) {
    if (this.slotAnimationPlaying) {
      this.disableButtons();
    }
    if (!this.slotAnimationPlaying) {
      this.enableButtons();
    }

    if (this.glow) {
      if (this.glow.scaleX == 1.2)
        this.glow.rotation = this.glow.rotation + 0.4;
    }
    if (this.otherWinningGlow) {
      if (this.otherWinningGlow.scaleX == 2.2)
        this.otherWinningGlow.rotation = this.otherWinningGlow.rotation + 0.4;
    }

    // code for spinning the images.....
    if (!this.isWinAnimShown && (this.isUpdateStart || this.someCount < this.freeSpinsCount)) {

      var length = this.noOfObjectsInColumn;
      var factor = (this.imagePadding * this.numberOfObjectsBelowMid);
      /* there are 6 objects placed after the middle object in a particular column. Hence multiplying factor = (numberOfObjectsBelowMid = 6) * ('this.imagePadding' = constant difference between 2 objects)*/
      var lastY = this.midY + factor;
      var done = false;

      for (var i = 0; i < this.nColumns; i++) {
        var reduceFactor = ((this.timerFactor[i] > 3000 ? 3000 : this.timerFactor[i] + 500) * elapsedTime);

        var diffY = this.timerFactor[i] - reduceFactor;

        if (diffY >= 0) {
          for (var j = 0; j < length; j++) {
            this.slotObjectArray[i][j].y += reduceFactor;

            if (this.slotObjectArray[i][j].y > lastY) {
              var downYFactor = (this.slotObjectArray[i][j].y - lastY);
              this.slotObjectArray[i][j].y = (this.midY - factor) + downYFactor;
            }
          }
          this.timerFactor[i] -= reduceFactor;
        } else {

          for (var j = 0; j < length; j++) {
            this.slotObjectArray[i][j].y += this.timerFactor[i];
          }
          this.timerFactor[i] = 0;
        }
        if (this.timerFactor[0] == 0 && this.timerFactor[1] == 0 && this.timerFactor[2] == 0 && this.timerFactor[3] == 0 && this.timerFactor[4] == 0) {
          done = true;
          this.isUpdateStart = false;
        }

      }

    }
    // action to perform once the objects stop spinning
    if (done) {
      if (this.boost1Activated && this.boost1FreeSpinsCount == 10) {
        this.boostObject.shadow.markForRemoval();
        this.boostObject.freeSpinsText.markForRemoval();
        this.boostObject.effect1.markForRemoval();
        this.boostObject.effect2.markForRemoval();
        this.boostObject.outline1.markForRemoval();
        this.boostObject.outline2.markForRemoval();
        this.mGameObject.audioManager.Pause("FreeSpin");

      } else {
        this.mGameObject.audioManager.Pause("ReelSpinBG");
      }
      this.myValue++;
      var selTempArr = []; // this array will contain 15 symbols which appear on the screen
      selTempArr[0] = []; // row 1
      selTempArr[1] = []; // row 2
      selTempArr[2] = []; // row 3

      for (var i = 0; i < this.nColumns; i++) {
        for (var j = 0; j < length; j++) {
          if (Math.floor(this.slotObjectArray[i][j].y) >= 200 && Math.floor(this.slotObjectArray[i][j].y) < 300) {
            selTempArr[0].push(this.slotObjectArray[i][j].instanceName);
          } else if (Math.floor(this.slotObjectArray[i][j].y) >= 300 && Math.floor(this.slotObjectArray[i][j].y) < 400) {
            {

              //                           selTempArr[1].push('Bonus');
              selTempArr[1].push(this.slotObjectArray[i][j].instanceName);
            }
          } else if (Math.floor(this.slotObjectArray[i][j].y) >= 400 && Math.floor(this.slotObjectArray[i][j].y) <= 500) {
            selTempArr[2].push(this.slotObjectArray[i][j].instanceName);
          }
        }
      }
      this.sortByLines(selTempArr);
    }
  },


  spinReel: function(parent) {
    if (!this.slotAnimationPlaying) {
      this.mGameObject.audioPlayer.playAudio("slotSpin_start", false);

      this.lineArrayShowHide(false);
      if (this.scoreCalculation.popup) {
        this.scoreCalculation.popup.markForRemoval();
      }

      switch (parent) {
        case 'ButtonClick':
          {
            if (this.mGameObject.gameModel.credits < this.totalBetAmt) {

              // this.mGameObject.tgsModel.saveDataAsString("credits", this.mGameObject.gameModel.credits);
              this.creditsText.text = '' + this.mGameObject.gameModel.credits;
              this.slotAnimationPlaying = false;
              this.isUpdateStart = false;
              this.someCount = this.freeSpinsCount = 0;
              this.timerFactor = [0, 0, 0, 0, 0];
            //  this.GameEnd();
              return;
            } else {

              this.mGameObject.audioPlayer.playAudio("ReelSpinBG", false);
              this.mGameObject.gameModel.credits -= this.totalBetAmt;
              // game related values calculations
              this.totalBetText.text = '' + (this.totalBetAmt);
              // this.mGameObject.tgsModel.saveDataAsString("credits", this.mGameObject.gameModel.credits);
              this.creditsText.text = '' + this.mGameObject.gameModel.credits;

              this.calculateXP();

              if (this.isWinAnimShown) {
                this.hideWinAnimation();
              }

              if (this.totalBetAmt >= 10000) {
                this.mGameObject.gameModel.badgeUnlockedArray[0] = 1;
                // this.mGameObject.tgsModel.saveDataAsString("badgeUnlocked", this.mGameObject.gameModel.badgeUnlockedArray);
              }

              if (this.boost2Activated)
                this.btnCLickCntForBoost2++;

              if (this.boost3Activated) {

                this.btnCLickCntForBoost3++;
              }
              // boost 2....................
              if (this.mGameObject.gameModel.mLevelUnlocked >= 5 && this.btnCLickCntForBoost2 != 0 && this.btnCLickCntForBoost2 <= this.boost2Constant && this.alternateFreeSpins1) {
                this.alternateFreeSpins2 = true;

              } else {
                this.btnCLickCntForBoost2 = 0;
                this.alternateFreeSpins1 = false;
                this.alternateFreeSpins2 = false;
              }

              // boost 3....................
              if (this.mGameObject.gameModel.mLevelUnlocked >= 10 && this.btnCLickCntForBoost3 != 0 && this.btnCLickCntForBoost3 <= this.boost3Constant && this.forceWinActivated) {
                this.createSlotObjectsForAnimation(0);
              } else {
                this.btnCLickCntForBoost3 = 0;
                this.forceWinActivated = false;
              }
            }
          }
          break;
        case 'FreeSpins':
          {
            if (this.boost1Activated) {
              this.boost1FreeSpinsCount++;
            }
          }
          break;
      }
      if (this.freeSpinsCount > 0)
        this.someCount++;
      // set the time factor array once the spinning round is completed...
      if (this.forceWinActivated) {


        this.createSlotObjectsForAnimation(0);
        // force spin by a particular time interval so that each spin is a winning spin
        //                this.timerFactor = [(0 + this.spinFactor) * this.imagePadding, (12 + this.spinFactor) * this.imagePadding, (24 + this.spinFactor) * this.imagePadding, (36 + this.spinFactor) * this.imagePadding, (48 + this.spinFactor) * this.imagePadding];
        this.timerFactor = [(0 + this.spinFactor) * this.imagePadding, (13 + this.spinFactor) * this.imagePadding, (26 + this.spinFactor) * this.imagePadding, (37 + this.spinFactor) * this.imagePadding, (48 + this.spinFactor) * this.imagePadding];
      } else {
        if (this.boost1Activated) {
          CWTween.to(this.boostObject.freeSpinsText, 0.3, { scaleX: 1, scaleY: 1 }, {});
        }

        this.timerFactor = [
          (Math.floor(Math.random() * 3) + this.spinFactor) * this.imagePadding,
          (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue))) * this.imagePadding,
          (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 2))) * this.imagePadding,
          (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 3))) * this.imagePadding,
          (Math.floor(Math.random() * 3) + (this.spinFactor + (this.tweakableValue * 4))) * this.imagePadding
        ];
       }
      this.slotAnimationPlaying = true;
      this.isUpdateStart = true;
    }
  },
  calculateXP: function() {
    // calculation for XP
    if (this.betAmt >= 10) {
      var tempXP = Math.floor(0.1 * this.betAmt);
    } else {

      var tempXP = 1;
    }
    this.mGameObject.gameModel.xp += tempXP;
    this.calculateXPProgressBar();
  },

  calculateXPProgressBar: function() {
    var totalXpCount = this.maxXP - this.minXP;
    var currentXpCount = this.mGameObject.gameModel.xp - this.minXP;
    var progressBarWidth = 200;
    var progressPerSpin = (progressBarWidth * currentXpCount) / totalXpCount;
    this.rankFull.x = (this.mGameObject.uiConfig.xpProgressBar.startRankX + progressPerSpin);
  },

  sortByLines: function(arr) {
    var finalScore = 0;
    var lineArray = this.mGameObject.levelConfig.linesSelectionPattern;
    for (var i = 1; i <= this.cnt; i++) {
      finalScore += this.checkForSymbols(arr, lineArray['line' + i], 'line' + i)
    }

    if (finalScore != 0) {
      if (finalScore >= 5000) {
        this.mGameObject.gameModel.badgeUnlockedArray[3] = 1;
      }
      this.glowRibbonMidImagesNScoreImage(finalScore, this.winninglinesArray);
    } else {
      if (this.mGameObject.gameModel.xp >= this.levelNumber.target.maxXP) {
        this.gotoNextLevel();
      }
      if (this.boost1Activated) {
        this.boostObject.boost1ActivatedCallback();

      } else if (this.alternateFreeSpins2) {
        this.alternateFreeSpins2 = false;
        this.boostObject.boost2ActivatedCallback();
      }
      else {
        this.slotAnimationPlaying = false;
      }
    }
    this.mGameObject.gameModel.credits += finalScore;
    this.creditsText.text = '' + this.mGameObject.gameModel.credits;
  },

  scatterActivatedCallback: function() {
    if (this.scatterFreeSpinsCount == 1) {
      this.scatterActivated = false;
      this.scatterFreeSpinsCount = 0;
    }
    CWTween.to(this, 1, {}, { onComplete: this.startAutoSpin.bind(this) });
    this.scatterFreeSpinsCount--;

  },

  startAutoSpin: function() {
    this.hideWinAnimation();
    this.slotAnimationPlaying = false;
    this.spinReel('FreeSpins');
  },

  updateGameFields: function(_credits, _xp, _levelUnlocked, _betAmt, _lineCnt, _totalBetAmt) {

    if (this.creditsText && this.levelRankText && this.betAmountText && this.linesCountText && this.totalBetText) {
      this.creditsText.text = "" + _credits;
      this.levelRankText.text = '' + _levelUnlocked;
      this.betAmountText.text = "" + _betAmt;
      this.linesCountText.text = "" + _lineCnt;
      this.totalBetText.text = "" + _totalBetAmt;
    }
  },
  gotoNextLevel: function() {
    if (this.mGameObject.gameModel.mLevelUnlocked < 25) {
      this.mGameObject.gameModel.mLevelUnlocked++;
      this.maxXP = this.mGameObject.levelConfig.levels["level" + this.mGameObject.gameModel.mLevelUnlocked].target.maxXP;
      this.minXP = this.mGameObject.levelConfig.levels["level" + this.mGameObject.gameModel.mLevelUnlocked].target.minXP;
      this.calculateXPProgressBar();
      // if (this.mGameObject.gameModel.mLevelUnlocked == 5) {
      //   this.showPopup("boost2");
      // } else if (this.mGameObject.gameModel.mLevelUnlocked == 10) {
      //   this.showPopup("boost3");
      // }
    } else {
      this.mGameObject.gameModel.mLevelUnlocked = 25;
      this.mGameObject.gameModel.badgeUnlockedArray[4] = 1;
    }


    var levleNo = this.mGameObject.levelConfig.levels["level" + this.mGameObject.gameModel.mLevelUnlocked];
    this.bonusPoints = levleNo.bonusPoints;

    this.mGameObject.gameModel.credits += (this.bonusPoints);
    this.updateGameFields(this.mGameObject.gameModel.credits, this.mGameObject.gameModel.xp, this.mGameObject.gameModel.mLevelUnlocked, /*this.levelName, */ this.betAmt, this.cnt, this.totalBetAmt);
    this.subclassSetupLevel(this.mGameObject.gameModel.mLevelUnlocked);
  },

  checkForSymbols: function(arr1, arr2, lineNumber) {
    // whole mapping logic lies here............
    var finalArray = [];

    for (var j = 0; j < arr2.length; j++) {
      finalArray.push(arr1[arr2[j][0]][arr2[j][1]]);
    }
    var replacedArray = this.replaceWildSymbol(finalArray, 0);
    return this.scoreCalculation.getPoints(replacedArray, lineNumber);
  },

  replaceWildSymbol: function(arr, index) {
    for (var j = index; j < arr.length;) {
      var myValue = null;
      if (arr[j] == 'Wild') {
        if (arr[j + 1] == 'Wild' && (arr[j - 1] == 'Wild' || arr[j - 1] == undefined)) {
          this.arrayOfWildCards.push(j);
          index = index + 1;
          this.replaceWildSymbol(arr, index);
        } else {


          if (arr[j - 1] != undefined && arr[j - 1] != 'Wild' && arr[j - 1] != 'Scatter' && arr[j - 1] != 'Bonus') {
            myValue = this.checkPriority(arr[j], arr[j - 1]);

          } else if (arr[j + 1] == undefined) {
            myValue = this.checkPriority(arr[j], arr[j - 1]);

          } else {
            myValue = this.checkPriority(arr[j], arr[j + 1]);
          }

          for (var i = 0; i < this.arrayOfWildCards.length; i++) {
            arr[this.arrayOfWildCards[i]] = myValue;
          }
          arr[j] = myValue;
          this.arrayOfWildCards.splice(0, this.arrayOfWildCards.length);
          j++;

        }

      } else {
        j++;
      }
    }
    return arr;
  },

  checkPriority: function(wildObj, objName) {
    var imageArray = this.setOfSymbols.slotObjectsDetails;
    for (var i = 0; i < imageArray.length; i++) {
      if (objName == imageArray[i].ObjName[0]) {

        if (objName == 'Wild') {

          wildObj = 'PartyCake'
        } else if (objName == 'Bonus' || objName == 'Scatter') {

          wildObj = '';
        } else {

          wildObj = objName;
        }
      }
    }
    return wildObj;
  },


  glowRibbonMidImagesNScoreImage: function(creditsWon, winningLinesArray) {
    this.isWinAnimShown = true;
    this.winLinesImageArray = [];

    for (var i = 0; i < winningLinesArray.length; i++) {
      this.winLinesImageArray.push(this.addChild(new TGE.Sprite().setup({ image: this.lineDetails[winningLinesArray[i]].image, x: this.lineDetails[winningLinesArray[i]].x, y: this.lineDetails[winningLinesArray[i]].y })));
      CWTween.to(this.winLinesImageArray[i], 0.5, { alpha: 0.3 }, { reverse: true });
    }
    if (this.tempResult == "Scatter" || this.tempResult == "Bonus") {
      this.glow = new TGE.Sprite().setup({
        image: 'winningAnimationBG',
        x: this.percentageOfWidth(.5),
        y: this.percentageOfHeight(0.41)
      });
      this.addChild(this.glow);
      this.glow.scaleX = this.glow.scaleY = 1.2;

    } else {
      this.otherWinningGlow = new TGE.Sprite().setup({
        image: 'effect_achivment',
        x: this.percentageOfWidth(.5),
        y: this.percentageOfHeight(0.41)
      });
      this.addChild(this.otherWinningGlow);
      this.otherWinningGlow.scaleX = this.otherWinningGlow.scaleY = 2.2;
    }

    this.rewardImage = this.addChild(new TGE.Sprite().setup({ image: this.rewardText, x: this.percentageOfWidth(0.5), y: 320 }));

    this.winText = this.addChild(new TGE.Text().setup({ text: null, font: " 48px " + this.mGameObject.fontName1, color: "#D62401", x: 150, y: 80 }));
    if (this.winText) {
      this.winText.text = creditsWon;
    }

    CWTween.to(this, .1, {}, { delay: .5, onComplete: this.actionToCheckAfterWinningAnimation.bind(this) });

    if (!this.boost1Activated) {
      if (this.glow) {
        CWTween.from(this.glow, .5, { scaleX: 0, scaleY: 0, rotation: 360 }, { delay: 1, ease: { name: 'Back', type: 'InOut' } });
        CWTween.from(this.rewardImage, .5, { scaleX: 0, scaleY: 0 }, { delay: 1, ease: { name: 'Back', type: 'InOut' }, onComplete: this.starsAnimation.bind(this) });
      } else if (this.otherWinningGlow) {
        CWTween.from(this.otherWinningGlow, .5, { scaleX: 0, scaleY: 0, rotation: 360 }, { delay: 1, ease: { name: 'Back', type: 'InOut' } });
        CWTween.from(this.rewardImage, .5, { scaleX: 0, scaleY: 0 }, { delay: 1, ease: { name: 'Back', type: 'InOut' }, onComplete: this.starsAnimation.bind(this) });
      }

    }

  },
  starsAnimation: function() {
    this.star1 = this.addChild(new TGE.Sprite().setup({ image: 'blinking_star', x: this.percentageOfWidth(0.1), y: this.percentageOfHeight(0.4) }));
    this.star2 = this.addChild(new TGE.Sprite().setup({ image: 'blinking_star', x: this.percentageOfWidth(0.7), y: this.percentageOfHeight(0.6) }));
    this.star3 = this.addChild(new TGE.Sprite().setup({ image: 'blinking_star', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.2) }));
    var delay = 0.1;
    for (var i = 1; i <= 3; i++) {

      if (i == 2) {
        CWTween.from(this["star" + i], .4, { scaleX: 0, scaleY: 0 }, { delay: 0.1 + delay, ease: { name: 'Back', type: 'InOut' }, onComplete: this.removeAnimationGlowAndWinningText.bind(this) });
      } else {
        CWTween.from(this["star" + i], .4, { scaleX: 0, scaleY: 0 }, { delay: 0.1 + delay, ease: { name: 'Back', type: 'InOut' } });
      }
      delay += 0.2;
    }

  },

  removeAnimationGlowAndWinningText: function() {
    if (this.glow) {
      CWTween.to(this.glow, .5, { scaleX: 0, scaleY: 0, rotation: 360 }, { delay: .5, ease: { name: 'Back', type: 'In' } });
    } else if (this.otherWinningGlow) {
      CWTween.to(this.otherWinningGlow, .5, { scaleX: 0, scaleY: 0, rotation: 360 }, { delay: .5, ease: { name: 'Back', type: 'In' } });
    }

    CWTween.to(this.rewardImage, .5, { scaleX: 0, scaleY: 0 }, { delay: .5, ease: { name: 'Back', type: 'In' }, onComplete: this.hideWinAnimation.bind(this) });
  },

  hideWinAnimation: function() {

    if (this.glow) {
      this.glow.markForRemoval();
    }
    if (this.otherWinningGlow) {
      this.otherWinningGlow.markForRemoval()
    }
    for (var i = 0; i < this.winLinesImageArray.length; i++) {
      this.winLinesImageArray[i].markForRemoval();

    }
    if (this.rewardImage != null) {
      this.rewardImage.markForRemoval();
      this.rewardImage = null;

      this.winText.markForRemoval();
      this.winText = null;

      if (this.star1) {
        this.star1.markForRemoval();
        this.star1 = null;
      }
      if (this.star2) {
        this.star2.markForRemoval();
        this.star2 = null;
      }
      if (this.star3) {
        this.star3.markForRemoval();
        this.star3 = null;
      }
      this.rewardText = '';
    }
    this.winninglinesArray = [];
    this.winLinesImageArray = [];
    this.isWinAnimShown = false;

    // display unlocked levels

    if (this.mGameObject.gameModel.xp >= this.levelNumber.target.maxXP) {
      this.gotoNextLevel();
    }


    //   CWTween.to( this,.1, {}, {delay:.5,onComplete : this.actionToCheckAfterWinningAnimation.bind(this)});
    this.slotAnimationPlaying = false;
  },
  actionToCheckAfterWinningAnimation: function() {
    if (this.boost1Activated) {
      this.boostObject.boost1ActivatedCallback();
    } else if (this.alternateFreeSpins2) {
      this.alternateFreeSpins2 = false;
      this.boostObject.boost2ActivatedCallback();
    }
    // else if (this.scatterActivated && this.scatterFreeSpinsCount != 0) {
    //     this.scatterActivatedCallback();
    // }
    else {
      if (this.tempResult == null) {
        this.slotAnimationPlaying = false;
      }
    }
  },
  showRequiredPopup: function() {
    if (!this.slotAnimationPlaying) {
      //  TGE.Game.GetInstance().analytics.logCustomEvent("Instruction",'Level '+this.mGameObject.gameModel.mLevelUnlocked);
      this.mGameObject.audioPlayer.playAudio("button", false);
      this.slotAnimationPlaying = true;
      this.myScreen = new TGE.Sprite().setup({ image: 'InstructionsScreen', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5) });
      this.addChild(this.myScreen);
      this.instructionCloseButton = new CustomDepressedButton().setup({ image: 'close_btn', x: this.percentageOfWidth(0.87), y: this.percentageOfHeight(0.07), numStates: 1, pressFunction: this.closePopup.bind(this) });
      this.addChild(this.instructionCloseButton);
    }
  },
  closePopup: function() {
    //TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'Level '+this.mGameObject.gameModel.mLevelUnlocked);
    this.mGameObject.audioPlayer.playAudio("button", false);
    this.slotAnimationPlaying = false;
    this.instructionCloseButton.markForRemoval();
    this.myScreen.markForRemoval();
  },

  // showBuyScreen: function() {
  //   if (!this.slotAnimationPlaying) {
  //     TGE.Game.GetInstance().analytics.logCustomEvent("BuyScreen", 'Level ' + this.mGameObject.gameModel.mLevelUnlocked);
  //     this.mGameObject.audioPlayer.playAudio("button", false);
  //     //            this.mGameObject.fromGame = true;
  //     this.mGameObject.showScreenAfterBuyScreenClose = null;
  //     this.mGameObject.showScreenAfterBuyScreenClose = 'GameScreen';
  //     //this.mGameObject.showManagedScreen('BuyCoins');
  //     this.addChild(new BuyCoins(640, 836));
  //   }
  // },

  showRequiredScreen: function(screenName) {
    if (!this.slotAnimationPlaying) {
      TGE.Game.GetInstance().analytics.logCustomEvent("MenuScreen", 'Level ' + this.mGameObject.gameModel.mLevelUnlocked);
      this.mGameObject.audioPlayer.playAudio("button", false);
      if (screenName == 'LevelSelectScreen')
        this.mGameObject.fromGame = false;
      this.close();
      this.mGameObject.showManagedScreen(screenName);
    }

  },

  placeBet: function(param) {
    var maxBetAmt = this.levelNumber.bettingAmount[4];
    var minBetAmt = this.levelNumber.bettingAmount[0];

    if (!this.slotAnimationPlaying) {
      this.mGameObject.audioPlayer.playAudio("button", false);
      switch (param) {
        case 1:
          this.betCnt++;
          this.betAmt = this.levelNumber.bettingAmount[this.betCnt];

          if (this.betCnt > 4) {
            this.betCnt = 0; //4;
            this.betAmt = minBetAmt; //maxBetAmt;
            this.betAmountText.text = "" + this.betAmt;

          } else {
            this.betAmountText.text = "" + this.betAmt;

          }
          this.totalBetAmt = this.betAmt * this.cnt;
          this.totalBetText.text = '' + this.totalBetAmt;

          break;
        case -1:
          this.betCnt--;
          this.betAmt = this.levelNumber.bettingAmount[this.betCnt];

          if (this.betCnt < 0) {
            this.betCnt = 4; //0;
            this.betAmt = maxBetAmt; //minBetAmt;
            this.betAmountText.text = "" + this.betAmt;

          } else {
            this.betAmountText.text = "" + this.betAmt;

          }
          this.totalBetAmt = this.betAmt * this.cnt;
          this.totalBetText.text = '' + this.totalBetAmt;

          break;
      }
      //  TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'Bet '+this.totalBetAmt);
    }

  },
  multiLineSelection: function(param) {
    var maxNoOfLines = this.levelNumber.linesSelection.maxNoOfLines;
    if (!this.slotAnimationPlaying) {
      this.mGameObject.audioPlayer.playAudio("button", false);
      if (this.isWinAnimShown) {
        this.hideWinAnimation();
      }

      switch (param) {
        // remaining.......................
        case 1:
          if (this.cnt == 1) {
            this.removeLine();
            this.lineArray = [];
            this.drawLine(this.cnt);
          }
          this.cnt++;

          if (this.cnt > maxNoOfLines) {
            this.cnt = 1; //maxNoOfLines;
            for (var i = 0; i < this.lineArray.length; i++) {
              this.removeChild(this.lineArray[i]);
            }

            this.linesCountText.text = "" + this.cnt;

          } else {
            this.linesCountText.text = "" + this.cnt;
            this.drawLine(this.cnt)
          }

          this.totalBetAmt = this.betAmt * this.cnt;
          this.totalBetText.text = '' + this.totalBetAmt;

          break;

        case -1:
          this.cnt--;

          if (this.cnt < 1) {
            this.cnt = maxNoOfLines;
            for (var i = 0; i < this.lineArray.length; i++) {
              this.removeChild(this.lineArray[i]);
            }
            for (var i = 1; i <= this.cnt; i++) {
              this.drawLine(i)
            }

            this.linesCountText.text = "" + this.cnt;

          } else {
            this.linesCountText.text = "" + this.cnt;
            this.removeLine()
          }
          this.totalBetAmt = this.betAmt * this.cnt;
          this.totalBetText.text = '' + this.totalBetAmt;

          break;

      }
      // TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'Lines '+this.cnt);
    }
  },
  betMax: function() {
    if (!this.slotAnimationPlaying) {
      this.mGameObject.audioPlayer.playAudio("button", false);
      if (this.isWinAnimShown) {
        this.hideWinAnimation();
      }

      for (var i = 0; i < this.lineArray.length; i++) {

        this.removeChild(this.lineArray[i]);
      }
      this.lineArray = [];

      this.cnt = this.levelNumber.linesSelection.maxNoOfLines;
      this.betAmt = this.levelNumber.bettingAmount[4];
      this.betCnt = 4;
      this.linesCountText.text = "" + this.cnt;
      this.betAmountText.text = "" + this.betAmt;


      for (var i = 0; i < this.cnt; i++) {

        this.lineArray.push(this.addChild(new TGE.Sprite().setup({ image: this.lineDetails['line' + (i + 1)].image, x: this.lineDetails['line' + (i + 1)].x, y: this.lineDetails['line' + (i + 1)].y })));
      }


      this.totalBetAmt = this.betAmt * this.cnt;
      this.totalBetText.text = '' + this.totalBetAmt;

      CWTween.to(this.lineArray[0], 0.5, { alpha: 1 }, { onComplete: this.betMaxCallBack.bind(this) });

      //  TGE.Game.GetInstance().analytics.logCustomEvent("GameScreen",'MaxBet '+this.totalBetAmt);

    }

  },

  betMaxCallBack: function() {
    this.spinReel('ButtonClick');

  },
  drawLine: function(param) {
    this.lineArray.push(this.addChild(new TGE.Sprite().setup({ image: this.lineDetails['line' + param].image, x: this.lineDetails['line' + param].x, y: this.lineDetails['line' + param].y })));
    this.lineArrayShowHide(true);
  },


  removeLine: function() {

    this.removeChild(this.lineArray.pop());

    this.lineArrayShowHide(true);

  },
  lineArrayShowHide: function(bool) {
    if (bool)
      for (var i = 0; i < this.lineArray.length; i++) {
        this.lineArray[i].visible = true;
      }
    else
      for (var i = 0; i < this.lineArray.length; i++) {
        this.lineArray[i].visible = false;
      }

  },

  // boostClicked: function() {
  //   if (!this.slotAnimationPlaying) {
  //     this.mGameObject.audioPlayer.playAudio("button", false);
  //     this.boostObject = this.addChild(new Boost(this.width, this.height, this));
  //   }
  // },

  toggleSound: function() {
    if (!this.slotAnimationPlaying) {
      this.mGameObject.audioPlayer.playAudio("button", false);
      this.mGameObject.audioEnabled = !this.mGameObject.audioEnabled;
      if (this.mGameObject.audioEnabled) {
        this.SoundBtn.setImage("" + this.gameScreenUIConfig.soundOnBtn);
        this.mGameObject.audioManager.Unmute();
      } else {
        this.SoundBtn.setImage("" + this.gameScreenUIConfig.soundOffBtn);
        this.mGameObject.audioManager.Mute();
      }
    }
  },
  setAudioImage: function() {
    if (!this.mGameObject.audioEnabled)
      this.SoundBtn.setImage("" + this.gameScreenUIConfig.soundOffBtn);
    else
      this.SoundBtn.setImage("" + this.gameScreenUIConfig.soundOnBtn);
  },

  removePopup: function() {
    // this.tutorialBg.markForRemoval();
  },

  GameEnd: function() {
    if (!this.slotAnimationPlaying) {
      this.notEnoughCreditsPopup();
    }
  },
  showPopup: function(boostImage) {
    this.popup = this.addChild(new TGE.Sprite().setup({ image: 'popup', x: 320, y: 500 }));
    this.boostImage = this.popup.addChild(new TGE.Sprite().setup({ image: '' + boostImage, x: 0, y: 0 }));
    this.boostImage.scaleX = this.boostImage.scaleY = .8;
    this.popup.addChild(new TGE.MultilineText().setup({
      text: "BOOST UNLOCKED!!",
      font: " 25px " + this.mGameObject.fontName2,
      color: "#FF9900",
      x: this.percentageOfWidth(0),
      y: this.percentageOfHeight(-.1)
    }));
    this.popup.addChild(new CustomDepressedButton().setup({ image: "close_btn", x: 180, y: -100, numStates: 1, pressFunction: this.removePopup.bind(this) }));
    this.unlockText = this.popup.addChild(new CustomDepressedButton().setup({ image: "text_unlock-now", x: 0, y: 80, numStates: 1, pressFunction: this.clickOnUnlick.bind(this) }));
    CWTween.to(this.unlockText, .5, { scaleX: 1.1, scaleY: 1.1 }, { reverse: true });

  },
  clickOnUnlick: function() {
    this.boostClicked();
    this.popup.markForRemoval();
  },
  removePopup: function() {

    this.popup.markForRemoval();
  },
  // showBuyCoinsScreen: function() {
  //   this.mGameObject.showScreenAfterBuyScreenClose = null;
  //   this.mGameObject.showScreenAfterBuyScreenClose = 'GameScreen';
  //   this.addChild(new BuyCoins(640, 832));
  // },
  notEnoughCreditsPopup: function() {
    this.slotAnimationPlaying = true;
    this.popup = this.addChild(new TGE.Sprite().setup({ image: 'popup', x: 320, y: 500 }));
    this.popup.addChild(new TGE.MultilineText().setup({
      text: "NOT ENOUGH COINS",
      font: " 35px " + this.mGameObject.fontName2,
      color: "#c46b02",
      x: this.percentageOfWidth(0),
      y: this.percentageOfHeight(-.08)
    }));

  //  this.popup.addChild(new CustomDepressedButton().setup({ image: 'button_yes', x: -100, y: 50, numStates: 1, pressFunction: this.yesClicked.bind(this) }));
    //this.popup.addChild(new CustomDepressedButton().setup({ image: 'button_no', x: 100, y: 50, numStates: 1, pressFunction: this.noClicked.bind(this) }));
  },
  // yesClicked: function() {
  //   this.popup.markForRemoval();
  //  // this.showBuyCoinsScreen()
  // },
  noClicked: function() {
    if (this.mGameObject.credits >= this.levelNumber.bettingAmount[0]) {
      this.popup.markForRemoval();
      this.slotAnimationPlaying = false;
    } else {
      this.mGameObject.showManagedScreen("LevelSelectScreen");
      this.close();
    }

  }
};
extend(GameScreen, TGE.Window);
