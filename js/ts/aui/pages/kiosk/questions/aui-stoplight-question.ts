/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUISVGLeaf from "../../../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import JUINamedColor from "../../../../jui/descriptors/colors/jui-named-color.js";
import JUISVGCircleBuilder from "../../../../jui/elements/leaves/content-leaves/svg-element-leaves/builders/jui-svg-circle-builder.js";
import JUISVGCircle from "../../../../jui/elements/leaves/content-leaves/svg-element-leaves/jui-svg-circle.js";
import AUIKioskButton from "../../kiosk-old/context-buttons/aui-kiosk-button.js";
import AFQuestion from "../../../../af-structures/structures/af-question.js";
import AFResponse from "../../../../af-structures/feedback-session/af-response.js";
import AUIQuestion from "./aui-question.js";

/**
 * One complete event-ready stoplight for the Ampel kiosk.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIStoplightQuestion extends AUIQuestion<JUISVGLeaf> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-stoplight-question";
	
	protected interactionTimeout: number = 2000;
	
	private redSelectionRing: JUISVGCircle;
	
	private yellowSelectionRing: JUISVGCircle;
	
	private greenSelectionRing: JUISVGCircle;
	
	private currentlySelected: number;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUISVGLeaf("img/question-types/stoplight/stoplight-vectorized.svg"));
		
		let builder: JUISVGCircleBuilder = new JUISVGCircleBuilder();
		
		builder
			.withDiameter(117)
			.withXOrigin(155)
			.withFillColor(JUINamedColor.TRANSPARENT)
			.withStrokeWidth(3);
		
		this.redSelectionRing = builder
			.withYOrigin(144)
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.yellowSelectionRing = builder
			.withYOrigin(261)
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.greenSelectionRing = builder
			.withYOrigin(378)
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.element.addGeometry(
			this.redSelectionRing,
			this.yellowSelectionRing,
			this.greenSelectionRing
		);
		
		this.greenSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			this.interact();
			this.currentlySelected = 0;
			
		});
		
		this.yellowSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			this.interact();
			this.currentlySelected = 1;
			
		});
		
		this.redSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			this.interact();
			this.currentlySelected = 2;
			
		});
		
		this.element.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentlySelected);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
	public setGreenLightGlow(glowing: boolean): Promise<void> {
		
		let svg: JUISVGLeaf = this.element;
		
		return;
		
	}
	
}

export default AUIStoplightQuestion;