/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:30 PM -- November 02nd, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIOverlay from "./jui-overlay.js";
import JUIAlignment from "../descriptors/jui-alignment.js";
import JUIDirection from "../descriptors/jui-direction.js";
import JUIUnit from "../descriptors/units/jui-unit.js";

// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
class JUIModal extends JUIOverlay {
	
	// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
	private titleText: string;
	
	// DOC-ME [12/8/18 @ 4:54 PM] - Documentation required!
	public constructor(height: JUIUnit, width: JUIUnit, headerText: string, alignment: JUIAlignment,
					   direction?: JUIDirection) {
		
		super(alignment, direction);
		this.titleText = headerText;
		
	}
	
}

export default JUIModal;