/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:08 PM -- February 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIWorld from "./jui/jui-world.js";
import AUISplashPage from "./aui/splash/aui-splash-page.js";

type StartingPointEnumeration = { [ startingPoint: string ]: number };

/**
 * The program entry-point for Ampel Feedback's online web-app.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDashboard {
	
	private static instance: AFDashboard;
	
	private constructor() { /* Do nothing. */ }
	
	public static async go(): Promise<AFDashboard> {
		
		if (AFDashboard.instance === undefined) {
			
			AFDashboard.instance = new AFDashboard();
			
			await AFDashboard.instance.readyPage();
			await AFDashboard.instance.generatePage();
			
		}
		
		return AFDashboard.instance;
		
	}
	
	private async readyPage(): Promise<void> {
		
		// Removes any straggling elements from the body.
		while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
		
		// Makes the <html> and <body> elements inaccessible via the Tab key.
		document.documentElement.tabIndex = -1;
		document.body.tabIndex = -1;
		
	}
	
	private async generatePage(): Promise<void> {
		
		// TODO [2/11/19 @ 10:35 PM] - Make this method more dynamic (should work with the session manager).
		JUIWorld.getInstance().setPage(new AUISplashPage());
		
	}
	
}

export default AFDashboard;