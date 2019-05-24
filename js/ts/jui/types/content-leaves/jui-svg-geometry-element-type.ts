/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:34 PM -- May 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeafType from "./jui-content-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGGeometryElementType extends JUIContentLeafType<SVGGeometryElement> {
	
	public static readonly CIRCLE:		JUISVGGeometryElementType = new JUISVGGeometryElementType("circle");
	public static readonly LINE:		JUISVGGeometryElementType = new JUISVGGeometryElementType("line");
	public static readonly PATH:		JUISVGGeometryElementType = new JUISVGGeometryElementType("path");
	public static readonly POLYGON:		JUISVGGeometryElementType = new JUISVGGeometryElementType("polygon");
	public static readonly RECT:		JUISVGGeometryElementType = new JUISVGGeometryElementType("rect");
	public static readonly TEXT:		JUISVGGeometryElementType = new JUISVGGeometryElementType("text");
	public static readonly TEXTPATH:	JUISVGGeometryElementType = new JUISVGGeometryElementType("textpath");
	
	private constructor(elementTag: string) {
		
		super((): SVGGeometryElement => document.createElementNS("http://www.w3.org/2000/svg", elementTag) as unknown as SVGGeometryElement);
		
	}
	
}

export default JUISVGGeometryElementType;