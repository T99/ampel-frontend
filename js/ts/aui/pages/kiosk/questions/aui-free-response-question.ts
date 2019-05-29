/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:34 PM -- March 13th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import JUIFlowContainer from "../../../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import AUITextLabel from "../../../global/aui-text-label.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import JUITextAreaLeaf from "../../../../jui/elements/leaves/control-leaves/text/area/jui-text-area-leaf.js";
import JUIDrawingCanvasLeaf from "../../../../jui/elements/leaves/control-leaves/jui-drawing-canvas-leaf.js";
import JUINamedColor from "../../../../jui/descriptors/colors/jui-named-color.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import { AUIQuestion } from "./aui-question.js";
import JUIAlignmentContainer from "../../../../jui/elements/containers/single-containers/jui-alignment-container.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AUIFreeResponseQuestion extends AUIQuestion<JUIAlignmentContainer<JUIFlowContainer>> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-free-response-question";
	
	protected interactionTimeout: number = 4000;
	
	private innerFlowContainer: JUIFlowContainer;
	
	private textDrawSelector: JUIFlowContainer<AUITextLabel>;
	
	private textArea: JUITextAreaLeaf;
	
	private canvas: JUIDrawingCanvasLeaf;
	
	private typingModeIsActive: boolean = true;
	
	protected events: AUIFreeResponseQuestion.AUIFreeResponseQuestionEvents;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIAlignmentContainer(JUIAlignment.CENTER));
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
		this.innerFlowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.textDrawSelector = new JUIFlowContainer<AUITextLabel>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		this.events = new AUIFreeResponseQuestion.AUIFreeResponseQuestionEvents(this);
		
		let drawSelector: AUITextLabel = new AUITextLabel("Draw");
		
		let textSelector: AUITextLabel = new AUITextLabel("Type");
		
		textSelector.addClasses("selected");
		
		drawSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			if (this.typingModeIsActive) {
				
				this.typingModeIsActive = false;
				
				textSelector.removeClasses("selected");
				drawSelector.addClasses("selected");
				
				if (this.innerFlowContainer.hasChild(this.textArea.getID())) this.innerFlowContainer.removeChild(this.textArea.getID());
				this.innerFlowContainer.addChild(this.canvas);
				
				this.canvas.correctSizing();
				
			}
			
		});
		
		textSelector.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			if (!this.typingModeIsActive) {
				
				this.typingModeIsActive = true;
				
				drawSelector.removeClasses("selected");
				textSelector.addClasses("selected");
				
				if (this.innerFlowContainer.hasChild(this.canvas.getID())) this.innerFlowContainer.removeChild(this.canvas.getID());
				this.innerFlowContainer.addChild(this.textArea);
				
			}
			
		});
		
		this.textDrawSelector.addChildren(textSelector, drawSelector);
		
		this.textArea = new JUITextAreaLeaf();
		this.canvas = new JUIDrawingCanvasLeaf(JUINamedColor.RED);
		
		this.textArea.getElement().addEventListener("input", (): void => this.interact());
		this.canvas.getEventManager().ELEMENT_MOUSE_MOVE.subscribe((): void => this.interact());
		
		this.innerFlowContainer.addChildren(/*this.textDrawSelector, */this.textArea);
		this.getModuleElement().setChild(this.innerFlowContainer);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.textArea.getContent());
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
	public getEventManager(): AUIFreeResponseQuestion.AUIFreeResponseQuestionEvents {
		
		return this.events;
		
	}
	
}

export namespace AUIFreeResponseQuestion {
	
	export class AUIFreeResponseQuestionEvents extends AUIQuestion.AUIQuestionEvents {
		
		public readonly QUESTION_FINALIZED: JUINotifier<void>;
		
		public readonly QUESTION_RESPONSE_READY: JUINotifier<AFResponse>;
		
		public constructor(element: AUIFreeResponseQuestion) {
			
			super(element);
			
		}
		
	}
	
}