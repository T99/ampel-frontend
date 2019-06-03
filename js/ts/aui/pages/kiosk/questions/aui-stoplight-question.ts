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
import JUIStackContainer from "../../../../jui/elements/containers/multi-containers/jui-stack-container.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIImageLeaf from "../../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import JUITransition from "../../../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../../../jui/animations/transition-functions/jui-named-transition-function.js";
import { AUIQuestion } from "./aui-question.js";
import JUINotifier from "../../../../jui/action/jui-notifier.js";

/**
 * One complete event-ready stoplight for the Ampel kiosk.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AUIStoplightQuestion extends AUIQuestion<JUIStackContainer> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-stoplight-question";
	
	private static readonly BASE_IMAGE_URI: string =	"/img/question-types/stoplight/stoplight-off.png";
	private static readonly RED_IMAGE_URI: string =		"/img/question-types/stoplight/stoplight-red.png";
	private static readonly YELLOW_IMAGE_URI: string =	"/img/question-types/stoplight/stoplight-yellow.png";
	private static readonly GREEN_IMAGE_URI: string =	"/img/question-types/stoplight/stoplight-green.png";
	
	protected interactionTimeout: number = 2000;
	
	private stoplightImage: JUIImageLeaf;
	
	private selectorSVG: JUISVGLeaf;
	
	private redSelectionRing: JUISVGCircle;
	
	private yellowSelectionRing: JUISVGCircle;
	
	private greenSelectionRing: JUISVGCircle;
	
	private currentlySelected: number;
	
	private preloadedImages: any[] = [];
	
	protected readonly events: AUIStoplightQuestion.AUIStoplightQuestionEvents;
	
	public constructor(question: AFQuestion) {
		
		super(question, new JUIStackContainer(JUIAlignment.CENTER));
		
		this.selectorSVG = new JUISVGLeaf();
		this.stoplightImage = new JUIImageLeaf(AUIStoplightQuestion.BASE_IMAGE_URI);
		let builder: JUISVGCircleBuilder = new JUISVGCircleBuilder();
		
		this.events = new AUIStoplightQuestion.AUIStoplightQuestionEvents(this);
		
		builder
			.withRadius("13%")
			.withXOrigin("53.5%")
			.withFillColor(JUINamedColor.TRANSPARENT)
			.withStrokeWidth(3);
		
		this.redSelectionRing = builder
			.withYOrigin("25%")
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.yellowSelectionRing = builder
			.withYOrigin("50%")
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.greenSelectionRing = builder
			.withYOrigin("75%")
			.withStrokeColor(JUINamedColor.TRANSPARENT)
			.build();
		
		this.selectorSVG.addGeometry(
			this.redSelectionRing,
			this.yellowSelectionRing,
			this.greenSelectionRing
		);
		
		this.greenSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			console.log("GREEN");
			this.interact();
			this.currentlySelected = 0;
			this.fadeToImage(AUIStoplightQuestion.GREEN_IMAGE_URI);
			
		});
		
		this.yellowSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			console.log("YELLOW");
			this.interact();
			this.currentlySelected = 1;
			this.fadeToImage(AUIStoplightQuestion.YELLOW_IMAGE_URI);
			
		});
		
		this.redSelectionRing.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			console.log("RED");
			this.interact();
			this.currentlySelected = 2;
			this.fadeToImage(AUIStoplightQuestion.RED_IMAGE_URI);
			
		});
		
		this.getModuleElement().addStackedChild(this.stoplightImage);
		this.getModuleElement().addStackedChild(this.selectorSVG);
		
		// Image pre-loading magic.
		for (let uri of [
			AUIStoplightQuestion.BASE_IMAGE_URI,
			AUIStoplightQuestion.RED_IMAGE_URI,
			AUIStoplightQuestion.YELLOW_IMAGE_URI,
			AUIStoplightQuestion.GREEN_IMAGE_URI
		]) this.preloadedImages.push((new Image()).src = uri);
		
		this.getModuleElement().addClasses(this.TYPE_IDENTITY);
		
	}
	
	public getResponse(): AFResponse {
		
		return this.formResponse(this.currentlySelected);
		
	}
	
	public getRelevantKioskButtons(): AUIKioskButton[] {
		
		return [];
		
	}
	
	private async fadeToImage(imageURI: string): Promise<void> {
		
		/*
		 * I really thought that I would have to handle the jumps between the transitions, but it appears that because
		 * the transition time is so short that it isn't a problem. Nonetheless this is a note-to-self that something
		 * might go amiss here.
		 */
		
		let oldStoplightImage: JUIImageLeaf = this.stoplightImage;
		let newStoplightImage: JUIImageLeaf = new JUIImageLeaf(imageURI);
		
		oldStoplightImage.addClasses("under");
		newStoplightImage.addClasses("over");
		
		let imageToFade: HTMLElement = newStoplightImage.getElement();
		
		let transition: JUITransition = new JUITransition(
			300,
			JUINamedTransitionFunction.EASE_IN,
			(progress: number): any => imageToFade.style.opacity = progress.toString(),
			[oldStoplightImage, newStoplightImage],
			0,
			1
		);
		
		transition.addPreAction(() => {
			
			this.getModuleElement().addStackedChild(newStoplightImage);
			this.stoplightImage = newStoplightImage;
			newStoplightImage.getElement().style.opacity = "0";
			
		});
		
		transition.addPostAction(() => {
			
			this.getModuleElement().removeChild(oldStoplightImage.getContainer().getID());
			
		});
		
		await transition.play();
		
	}
	
	public getEventManager(): AUIStoplightQuestion.AUIStoplightQuestionEvents {
		
		return this.events;
		
	}
	
}

export namespace AUIStoplightQuestion {
	
	export class AUIStoplightQuestionEvents extends AUIQuestion.AUIQuestionEvents {
		
		public readonly QUESTION_FINALIZED: JUINotifier<void>;
		
		public readonly QUESTION_RESPONSE_READY: JUINotifier<AFResponse>;
		
		public constructor(element: AUIStoplightQuestion) {
			
			super(element);
			
		}
		
	}
	
}