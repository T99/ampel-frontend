/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:08 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates possible alignment options. All of these options can be represented as the options of a 9x9 grid.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
var JUIAlignment;
(function (JUIAlignment) {
    /**
     * Aligns content to the upper left-hand corner.
     */
    JUIAlignment["UPPER_LEFT"] = "jui-alignment-upper-left";
    /**
     * Aligns content to the top (horizontally centered).
     */
    JUIAlignment["TOP"] = "jui-alignment-top";
    /**
     * Aligns content to the upper right-hand corner.
     */
    JUIAlignment["UPPER_RIGHT"] = "jui-alignment-upper-right";
    /**
     * Aligns content to the left (vertically centered).
     */
    JUIAlignment["LEFT"] = "jui-alignment-left";
    /**
     * Aligns content to the vertical and horizontal center.
     */
    JUIAlignment["CENTER"] = "jui-alignment-center";
    /**
     * Aligns content to the right (vertically centered).
     */
    JUIAlignment["RIGHT"] = "jui-alignment-right";
    /**
     * Aligns content to the lower left-hand corner.
     */
    JUIAlignment["LOWER_LEFT"] = "jui-alignment-lower-left";
    /**
     * Aligns content to the bottom (horizontally centered).
     */
    JUIAlignment["BOTTOM"] = "jui-alignment-bottom";
    /**
     * Aligns content to the lower right-hand corner.
     */
    JUIAlignment["LOWER_RIGHT"] = "jui-alignment-lower-right";
})(JUIAlignment || (JUIAlignment = {}));
export default JUIAlignment;
//# sourceMappingURL=jui-alignment.js.map