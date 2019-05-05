/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:45 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISubscription from "./jui-subscription.js";
import JUINotificationFilter from "./jui-notification-filter.js";
import JUINotifierSource from "./events/sources/jui-notifier-source.js";

/**
 * A source for notifications (events) that are distributed to multiple {@link JUISubscription}s (event handlers).
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINotifier<E = any> {
	
	private filters: Array<JUINotificationFilter<E>> = [];
	private readonly subscriptions: Array<JUISubscription<E>> = [];
	
	public constructor() { /* Do nothing. */ }
	
	public notify(notification: E): void {
		
		// Check to make sure that the filters in place aren't going to reject the notification.
		for (let filter of this.filters) if (!filter.test(notification)) return;
		
		// Notify all of the Subscriptions.
		for (let subscription of this.subscriptions) subscription.handleNotification(notification);
		
	}
	
	public filter(filter: JUINotificationFilter<E>): void {
		
		this.filters.push(filter);
		
	}
	
	public subscribe(handler: (notification: E) => void): JUISubscription<E> {
		
		let subscription: JUISubscription<E> = new JUISubscription<E>(this, handler);
		
		this.subscriptions.push(subscription);
		
		return subscription;
		
	}
	
	public unsubscribe(subscription: JUISubscription<E>): void {
		
		let indexOf: number = this.subscriptions.indexOf(subscription);
		if (indexOf > -1) this.subscriptions.splice(indexOf, 1);
		
	}
	
	public subscriptionCount(): number {
		
		return this.subscriptions.length;
		
	}
	
}

export default JUINotifier;