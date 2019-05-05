/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:42 AM -- February 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFLocation from "../structures/af-location.js";

/**
 * An interface for any information whose context includes an {@link AFLocation}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AfLocationInformation {
	
	/**
	 * Returns the {@link AFLocation} to which this information belongs.
	 *
	 * @returns {AFLocation} The AFLocation to which this information belongs.
	 */
	getLocation(): AFLocation;
	
}

export default AfLocationInformation;