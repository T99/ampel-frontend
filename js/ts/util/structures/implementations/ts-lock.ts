/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:33 AM -- March 14th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../../jui/action/jui-notifier.js";
import JUISubscription from "../../../jui/action/jui-subscription.js";

/**
 * An object-based lock.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSLock {
	
	private relinquishNotifier: JUINotifier<void>;
	
	public constructor() {
		
		this.relinquishNotifier = new JUINotifier<void>();
		
	}
	
	public relinquish(): void {
		
		this.relinquishNotifier.notify();
		
	}
	
	public subscribeToRelinquishNotifier(handler: () => void): JUISubscription<void> {
		
		return this.relinquishNotifier.subscribe(handler);
		
	}
	
}

export default TSLock;