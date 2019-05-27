/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:56 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../jui/jui-module.js";
import JUIFlowContainer from "../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUISVGLeaf from "../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import JUINotifier from "../../jui/action/jui-notifier.js";
import JUIKeyboardEvent from "../../jui/action/events/jui-keyboard-event.js";
import JUIKeyboardEventType from "../../jui/action/events/types/jui-keyboard-event-type.js";
import JUIRawTextField from "../../jui/elements/leaves/control-leaves/text/jui-raw-text-field.js";
import JUITextualInputType from "../../jui/types/input-types/jui-textual-input-type.js";

/**
 * One complete Ampel-flavored text input module.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AUITextInputModule extends JUIModule<JUIFlowContainer, HTMLElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-text-input-module";
	
	private textField: JUIRawTextField;
	
	private icon: JUISVGLeaf;
	
	protected readonly events: AUITextInputModule.AUITextInputModuleEvents;
	
	public constructor(hint: string, icon: JUISVGLeaf, isTextHidden?: boolean) {
		
		super(new JUIFlowContainer(JUIDirection.TO_LEFT, JUIAlignment.CENTER));
		
		this.textField = new JUIRawTextField((isTextHidden ? JUITextualInputType.PASSWORD : JUITextualInputType.PLAIN));
		
		this.events = new AUITextInputModule.AUITextInputModuleEvents(this);
		
		// Set up the text input.
		this.textField.setPlaceholderText(hint);
		
		// Set the icon to the one we were passed.
		this.icon = icon;
		
		// Add the relevant class to the module.
		this.getModuleElement().addClasses("aui-text-input-module");
		
		// Add the two children to the module.
		this.getModuleElement().addChild(this.textField);
		this.getModuleElement().addChild(this.icon);
		
	}
	
	public getContent(): string {
		
		return this.textField.getContent();
		
	}
	
	public setTabIndex(tabIndex: number): void {
		
		this.textField.getElement().tabIndex = tabIndex;
		
	}
	
	public getTextField(): JUIRawTextField {
		
		return this.textField;
		
	}
	
	public getEventManager(): AUITextInputModule.AUITextInputModuleEvents {

		return this.events;

	}
	
}

export namespace AUITextInputModule {
	
	export class AUITextInputModuleEvents extends JUIModule.JUIModuleEvents {

		/**
		 * A {@link JUINotifier} dispatched whenever the content of the element's text input changes.
		 */
		public readonly ELEMENT_TEXT_EDITED: JUINotifier<string>;

		/**
		 * A {@link JUINotifier} dispatched whenever the a key is pressed while this element's text input is focused.
		 */
		public readonly KEY_PRESSED: JUINotifier<JUIKeyboardEvent>;

		public constructor(element: AUITextInputModule) {

			super(element);

			this.ELEMENT_TEXT_EDITED = new JUINotifier<string>();
			this.KEY_PRESSED = JUIKeyboardEventType.KEY_PRESS.getNotifierForEventType(element.getTextField());

			let previousContent: string = element.getContent();

			element.getElement().addEventListener("input", () => {

				let currentContent: string = element.getContent();

				if (currentContent !== previousContent) {

					this.ELEMENT_TEXT_EDITED.notify(currentContent);
					previousContent = currentContent;

				}

			});

		}

	}
	
}