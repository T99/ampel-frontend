/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:32 PM -- November 28th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeafType from "../jui-content-leaf-type.js";

/**
 * Enumerates possible text leaf types.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
enum JUITextLeafType {
	
	H1 = JUIContentLeafType.H1,
	H2 = JUIContentLeafType.H2,
	H3 = JUIContentLeafType.H3,
	H4 = JUIContentLeafType.H4,
	H5 = JUIContentLeafType.H5,
	H6 = JUIContentLeafType.H6,
	P = JUIContentLeafType.P
	
}

export default JUITextLeafType;