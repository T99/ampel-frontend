/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:32 PM -- April 10th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSDate from "./descriptors/time/ts-date.js";
import AFSession from "./af-structures/af-session.js";
import TSLogger from "./logging/ts-logger.js";

/**
 * Holds a number of managers and misc. objects related to a singular session.
 *
 * Used in place of errant singleton patterns.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBrowserSession {
	
	private startTime: TSDate;
	
	private ampelSession: AFSession;
	
	private logger: TSLogger;
	
	private developerMode: boolean;
	
	public constructor(developerMode: boolean = false) {
		
		this.developerMode = developerMode;
		
		this.startTime = TSDate.fromNow();
		this.ampelSession = new AFSession(developerMode);
		this.logger = new TSLogger(developerMode);
	
	}
	
	public getStartTime(): TSDate {
		
		return this.startTime;
		
	}
	
	public hasAmpelSession(): boolean {
		
		return (this.ampelSession !== undefined);
		
	}
	
	public getAmpelSession(): AFSession {
		
		return this.ampelSession;
		
	}
	
	public getLogger(): TSLogger {
		
		return this.logger;
		
	}
	
}

export default TSBrowserSession;