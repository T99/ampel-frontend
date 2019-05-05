/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:19 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Filters notifications (events) by assigning a true (passing) value, or a false (failing) value to any given notification passed to it.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINotificationFilter {
    constructor(filter) {
        this.filter = filter;
    }
    test(notification) {
        return this.filter(notification);
    }
}
export default JUINotificationFilter;
//# sourceMappingURL=jui-notification-filter.js.map