/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:56 PM -- March 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIContainerable } from "../../jui-containerable.js";

/**
 * Transitions one (and optionally a second) element to the right by one full page width.
 *
 * The first specified element will be transitioned out of the page. If a second element is specified, it will be placed
 * to the left of the initially specified element and transitioned into the page from out of sight on the left.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIFullWidthToRightAnimation /*extends JUIAnimation*/ {
	
	public constructor(element1: JUIContainerable<HTMLElement>, element2?: JUIContainerable<HTMLElement>) {
		
		/*super(
			2000,
			JUINamedTransitionFunction.EASE_IN_OUT,
			(progress: number): void => {
				
				this.flowContainer.getElement().style.transform = "translateX(" + progress + "vw)";
				
			},
			0,
			100
		);*/
		
	}
	
	protected async after(): Promise<void> {
		
		return Promise.resolve();
		
	}
	
	protected async before(): Promise<void> {
		
		return Promise.resolve();
		
	}
	
}

export default JUIFullWidthToRightAnimation;