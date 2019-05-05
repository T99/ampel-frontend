/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:49 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFResponseObject from "../af-response-object.js";
import AFValueReadablePair from "../af-value-readable-pair.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFQuestionResponseStructure extends AFResponseObject {
	
	readonly inquiry: string;
	
	readonly organizationId: string;
	
	readonly type: AFValueReadablePair;
	
	readonly options?: { [id: string]: string };
	
}

export default AFQuestionResponseStructure;