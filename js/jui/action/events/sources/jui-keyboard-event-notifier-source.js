/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIEventNotifierSource from "./jui-event-notifier-source.js";
/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIKeyboardEvent}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIKeyboardEventNotifierSource extends JUIEventNotifierSource {
    constructor(notifier, eventSource, eventType) {
        super(notifier, eventSource, eventType);
    }
}
export default JUIKeyboardEventNotifierSource;
//# sourceMappingURL=jui-keyboard-event-notifier-source.js.map