/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import AUITextLabel from "../../../global/aui-text-label.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import JUITextAreaLeaf from "../../../../jui/elements/leaves/control-leaves/jui-text-area-leaf.js";
import JUIDrawingCanvasLeaf from "../../../../jui/elements/leaves/control-leaves/jui-drawing-canvas-leaf.js";
import JUINamedColor from "../../../../jui/descriptors/colors/jui-named-color.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import AUIQuestion from "./aui-question.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIFreeResponseQuestion extends AUIQuestion<JUIFlowContainer> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-free-response-question";
	
	protected interactionTimeout: number = 4000;
	
	private textDrawSelector: JUIFlowContainer<AUITextLabel>;
	
	private textArea: JUITextAreaLeaf;
	
	private canvas: JUIDrawingCanvasLeaf;
	
	private typingModeIsActive: boolean = true;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
		
		this.element.addClasses(this.TYPE_IDENTITY);
		
		this.textDrawSelector = new JUIFlowContainer<AUITextLabel>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		let drawSelector: AUITextLabel = new AUITextLabel("Draw");
		
		let textSelector: AUITextLabel = new AUITextLabel("Type");
		
		textSelector.addClasses("selected");
		
		drawSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			if (this.typingModeIsActive) {
				
				this.typingModeIsActive = false;
				
				textSelector.removeClasses("selected");
				drawSelector.addClasses("selected");
				
				if (this.element.hasChild(this.textArea.getID())) this.element.removeChild(this.textArea.getID());
				this.element.addChild(this.canvas);
				
				this.canvas.correctSizing();
				
			}
			
		});
		
		textSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			if (!this.typingModeIsActive) {
				
				this.typingModeIsActive = true;
				
				drawSelector.removeClasses("selected");
				textSelector.addClasses("selected");
				
				if (this.element.hasChild(this.canvas.getID())) this.element.removeChild(this.canvas.getID());
				this.element.addChild(this.textArea);
				
			}
			
		});
		
		this.textDrawSelector.addChildren(textSelector, drawSelector);
		
		this.textArea = new JUITextAreaLeaf();
		this.canvas = new JUIDrawingCanvasLeaf(JUINamedColor.RED);
		
		this.textArea.getHTMLElement().addEventListener("input", (): void => this.interact());
		this.canvas.getEventManager().ELEMENT_MOUSE_MOVE.subscribe((): void => this.interact());
		
		this.element.addChildren(/*this.textDrawSelector, */this.textArea);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.textArea.getContent());
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
}

export default AUIFreeResponseQuestion;