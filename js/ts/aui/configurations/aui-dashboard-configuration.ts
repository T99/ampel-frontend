/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:34 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIWorld from "../../jui/jui-world.js";
import AUIDashboardPage from "../dashboard/aui-dashboard-page.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIDashboardConfiguration {
	
	public constructor() { /* Do nothing. */ }
	
	public make(): void {
		
		console.log("Making configuration: AUIDashboardConfiguration");
		
		let page: AUIDashboardPage = new AUIDashboardPage();
		
		JUIWorld.getInstance().setPage(page);
		
	}
	
}

export default AUIDashboardConfiguration;