
/**
 * Team: CW Studio
 * Developer: Aadarsh.S
 * Developer: Amit.K
 * Developer: Supriya.G
 * Date: 10/18/13
 * Time: 6:45 PM
 */

CustomDepressedButton = function () {
    CustomDepressedButton.superclass.constructor.call(this);
    this.mButtonClicked = false;
    this.addEventListener("mousedown", this.MouseDown.bind(this));
    this.addEventListener("mouseup", this.MouseUp.bind(this));
};

CustomDepressedButton.prototype = {

    setup: function (params) {
        TGE.Button.superclass.setup.call(this, params);
        this._mCallback = params.pressFunction;
        return this;
    },

    MouseDown: function () {
        if (!this.mButtonClicked) {
            this.mButtonClicked = true;
            CWTween.to(this, 0.01, {scaleX: 0.9, scaleY: 0.9}, {});
        }
    },

    MouseUp: function () {
        if (this.mButtonClicked) {
            CWTween.to(this, 0.01, {scaleX: 1, scaleY: 1}, {onComplete: this.mPressFunction.bind(this)});
        }
    },

    mPressFunction: function () {
        this.mButtonClicked = false;
        this._mCallback();
    }
};
extend(CustomDepressedButton, TGE.Button);