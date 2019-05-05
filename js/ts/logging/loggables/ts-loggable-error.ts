/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:58 PM -- April 17th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSLoggable from "../ts-loggable.js";
import TSLoggableSourcePair from "../ts-loggable-source-pair.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLoggableError implements TSLoggable {
	
	private source: TSLoggableSourcePair;
	private errorName: string;
	private errorDescription: string;
	
	public constructor(stringSource: string,
					   objectSource: any,
					   errorName: string,
					   errorDescription: string) {
	
		this.source = { stringSource, objectSource };
		this.errorName = errorName;
		this.errorDescription = errorDescription;
	
	}
	
	public getLoggableTitle(): string {
		
		return ("ERR: " + this.errorName);
		
	}
	
	public getDescription(): string {
		
		return this.errorDescription;
		
	}
	
	public getSource(): TSLoggableSourcePair {
		
		return this.source;
		
	}
	
	public log(recurse?: boolean): void {
		
		let e: Error = new Error("Error!");
		console.log(e);
		
	}
	
}

export default TSLoggableError;