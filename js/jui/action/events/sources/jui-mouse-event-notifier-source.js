/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:11 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventNotifierSource from "./jui-event-notifier-source.js";
/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIMouseEvent}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMouseEventNotifierSource extends JUIEventNotifierSource {
    constructor(notifier, eventSource, eventType) {
        super(notifier, eventSource, eventType);
    }
}
export default JUIMouseEventNotifierSource;
//# sourceMappingURL=jui-mouse-event-notifier-source.js.map