/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:28 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIEventManager from "./jui-event-manager.js";
import JUINotifier from "../jui-notifier.js";
import JUIMouseEvent from "../events/jui-mouse-event.js";
import JUIMouseEventType from "../events/types/jui-mouse-event-type.js";
import JUIElement from "../../elements/jui-element.js";

/**
 * Manages the events of a given {@link JUIElement}, including the following events:
 *
 * 	- ELEMENT_MOUSE_CLICKED
 * 	- ELEMENT_MOUSE_DOUBLE_CLICKED
 * 	- ELEMENT_MOUSE_RIGHT_CLICKED
 * 	- ELEMENT_MOUSE_DOWN
 * 	- ELEMENT_MOUSE_UP
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIElementEventManager extends JUIEventManager {
	
	/**
	 * A {@link JUINotifier} dispatched whenever the element is clicked (mouse down + mouse up).
	 */
	public readonly ELEMENT_MOUSE_CLICKED: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the element is double clicked.
	 */
	public readonly ELEMENT_MOUSE_DOUBLE_CLICKED: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the element is right clicked.
	 */
	public readonly ELEMENT_MOUSE_RIGHT_CLICKED: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the mouse is depressed over the element.
	 */
	public readonly ELEMENT_MOUSE_DOWN: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the mouse is released over the element.
	 */
	public readonly ELEMENT_MOUSE_UP: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the mouse enters the element.
	 */
	public readonly ELEMENT_MOUSE_ENTER: JUINotifier<JUIMouseEvent>;
	
	/**
	 * A {@link JUINotifier} dispatched whenever the mouse leaves the element.
	 */
	public readonly ELEMENT_MOUSE_LEAVE: JUINotifier<JUIMouseEvent>;
	
	public readonly ELEMENT_MOUSE_MOVE: JUINotifier<JUIMouseEvent>;
	
	/**
	 * Initializes a new JUIElementEventManager with a given base element.
	 *
	 * @param {JUIElement} baseElement The element for which the {@link JUINotifier}s in this class will dispatch.
	 */
	public constructor(baseElement: JUIElement) {
		
		super();
		
		this.ELEMENT_MOUSE_CLICKED = JUIMouseEventType.MOUSE_CLICK.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_DOUBLE_CLICKED = JUIMouseEventType.MOUSE_DOUBLE_CLICK.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_RIGHT_CLICKED = JUIMouseEventType.MOUSE_RIGHT_CLICK.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_DOWN = JUIMouseEventType.MOUSE_DOWN.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_UP = JUIMouseEventType.MOUSE_UP.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_ENTER = JUIMouseEventType.MOUSE_ENTER.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_LEAVE = JUIMouseEventType.MOUSE_LEAVE.getNotifierForEventType(baseElement);
		this.ELEMENT_MOUSE_MOVE = JUIMouseEventType.MOUSE_MOVE.getNotifierForEventType(baseElement);
		
	}
	
}

export default JUIElementEventManager;