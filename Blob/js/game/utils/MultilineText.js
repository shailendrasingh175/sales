

TGE.MultilineText = function () {
    TGE.MultilineText.superclass.constructor.call(this);

    // Public members
    this.text = "";
    this.font = "12px Arial";
    this.hAlign = "center";
    this.vAlign = "middle";
    this.textColor = "#000";

    this.textShadow = "0px 0px 0px rgba(255, 255, 255, 1)";

    this.registrationX = this.width * 0.5;
    this.registrationY = this.height * 0.5;

    // Private members
    this._mPreviousText = null;
    this._mPreviousFont = null;

    return this;
};


TGE.MultilineText.prototype =
{
    /**
     * The setup method can be used initialize multiple parameters of an object with a single call. The setup method travels up the class hierarchy, so any properties that can be set in superclasses can be included in this param object as well.
     * @param {Object} params Information used to initialize the object.
     * @param {Number} [params.numStates] The number of states represented in the button image. The states must be defined in the following order: idle, hover, down, disable.
     * @param {String} [params.text] The text to be displayed.
     * @param {String} [params.font] Indicates the font and style used for rendering the text. The string must be defined in the following sequence: formatting + font size + font name. For example, "10px Arial", "bold italic 28px Tahoma", etc.
     * @param {String} [params.hAlign] Indicates the desired horizontal alignment of the text. Accepted values are "left", "center", and "right".
     * @param {String} [params.vAlign] Indicates the desired vertical alignment of the text. Accepted values are "top", "middle", and "down".
     * @param {String} [params.color] The color to apply to the text. Accepts standard html font color attribute styles, ie: "red", "#f00", "#ff0000", "rgb(255,0,0)", etc.
     * @return {TGE.Text} Returns this object.
     */
    setup: function (params) {
        TGE.MultilineText.superclass.setup.call(this, params);

        typeof(params.text) === "string" ? this.text = params.text : null;
        typeof(params.font) === "string" ? this.font = params.font : null;
        typeof(params.hAlign) === "string" ? this.hAlign = params.hAlign : null;
        typeof(params.vAlign) === "string" ? this.vAlign = params.vAlign : null;
        typeof(params.color) === "string" ? this.textColor = params.color : null;

        this.textArray = params.text.split("\n");

        return this;
    },

    /** @ignore */
    _calculateDimensions: function (canvasContext) {
        canvasContext.save();

        canvasContext.font = this.font;
        var textDimensions = canvasContext.measureText(this.text);
        this.width = textDimensions.width;

        // Determine the height (this is not accurate - but it's not critical anyways)
        try {
            var pos = this.font.indexOf("px");
            var ss = this.font.substring(0, pos).replace(/[^\d.]/g, '');
            this.height = parseInt(ss, 10);
            this.height += (this.height / 4) >> 0;
        }
        catch (e) {
            this.height = 30;
        }

        canvasContext.restore();
    },

    /** @ignore */
    _drawClass: function (canvasContext) {
        // Anything to draw?
        if (this.text === null) {
            return;
        }

        // If the font or text changed, recalculate the dimensions
        if (this._mPreviousText !== this.text || this._mPreviousFont !== this.font) {
            this.textArray = this.text.split("\n");
            this._mPreviousText = this.text;
            this._mPreviousFont = this.font;
            this._calculateDimensions(canvasContext);
        }

        // Load the text properties
        canvasContext.font = this.font !== null ? this.font : "Arial";
        canvasContext.textAlign = this.hAlign !== null ? this.hAlign : "center";
        canvasContext.textBaseline = this.vAlign !== null ? this.vAlign : "middle";
        canvasContext.fillStyle = this.textColor !== null ? this.textColor : "#000";
//        this.setShadow(canvasContext);

        var padding = 0;

        for (var i in this.textArray) {
            canvasContext.fillText(this.textArray[i], 0, padding);
            padding += this.height;
        }
        // Draw the text
        //canvasContext.fillText(this.text,0,0);
    },

    setShadow: function (ctx, color, ox, oy, blur) {
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = true;
        //return [color, ox, oy, blur].join(", ");
    }
};
extend(TGE.MultilineText, TGE.DisplayObjectContainer);