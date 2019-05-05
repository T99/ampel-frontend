/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:07 PM -- February 08th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventManager from "../../../../jui/action/managers/jui-event-manager.js";
import JUISVGCircle from "../../../../jui/elements/leaves/content-leaves/svg-element-leaves/jui-svg-circle.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";
import JUIMouseEvent from "../../../../jui/action/events/jui-mouse-event.js";
import JUIMouseEventType from "../../../../jui/action/events/types/jui-mouse-event-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIStoplightQuestionEventManager extends JUIEventManager {
	
	public readonly RED_SELECTED: JUINotifier<JUIMouseEvent>;
	
	public readonly YELLOW_SELECTED: JUINotifier<JUIMouseEvent>;
	
	public readonly GREEN_SELECTED: JUINotifier<JUIMouseEvent>;
	
	public constructor(
		redSelectionRing: JUISVGCircle,
		yellowSelectionRing: JUISVGCircle,
		greenSelectionRing: JUISVGCircle) {
		
		super();
		
		this.RED_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(redSelectionRing);
		this.YELLOW_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(yellowSelectionRing);
		this.GREEN_SELECTED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(greenSelectionRing);
		
	}
	
}

export default AUIStoplightQuestionEventManager;