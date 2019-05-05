/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:09 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIWorld from "../../jui/jui-world.js";
import AUIContactCapturePage from "../pages/contact-capture/aui-contact-capture-page.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIContactCaptureConfiguration {
	
	public constructor() { /* Do nothing. */ }
	
	public async make(): Promise<void> {
		
		JUIWorld.getInstance().setPage(new AUIContactCapturePage());
		
	}
	
}

export default AUIContactCaptureConfiguration;