/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:50 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A class designed to handle timeout-driven actions.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTimeoutHandler<E = any> {
	
	private readonly timeoutMs: number;
	
	private readonly timeoutAction: () => E;
	
	private timeoutID: number;
	
	private timeoutPromise: Promise<E>;
	
	private timeoutPromiseResolve: (timeoutActionReturnValue: E) => void;
	
	private hasTimedOut: boolean;
	
	public constructor(timeoutMs: number, timeoutAction: () => E, startUponInstantiation: boolean = true) {
		
		this.timeoutMs = timeoutMs;
		this.timeoutAction = timeoutAction;
		this.hasTimedOut = false;
		
		if (startUponInstantiation) this.startTimeout();
		
	}
	
	public async startTimeout(): Promise<E> {
		
		if (!this.hasStarted()) {
			
			this.timeoutPromise = new Promise<E>((resolve: (timeoutActionReturnValue: E) => void): void => {
				
				this.timeoutPromiseResolve = resolve;
				
				this.timeoutID = setTimeout((): any => this.timeout(), this.timeoutMs);
				
			});
			
		}
		
		return this.timeoutPromise;
		
	}
	
	public restartTimeout(): void {
		
		this.reset();
		this.startTimeout();
		
	}
	
	public cancelTimeout(): void {
		
		clearTimeout(this.timeoutID);
		
	}
	
	public timeout(): E {
		
		if (this.hasStarted() && !this.hasTimedOut) {
			
			this.hasTimedOut = true;
			
			clearTimeout(this.timeoutID);
			
			let timeoutActionResult: E = this.timeoutAction();
			
			this.timeoutPromiseResolve(timeoutActionResult);
			
			return timeoutActionResult;
			
		} else return undefined;
		
	}
	
	public hasStarted(): boolean {
	
		return (this.timeoutID !== undefined);
	
	}
	
	public reset(): void {
		
		this.cancelTimeout();
		
		this.timeoutID = undefined;
		this.timeoutPromise = undefined;
		this.hasTimedOut = false;
		
	}
	
}

export default TSTimeoutHandler;