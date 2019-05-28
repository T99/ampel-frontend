/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:30 PM -- May 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIInputType from "./jui-input-type.js";

/**
 * Enumerates different types of textual inputs alongside descriptions of the given type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITextualInputType extends JUIInputType {
	
	public static readonly EMAIL:		JUITextualInputType = new JUITextualInputType("email");
	public static readonly NUMERIC:		JUITextualInputType = new JUITextualInputType("number");
	public static readonly PASSWORD:	JUITextualInputType = new JUITextualInputType("password");
	public static readonly PLAIN:		JUITextualInputType = new JUITextualInputType("text");
	public static readonly PHONE:		JUITextualInputType = new JUITextualInputType("tel");
	
	private constructor(typeString: string) {
	
		super(typeString);
	
	}
	
}

export default JUITextualInputType;