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
enum JUIAlignment {
	
	/**
	 * Aligns content to the upper left-hand corner.
	 */
	UPPER_LEFT = "jui-alignment-upper-left",
	
	/**
	 * Aligns content to the top (horizontally centered).
	 */
	TOP = "jui-alignment-top",
	
	/**
	 * Aligns content to the upper right-hand corner.
	 */
	UPPER_RIGHT = "jui-alignment-upper-right",
	
	/**
	 * Aligns content to the left (vertically centered).
	 */
	LEFT = "jui-alignment-left",
	
	/**
	 * Aligns content to the vertical and horizontal center.
	 */
	CENTER = "jui-alignment-center",
	
	/**
	 * Aligns content to the right (vertically centered).
	 */
	RIGHT = "jui-alignment-right",
	
	/**
	 * Aligns content to the lower left-hand corner.
	 */
	LOWER_LEFT = "jui-alignment-lower-left",
	
	/**
	 * Aligns content to the bottom (horizontally centered).
	 */
	BOTTOM = "jui-alignment-bottom",
	
	/**
	 * Aligns content to the lower right-hand corner.
	 */
	LOWER_RIGHT = "jui-alignment-lower-right"
	
}

export default JUIAlignment;