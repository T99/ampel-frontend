/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:51 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUINotifierSource from "./jui-notifier-source.js";
/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of {@link JUIEvent}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIEventNotifierSource extends JUINotifierSource {
    constructor(notifier, eventSource, eventType) {
        super(notifier);
        this.eventSource = eventSource;
        this.eventType = eventType;
    }
    attach() {
        if (!this.isAttached()) {
            this.eventSource.getHTMLElement().addEventListener(this.eventType.getDOMEventName(), this.getListener);
            this.attached = true;
        }
    }
    detach() {
        if (this.isAttached()) {
            this.eventSource.getHTMLElement().removeEventListener(this.eventType.getDOMEventName(), this.getListener);
            this.attached = false;
        }
    }
    getListener() {
        return (event) => this.notifier.notify(this.eventType.transcribeEvent(event));
    }
}
export default JUIEventNotifierSource;
//# sourceMappingURL=jui-event-notifier-source.js.map