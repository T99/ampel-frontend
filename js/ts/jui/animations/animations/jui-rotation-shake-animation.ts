/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:23 PM -- March 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIAnimation from "../jui-animation.js";
import { JUIContainerable } from "../../jui-containerable.js";
import JUIWobbleOutTransitionFunction from "../transition-functions/wobble/jui-wobble-out-transition-function.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRotationShakeAnimation extends JUIAnimation {
	
	private animatedElement: JUIContainerable<HTMLElement>;
	
	public constructor(element: JUIContainerable<HTMLElement>) {
		
		super(
			1000,
			new JUIWobbleOutTransitionFunction(4),
			(progress: number): void => {
				
				element.getElement().style.transform = "rotate(" + (5 * progress) + "deg)";
				
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
		
		this.animatedElement.getElement().style.transform = "";
		
	}
	
}

export default JUIRotationShakeAnimation;