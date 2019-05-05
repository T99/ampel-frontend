/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:21 AM -- November 08th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElementType from "./jui-element-type.js";

/**
 * Enumerates possible container types.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
enum JUIContainerType {
	
	DIV = JUIElementType.DIV,
	FOOTER = JUIElementType.FOOTER,
	HEADER = JUIElementType.HEADER,
	MAIN = JUIElementType.MAIN
	
}

export default JUIContainerType;