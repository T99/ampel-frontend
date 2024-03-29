/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:15 AM -- December 17th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates the possible content wrapping options.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
enum JUIFlexWrappingRule {
	
	/**
	 * Does not wrap content (content will all be on a single row/column, depending on what 'flex-direction' is set to).
	 */
	NO_WRAP = "jui-flex-wrapping-rule-no-wrap",
	
	/**
	 * Wraps content onto either a column to the left of the current column, or a row below the current row depending on
	 * what 'flex-direction' is set to.
	 */
	WRAP = "jui-flex-wrapping-rule-wrap",
	
	/**
	 * Wraps content onto either a column to the right of the current column, or a row above the current row depending
	 * on what 'flex-direction' is set to.
	 */
	WRAP_REVERSE = "jui-flex-wrapping-rule-wrap-reverse"
	
}

export default JUIFlexWrappingRule;