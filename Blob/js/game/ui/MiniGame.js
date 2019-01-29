
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 12/10/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */
MiniGame = function () {
    MiniGame.superclass.constructor.apply(this, arguments);
    this.mGameObject = TGE.Game.GetInstance();
    //this.chances = this.mGameObject.levelConfig.levels['level' + this.mGameObject.gameModel.mLevelUnlocked].numberOfBallsForMiniGame + this.mGameObject.mGameClassObject.extraBallsForMiniGame;

    this.chances = 8;       // temp
    this.symbolDetails = this.mGameObject.levelConfig.setOfSlotObjects.set1.slotObjectsDetails;
    this.slotObjectsArray = [];
    for (var i = 0; i < this.symbolDetails.length; i++) {
        this.slotObjectsArray.push({
            image: this.symbolDetails[i].ObjName[0],
            points: this.symbolDetails[i].ObjName[4]
        });
    }

    this.objectArray = [];
    this.randomImageArray = [];
    this.yPositionArray = [260,360,500] ;
    this.xPositionArray = [130,325,515] ;
    this.ballMovement = false;
	this.score = 0;


    this.setUpScreen();
    this.addEventListener('mousedown', this.strikerMouseDown);
    this.addEventListener('mousemove', this.strikerMouseMove);

};
MiniGame.prototype = {

    setUpScreen: function () {

        this.layer3 = this.addChild(new TGE.Sprite().setup({image: 'layer3', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.27)}));
        this.layer3.scaleY = 1.1;

        this.createObjects();
        this.tgeStriker = this.addChild(new TGE.Sprite().setup({image: 'striker', x: 320, y: 800}));
        if (this.mGameObject.gameModel.mLevelUnlocked == 10) {
            this.mGameObject.gameModel.badgeUnlockedArray[2] = 1;
            this.mGameObject.tgsModel.saveDataAsString("badgeUnlocked", this.mGameObject.gameModel.badgeUnlockedArray);
        }
    },
    strikerMouseDown: function () {
        if(this.mGameObject.mMouseY < 533 && this.mGameObject.mMouseY >210
            && this.mGameObject.mMouseX < 570 && this.mGameObject.mMouseX >80){            
            if(this.ballMovement  == false){
                this.chances--;
                this.ballMovement = true;
                this.drawBazierCurve();
            }
        }
    },
    strikerMouseMove : function (){
        if(this.mGameObject.mMouseY < 533 && this.mGameObject.mMouseY >210
            && this.mGameObject.mMouseX < 570 && this.mGameObject.mMouseX >80) {
            this.targetPointer.x = this.mGameObject.mMouseX;
            this.targetPointer.y = this.mGameObject.mMouseY;
        }
    },
    createObjects: function () {
        for(var i=0; i<3; i++){
            this.objectArray[i] = [];
            for(var j=0; j<3; j++){
                this.randomImageArray[j] = this.slotObjectsArray[(Math.round((Math.random() * 11) + 0))].image;
                this.objectArray[i][j] = (this.addChild(new TGE.Sprite().setup(
                    {
                        image: this.randomImageArray[j],
                        x: this.xPositionArray[j],
                        y: this.yPositionArray[i]
                    }
                )));
                this.objectArray[i][j].visibility = "visible";
                this.objectArray[i][j].imageName = ""+this.randomImageArray[j];
               // this.totalObjects++;
                this.moveObjectDownAnimation(this.objectArray[i][j]);

            }
            if(i == 0){
                this.addChild(new TGE.Sprite().setup({image: 'tableShadow', x: this.percentageOfWidth(0.5), y: 280}));
                this.addChild(new TGE.Sprite().setup({image: 'layer2', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.42)}));
            }else if(i == 1){
                this.addChild(new TGE.Sprite().setup({image: 'tableShadow', x: this.percentageOfWidth(0.5), y: 381}));
                this.addChild(new TGE.Sprite().setup({image: 'layer1', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.56)}));
            }
        }


        this.addChild(new TGE.Sprite().setup({image: 'tableShadow', x: this.percentageOfWidth(0.5), y: 520}));
        this.addChild(new TGE.Sprite().setup({image: 'miniGameBg', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.5)}));
