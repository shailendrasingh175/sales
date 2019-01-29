
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 9/4/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */


GameModel = function () {
    // level unlocked (current level)
    this.mLevelUnlocked = 1;


    // XP count
    this.xp = 0;

    // credits count
    this.credits = 10000;

    this.dailyBonusAmount = 0;

    // badge unlocked states
    this.badgeUnlockedArray = [0, 0, 0, 0, 0, 0];

    // tutorial show once for each special symbol
    this.wildTutorialShown = false;
    this.scatterTutorialShown = false;
    this.bonusTutorialShown = false;

    // boost used array
    this.boostUsedArray = [0, 0, 0];

    // boost buy states
    this.boostBuyArray = [0, 0, 0];

};


