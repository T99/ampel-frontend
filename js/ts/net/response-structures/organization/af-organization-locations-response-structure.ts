/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:41 AM -- February 08th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganizationResponseStructure from "../common/af-organization-response-structure.js";
import AFLocationResponseStructure from "../common/af-location-response-structure.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFOrganizationLocationsResponseStructure extends AFOrganizationResponseStructure {
	
	readonly locations: ReadonlyArray<AFLocationResponseStructure>;
	
}

export default AFOrganizationLocationsResponseStructure;