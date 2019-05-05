/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:10 PM -- April 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIContainerable from "../../jui/jui-containerable.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIModule from "../../jui/jui-module.js";
import JUITransition from "../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../jui/animations/transition-functions/jui-named-transition-function.js";

/**
 * A container that automatically transitions left and right by a full page width to it's children elements.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISideScroller<T extends JUIContainerable = JUIContainerable> extends JUIModule<JUIFlowContainer, HTMLElement> {
	
	public readonly TYPE_IDENTITY: string = "aui-side-scroller";
	
	private currentElement: T;
	
	public constructor(startingElement: T) {
	
		super(new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER));
		
		this.element.addChildren(startingElement);
	
	}
	
	public getCurrentElement(): T {
		
		return this.currentElement;
		
	}
	
	public async transitionToRight(element: T): Promise<void> {
		
		let oldElement: T = this.currentElement;
		this.currentElement = element;
		
		let transition: JUITransition = new JUITransition(
			2000,
			JUINamedTransitionFunction.EASE_IN_OUT,
			(progress: number): void => {
				
				this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
				
			},
			[this.element],
			0,
			-100
		);
		
		transition.addPreAction(() => {
			
			this.element.setAlignment(JUIAlignment.LEFT);
			this.element.addChildren(this.currentElement);
			
		});
		
		transition.addPostAction(() => {
			
			this.element.setAlignment(JUIAlignment.RIGHT);
			this.element.removeChild(oldElement.getID());
			this.element.setAlignment(JUIAlignment.CENTER);
			this.element.getHTMLElement().style.transform = "";
			
		});
		
		await transition.play();
		
	}
	
	public async transitionToLeft(element: T): Promise<void> {
		
		let oldElement: T = this.currentElement;
		this.currentElement = element;
		
		let transition: JUITransition = new JUITransition(
			2000,
			JUINamedTransitionFunction.EASE_IN_OUT,
			(progress: number): void => {
				
				this.element.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
				
			},
			[this.element],
			0,
			100
		);
		
		transition.addPreAction(() => {
			
			this.element.setAlignment(JUIAlignment.RIGHT);
			this.element.addChildren(this.currentElement);
			
		});
		
		transition.addPostAction(() => {
			
			this.element.setAlignment(JUIAlignment.LEFT);
			this.element.removeChild(oldElement.getID());
			this.element.setAlignment(JUIAlignment.CENTER);
			this.element.getHTMLElement().style.transform = "";
			
		});
		
		await transition.play();
		
	}
	
}

export default AUISideScroller;