//        this.addChild(new TGE.Sprite().setup({image: 'Text', x: 140, y: 100}));
        this.scoreText = new TGE.Text().setup({text: '0', font: " 41px " + this.mGameObject.fontName3, color: "#48ff00", x: 400, y: 70});

        this.addChild(this.scoreText);
        this.targetPointer = this.addChild(new TGE.Sprite().setup({image: 'target_pointer', x: this.percentageOfWidth(0.5), y: this.percentageOfHeight(0.27)}));
        this.targetPointer.scaleX = this.targetPointer.scaleY = 0.5;

        this.noOfChancesRemainingRight = this.addChild(new TGE.SpriteSheetAnimation().setup({
            image: "sprit_right-side",
            x:600,
            y:650,
            rows: 1,
            columns: 8,
            totalFrames: 8,
            fps: 11
        }));
        this.noOfChancesRemainingRight.setSpriteIndex(this.chances-1);
        this.noOfChancesRemainingLeft = this.addChild(new TGE.SpriteSheetAnimation().setup({
            image: "sprit_left_side",
            x:36,
            y:648,
            rows: 1,
            columns: 8,
            totalFrames: 8,
            fps: 11
        }));
        this.noOfChancesRemainingLeft.setSpriteIndex(this.chances-1);
    } ,
    moveObjectDownAnimation : function(obj){
        obj.visibility = "visible";
        CWTween.to(obj,.5, {y: obj.y+100}, {delay: (Math.round((Math.random() * 3))),onComplete : this.moveObjectUpAnimation.bind(this,obj)});
    },
    moveObjectUpAnimation : function(obj){
        obj.visibility = "hidden";
        CWTween.to(obj,.5, {y: obj.y-100}, {delay: (Math.round((Math.random() * 5))),onComplete : this.moveObjectDownAnimation.bind(this,obj)});
    },


    drawBazierCurve : function () {      
        this.directionLine = new TGE.Sprite().setup({x: 0, y: 0});
        this.addChild(this.directionLine);
        var accuracy = 0; //this'll give the bezier 100 segments
        var p0 = {x: 320, y: 800}; //use whatever points you want obviously
        var p1 = {x: 320, y: 800};
        var p2 = {x: this.mGameObject.mMouseX, y: this.mGameObject.mMouseY-200} ;
        var p3 = {x: this.mGameObject.mMouseX, y: this.mGameObject.mMouseY+30};
        var previousPoints = p0;
        var that = this;
        var strikerStop = true;
        this.directionLine._drawClass = function (context){

            context.width = 500;
            context.height = 500;
            context.moveTo(previousPoints.x, previousPoints.y);

               if(accuracy<1)
               {
                   var p = that.bezier(accuracy, p0, p1, p2, p3);
                       that.tgeStriker.x = p.x;
                       that.tgeStriker.y = p.y;
                       that.tgeStriker.scaleX -= 0.01;
                       that.tgeStriker.scaleY -= 0.01;
                       //context.lineTo(p.x, p.y);
                       //context.stroke();
                       previousPoints = p;
               }
           else{
                   if(strikerStop){
                       strikerStop = false;
                       that.checkForCollision();
                       that.nextChance();
                   }
            }
            accuracy += 0.03;
        }
    },
    bezier : function(t, p0, p1, p2, p3){
    var cX = 3 * (p1.x - p0.x),
        bX = 3 * (p2.x - p1.x) - cX,
        aX = p3.x - p0.x - cX - bX;

    var cY = 3 * (p1.y - p0.y),
        bY = 3 * (p2.y - p1.y) - cY,
        aY = p3.y - p0.y - cY - bY;

    var x =  Math.floor((aX * Math.pow(t, 3)) + (bX * Math.pow(t, 1.7)) + (cX * t) + p0.x);
    var y = Math.floor((aY * Math.pow(t, 3)) + (bY * Math.pow(t, 1.7)) + (cY * t) + p0.y);

    return {x: x, y: y};
    },

    checkForCollision: function () {
        for (var i = 0; i < this.objectArray.length; i++){
            for (var j = 0; j < this.objectArray[i].length; j++) {
                if (this.objectArray[i][j].hitTestPoint(this.tgeStriker.x, this.tgeStriker.y)) {
                   if(this.objectArray[i][j].visibility == 'visible'){
//                       this.fireWork = new SparkleEffect(this.objectArray[i][j].x-10, this.objectArray[i][j].y-10, "star" ,0);
//                       this.addChild(this.fireWork);
//                       CWTween.to(this.fireWork, 0.3, {}, {});
                      // this.totalObjects--;
                       this.calculateScore(this.objectArray[i][j],this.objectArray[i][j].imageName);
                       this.objectArray[i][j].visible = false;
                       this.objectArray[i].splice(j, 1);
                       this.tgeStriker.markForRemoval();
                       this.ballMovement = false;
                       this.destroyObjectAnimation = this.addChild(new TGE.SpriteSheetAnimation().setup({
                           image: "destroySprit",
                           x:this.tgeStriker.x,
                           y:this.tgeStriker.y,
                           rows: 4,
                           columns: 5,
                           totalFrames: 18,
                           fps: 18,
                           looping: false
                       }));
                       this.destroyObjectAnimation.play();
                       this.destroyObjectAnimation.scaleX = this.destroyObjectAnimation.scaleY = .7;

                       break;
                   }
                }
                else{
                    this.tgeStriker.markForRemoval();
                    this.ballMovement = false;


                }
            }
        }
    },
    calculateScore: function (object,obj) {
        for (var i = 0; i < this.slotObjectsArray.length; i++) {	
            if (obj == this.slotObjectsArray[i].image) {			
                var currWin = this.slotObjectsArray[i].points;
                this.score += currWin;
                this.scoreText.text = '' + this.score;
                var   scoreAnimText = new TGE.Text().setup({text: ''+currWin, font: " 41px " + this.mGameObject.fontName2, color: "#48ff00", x: object.x, y: object.y});

                this.addChild(scoreAnimText);
                CWTween.to(scoreAnimText,.8, {y:object.y-100,alpha:0}, {onComplete:this.removeObject.bind(this,object)});
            }
        }
    },
    removeObject : function(object){
        object.markForRemoval();

    },
    closeMiniGame: function () {
        this.mGameObject.gameModel.credits += this.score;
        this.mGameObject.mGameClassObject.creditsText.text = '' + TGE.Game.GetInstance().gameModel.credits;
        this.mGameObject.mGameClassObject.miniGameActivated = false;
        this.mGameObject.mGameClassObject.slotAnimationPlaying = false;
        this.close();
    },
    nextChance : function() {
        if(this.chances > 0){
            CWTween.to(this,.5, {}, {onComplete : this.checkForNextChance.bind(this)});
            if(this.chances > 0 && this.chances <4)
            {
                CWTween.to(this.noOfChancesRemainingRight,.2, {scaleX:1.2,scaleY:1.2}, {reverse:true});
                CWTween.to(this.noOfChancesRemainingLeft,.2, {scaleX:1.2,scaleY:1.2}, {reverse:true});

            }
        }
        else{
            CWTween.to(this.scoreText,.5, {x:320,y:500,scaleX:1.5,scaleY:1.5}, {onComplete : this.mainScoreAnimation.bind(this)});
        }
    },
    mainScoreAnimation : function(){
      //  CWTween.to(this.mGameObject.mGameClassObject.miniGameScoreText,.5, {y:320,x:500}, {onComplete : null});
        CWTween.to(this,.1, {}, {delay:1,onComplete : this.closeMiniGame.bind(this)});
    },

    checkForNextChance : function() {
        this.noOfChancesRemainingRight.setSpriteIndex(this.chances-1);
        this.noOfChancesRemainingLeft.setSpriteIndex(this.chances-1);
        this.tgeStriker = this.addChild(new TGE.Sprite().setup({image: 'striker', x: 320, y: 800}));
    }
};
extend(MiniGame, TGE.Window);