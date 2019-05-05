/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:16 PM -- November 30th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates possible content leaf types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
import JUILeafType from "../jui-leaf-type.js";

enum JUIContentLeafType {
	
	AUDIO = JUILeafType.AUDIO,
	CANVAS = JUILeafType.CANVAS,
	CIRCLE = JUILeafType.CIRCLE,
	H1 = JUILeafType.H1,
	H2 = JUILeafType.H2,
	H3 = JUILeafType.H3,
	H4 = JUILeafType.H4,
	H5 = JUILeafType.H5,
	H6 = JUILeafType.H6,
	IMG = JUILeafType.IMG,
	LINE = JUILeafType.LINE,
	P = JUILeafType.P,
	PATH = JUILeafType.PATH,
	POLYGON = JUILeafType.POLYGON,
	PROGRESS = JUILeafType.PROGRESS,
	RECT = JUILeafType.RECT,
	SVG = JUILeafType.SVG,
	TEXT = JUILeafType.TEXT,
	TEXTPATH = JUILeafType.TEXTPATH,
	VIDEO = JUILeafType.VIDEO
	
}

export default JUIContentLeafType;