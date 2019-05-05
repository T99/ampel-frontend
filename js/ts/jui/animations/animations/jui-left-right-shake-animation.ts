/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:23 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerable from "../../jui-containerable.js";
import JUIAnimation from "../jui-animation.js";
import JUIWobbleTransitionFunction from "../transition-functions/wobble/jui-wobble-transition-function.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUILeftRightShakeAnimation extends JUIAnimation {
	
	private animatedElement: JUIContainerable<HTMLElement>;
	
	public constructor(element: JUIContainerable<HTMLElement>) {
		
		super(
			500,
			new JUIWobbleTransitionFunction(4),
			(progress: number): void => {
				
				element.getHTMLElement().style.transform = "translateX(" + (25 * progress) + "px)";
				
			},
			[element],
			0,
			0
		);
		
		this.animatedElement = element;
		
	}
	
	protected async before(): Promise<void> {
		
		return;
		
	}
	
	protected async after(): Promise<void> {
		
		this.animatedElement.getHTMLElement().style.transform = "";
		
	}
}

export default JUILeftRightShakeAnimation;