/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:49 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../jui-element.js";
import JUIContentLeafType from "../../../types/element-types/content-leaves/jui-content-leaf-type.js";

/**
 * A {@link JUIElement} that plays audio in some capacity.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIAudioLeaf extends JUIElement<HTMLAudioElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-audio-leaf";
	
	// DOC-ME [12/14/18 @ 9:40 AM] - Documentation required!
	public constructor() {
		
		super(JUIContentLeafType.AUDIO);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIAudioLeaf;