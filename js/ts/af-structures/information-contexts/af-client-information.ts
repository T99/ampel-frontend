/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:42 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClient from "../structures/af-client.js";

/**
 * An interface for any information whose context includes an {@link AFClient}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFClientInformation {
	
	/**
	 * Returns the {@link AFClient} to whom this information belongs.
	 * 
	 * @returns {AFClient} The AFClient to whom this information belongs.
	 */
	getClient(): AFClient;
	
}

export default AFClientInformation;