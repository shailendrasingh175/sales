
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 9/4/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */


TGSModel = function () {
    this.gameModel = TGE.Game.GetInstance().gameModel;
    this.prevDate = 0;
    this.init();
    return this;
};
TGSModel.prototype = {
    init: function () {
        if (GameConfig.TGS.ENABLED) {
            TGS.DataStore.onDataChanged = this.onDatastoreUpdated.bind(this);

        }
        this.onDatastoreUpdated();
    },

    onDatastoreUpdated: function () {

        if (!GameConfig.TGS.ENABLED || !TGS.DatastoreSupported()) {
            return
        }
        this.loadTGSVars();
    },


    loadTGSVars: function () {

        this.gameModel.credits = TGS.DataStore.FetchIntValue("credits", this.gameModel.credits);
        this.gameModel.xp = TGS.DataStore.FetchIntValue("xp", this.gameModel.xp);
        this.gameModel.mLevelUnlocked = TGS.DataStore.FetchIntValue("unlockedLevel", this.gameModel.mLevelUnlocked);
        var badgeUnlockedString = TGS.DataStore.FetchStringValue("badgeUnlocked", this.gameModel.badgeUnlockedArray + "");
        this.gameModel.badgeUnlockedArray = badgeUnlockedString.split(",").map(Number);
        var boostUsedString = TGS.DataStore.FetchStringValue("boostUsed", this.gameModel.boostUsedArray + "");
        this.gameModel.boostUsedArray = boostUsedString.split(",").map(Number);
        var boostBuyString = TGS.DataStore.FetchStringValue("boostBuyStates", this.gameModel.boostBuyArray + "");
        this.gameModel.boostBuyArray = boostBuyString.split(",").map(Number);
        this.gameModel.wildTutorialShown = TGS.DataStore.FetchStringValue("wildTutorialShown", this.gameModel.wildTutorialShown);
        this.gameModel.scatterTutorialShown = TGS.DataStore.FetchStringValue("scatterTutorialShown", this.gameModel.scatterTutorialShown);
        this.gameModel.bonusTutorialShown = TGS.DataStore.FetchStringValue("bonusTutorialShown", this.gameModel.bonusTutorialShown);

        //this.data = TGS.Microtransactions.GetIAPProducts();
    },

    saveDataAsString: function (key, value) {

        if (!GameConfig.TGS.ENABLED || !TGS.DatastoreSupported()){
            return;
        }

        var object = {};
        object[key] = value;
        TGS.DataStore.SaveValues(object);
    },

    onFailure: function () {
        TGE.log("Fail...");
    }
};


