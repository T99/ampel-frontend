/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:18 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeafType from "../jui-content-leaf-type.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
enum JUISVGGeometryType {
	
	CIRCLE = JUIContentLeafType.CIRCLE,
	LINE = JUIContentLeafType.LINE,
	PATH = JUIContentLeafType.PATH,
	POLYGON = JUIContentLeafType.POLYGON,
	RECT = JUIContentLeafType.RECT,
	TEXT = JUIContentLeafType.TEXT,
	TEXTPATH = JUIContentLeafType.TEXTPATH
	
}

export default JUISVGGeometryType;