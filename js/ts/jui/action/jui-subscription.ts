/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:55 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "./jui-notifier.js";
import JUINotificationFilter from "./jui-notification-filter.js";

/**
 * An endpoint for notifications (events) that are distributed from a given {@link JUINotifier}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISubscription<E> {
	
	private notifier: JUINotifier<E>;
	private filters: Array<JUINotificationFilter<E>> = [];
	private readonly handler: (notification: E) => void;
	
	public constructor(notifier: JUINotifier<E>, handler: (notification: E) => void) {
		
		this.notifier = notifier;
		this.handler = handler;
		
	}
	
	public filter(filter: JUINotificationFilter<E>): void {
		
		this.filters.push(filter);
		
	}
	
	public handleNotification(notification: E): void {
		
		// Check to make sure that the filters in place aren't going to reject the notification.
		for (let filter of this.filters) if (!filter.test(notification)) return;
		
		// Handle the notification.
		this.handler(notification);
		
	}
	
	public unsubscribe(): boolean {
		
		if (this.notifier) {
			
			this.notifier.unsubscribe(this);
			this.notifier = null;
			return true;
			
		} else return false;
		
	}
	
}

export default JUISubscription;