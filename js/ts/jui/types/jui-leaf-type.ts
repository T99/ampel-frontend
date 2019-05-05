/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:30 PM -- November 28th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates possible leaf types.
 *
 * @see JUILeaf
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
import JUIElementType from "./jui-element-type.js";

enum JUILeafType {
	
	AUDIO = JUIElementType.AUDIO,
	CANVAS = JUIElementType.CANVAS,
	CIRCLE = JUIElementType.CIRCLE,
	G = JUIElementType.G,
	H1 = JUIElementType.H1,
	H2 = JUIElementType.H2,
	H3 = JUIElementType.H3,
	H4 = JUIElementType.H4,
	H5 = JUIElementType.H5,
	H6 = JUIElementType.H6,
	IMG = JUIElementType.IMG,
	INPUT = JUIElementType.INPUT,
	LINE = JUIElementType.LINE,
	P = JUIElementType.P,
	PATH = JUIElementType.PATH,
	POLYGON = JUIElementType.POLYGON,
	PROGRESS = JUIElementType.PROGRESS,
	RECT = JUIElementType.RECT,
	SVG = JUIElementType.SVG,
	TEXT = JUIElementType.TEXT,
	TEXTAREA = JUIElementType.TEXTAREA,
	TEXTPATH = JUIElementType.TEXTPATH,
	VIDEO = JUIElementType.VIDEO
	
}

export default JUILeafType;