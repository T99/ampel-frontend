/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:37 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFValueReadablePair from "./af-value-readable-pair.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFResponseObject {
	
	readonly id: string;
	
	readonly createdAt: AFValueReadablePair;
	
	readonly updatedAt: AFValueReadablePair;
	
}

export default AFResponseObject;