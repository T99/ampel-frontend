/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:21 PM -- April 20th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFSession from "../af-session.js";

/**
 * An interface for any information whose context includes an {@link AFSession}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFSessionInformation {
	
	/**
	 * Returns the {@link AFSession} to whom this information belongs.
	 *
	 * @returns {AFSession} The AFSession to whom this information belongs.
	 */
	getSession(): AFSession;
	
}

export default AFSessionInformation;