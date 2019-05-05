/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:26 PM -- April 29th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFActivity from "./af-activity.js";
import AUIKioskThankYouPage from "../aui/pages/thank-you/aui-kiosk-thank-you-page.js";
import AUIContactCapturePage from "../aui/pages/contact-capture/aui-contact-capture-page.js";
import AUIKioskPage from "../aui/pages/kiosk/aui-kiosk-page.js";

/**
 * An AUI activity that involves starting with contact capture and then providing optional feedback afterwards.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFCCToKioskActivity implements AFActivity {
	
	private currentPage: string;
	
	private contactCapturePage: AUIContactCapturePage;
	
	private kioskPage: AUIKioskPage;
	
	private thankYouPage: AUIKioskThankYouPage
	
	public constructor() {
	
	
	
	}
	
	public start(): void {
	
	
	
	}
	
}

export default AFCCToKioskActivity;