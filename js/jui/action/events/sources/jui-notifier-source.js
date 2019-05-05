/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of certain types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINotifierSource {
    constructor(notifier) {
        this.attached = false;
        this.notifier = notifier;
    }
    isAttached() {
        return this.attached;
    }
    getAssociatedNotifier() {
        return this.notifier;
    }
}
export default JUINotifierSource;
//# sourceMappingURL=jui-notifier-source.js.map