/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:03 PM -- May 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElementType from "./jui-element-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIContainerType extends JUIElementType<HTMLElement> {
	
	public static readonly DIV:		JUIContainerType	= new JUIContainerType("div");
	public static readonly FOOTER:	JUIContainerType	= new JUIContainerType("footer");
	public static readonly HEADER:	JUIContainerType	= new JUIContainerType("header");
	public static readonly MAIN:	JUIContainerType	= new JUIContainerType("main");
	public static readonly NAV:		JUIContainerType	= new JUIContainerType("nav");
	
	private constructor(elementTag: string) {
		
		super(JUIElementType.getPlainElementFactoryMethod(elementTag));
	
	}
	
}

export default JUIContainerType;