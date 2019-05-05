/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:06 PM -- April 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSLoggableSourcePair from "./ts-loggable-source-pair.js";

/**
 * An interface for loggable objects.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface TSLoggable {
	
	getLoggableTitle(): string;
	
	getSource(): TSLoggableSourcePair;
	
	getDescription?(): string;
	
	log(recurse?: boolean): void;
	
}

export default TSLoggable;