/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIElement } from "../../jui-element.js";
import JUIContentLeafType from "../../../types/element-types/content-leaves/jui-content-leaf-type.js";

class JUIVideoLeaf extends JUIElement<HTMLVideoElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-video-leaf";
	
	public constructor() {
		
		super(JUIContentLeafType.VIDEO);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default JUIVideoLeaf;