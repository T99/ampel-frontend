/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:29 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates possible directions.
 * Used in various places, such as for content flow ({@link JUIFlowContainer}), or for TODO
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
var JUIDirection;
(function (JUIDirection) {
    /**
     * Describes a direction that originates at the 'bottom' and terminates at the 'top'.
     */
    JUIDirection["TO_TOP"] = "jui-direction-to-top";
    /**
     * Describes a direction that originates at the 'top' and terminates at the 'bottom'.
     */
    JUIDirection["TO_BOTTOM"] = "jui-direction-to-bottom";
    /**
     * Describes a direction that originates at the 'left' and terminates at the 'right'.
     */
    JUIDirection["TO_RIGHT"] = "jui-direction-to-right";
    /**
     * Describes a direction that originates at the 'right' and terminates at the 'left'.
     */
    JUIDirection["TO_LEFT"] = "jui-direction-to-left";
})(JUIDirection || (JUIDirection = {}));
export default JUIDirection;
//# sourceMappingURL=jui-direction.js.map