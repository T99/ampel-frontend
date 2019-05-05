/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:45 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUISubscription from "./jui-subscription.js";
/**
 * A source for notifications (events) that are distributed to multiple {@link JUISubscription}s (event handlers).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINotifier {
    constructor() {
        this.filters = [];
        this.subscriptions = [];
    }
    notify(notification) {
        // Check to make sure that the filters in place aren't going to reject the notification.
        for (let filter of this.filters)
            if (!filter.test(notification))
                return;
        // Notify all of the Subscriptions.
        for (let subscription of this.subscriptions)
            subscription.handleNotification(notification);
    }
    filter(filter) {
        this.filters.push(filter);
    }
    subscribe(handler) {
        let subscription = new JUISubscription(this, handler);
        this.subscriptions.push(subscription);
        return subscription;
    }
    unsubscribe(subscription) {
        let indexOf = this.subscriptions.indexOf(subscription);
        if (indexOf > -1)
            this.subscriptions.splice(indexOf, 1);
    }
    subscriptionCount() {
        return this.subscriptions.length;
    }
}
export default JUINotifier;
//# sourceMappingURL=jui-notifier.js.map