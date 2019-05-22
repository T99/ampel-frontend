/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:26 PM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A node within a {@link TSLockingQueue}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLockingQueueNode {
	
	private readyPromise: Promise<void>;
	
	private readyPromiseResolver: () => void;
	
	public constructor() {
		
		this.readyPromise = new Promise<void>((resolve: () => void): void => {
			
			this.readyPromiseResolver = resolve;
			
		});
		
	}
	
	public getReadyPromise(): Promise<void> {
		
		return this.readyPromise;
		
	}
	
	public readyUp(): void {
		
		this.readyPromiseResolver();
		
	}
	
}

export default TSLockingQueueNode;