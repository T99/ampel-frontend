/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:45 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganization from "../structures/af-organization.js";

/**
 * An interface for any information whose context includes an {@link AFOrganization}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFOrganizationInformation {
	
	/**
	 * Returns the {@link AFOrganization} to whom this information belongs.
	 *
	 * @returns {AFOrganization} The AFOrganization to whom this information belongs.
	 */
	getOrganization(): AFOrganization;
	
}

export default AFOrganizationInformation;