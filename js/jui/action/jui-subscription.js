/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:55 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * An endpoint for notifications (events) that are distributed from a given {@link JUINotifier}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISubscription {
    constructor(notifier, handler) {
        this.filters = [];
        this.notifier = notifier;
        this.handler = handler;
    }
    filter(filter) {
        this.filters.push(filter);
    }
    handleNotification(notification) {
        // Check to make sure that the filters in place aren't going to reject the notification.
        for (let filter of this.filters)
            if (!filter.test(notification))
                return;
        // Handle the notification.
        this.handler(notification);
    }
    unsubscribe() {
        if (this.notifier) {
            this.notifier.unsubscribe(this);
            this.notifier = null;
            return true;
        }
        else
            return false;
    }
}
export default JUISubscription;
//# sourceMappingURL=jui-subscription.js.map