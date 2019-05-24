/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:29 PM -- May 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeafType from "./jui-content-leaf-type.js";
import JUIElementType from "../jui-element-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextLeafType extends JUIContentLeafType<HTMLElement> {
	
	public static readonly H1:	JUITextLeafType = new JUITextLeafType("h1");
	public static readonly H2:	JUITextLeafType = new JUITextLeafType("h2");
	public static readonly H3:	JUITextLeafType = new JUITextLeafType("h3");
	public static readonly H4:	JUITextLeafType = new JUITextLeafType("h4");
	public static readonly H5:	JUITextLeafType = new JUITextLeafType("h5");
	public static readonly H6:	JUITextLeafType = new JUITextLeafType("h6");
	public static readonly P:	JUITextLeafType = new JUITextLeafType("p");
	
	private constructor(elementTag: string) {
		
		super(JUIElementType.getPlainElementFactoryMethod(elementTag));
		
	}
	
}

export default JUITextLeafType;