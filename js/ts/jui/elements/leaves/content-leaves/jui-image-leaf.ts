/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:48 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContentLeaf from "../jui-content-leaf.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";
import JUIImageLeafType from "../../../types/leaves/content-leaves/jui-image-leaf-type.js";

/**
 * A {@link JUIElement} that displays an image.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIImageLeaf extends JUIContentLeaf<HTMLImageElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-image-leaf";
	
	// DOC-ME [12/14/18 @ 9:51 AM] - Documentation required!
	public constructor(imageURI: string) {
		
		super(JUIImageLeafType.IMG.toString() as unknown as JUIContentLeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setSource(imageURI);
		
	}
	
	// DOC-ME [12/14/18 @ 4:23 PM] - Documentation required!
	public setSource(imageURI: string): void {
		
		this.getHTMLElement().src = imageURI;
		
	}
	
}

export default JUIImageLeaf;