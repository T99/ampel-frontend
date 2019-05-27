/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:58 AM -- November 09th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransition from "./jui-transition.js";
import JUITransitionFunction from "./transition-functions/jui-transition-function.js";
import { JUIContainerable } from "../jui-containerable.js";

abstract class JUIAnimation {
	
	protected internalTransition: JUITransition;
	
	// TODO [2/15/19 @ 10:04 PM] - Is there a way to 'auto reset' the transform values of the changed elements?
	
	public constructor(milliseconds: number,
					   transitionFunction: JUITransitionFunction,
					   transitionAction: (progress: number) => any,
					   elements?: JUIContainerable[],
					   startValue?: number,
					   endValue?: number) {
		
		this.internalTransition = new JUITransition(
			milliseconds,
			transitionFunction,
			transitionAction,
			elements,
			startValue,
			endValue
		);
		
		this.internalTransition.addPreAction(() => this.before());
		this.internalTransition.addPostAction(() => this.after());
		
	}
	
	protected abstract async before(): Promise<void>;
	
	protected abstract async after(): Promise<void>;
	
	// DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
	public async play(): Promise<void> {
		
		return this.internalTransition.play();
		
	}
	
	// DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
	public async pause(): Promise<void> {
		
		return this.internalTransition.pause();
		
	}
	
	// DOC-ME [12/8/18 @ 4:50 PM] - Documentation required!
	public async jumpTo(): Promise<void> {
		
		// TODO [2/15/19 @ 6:15 PM] - I don't know how I'm going to do this yet.
		
	}
	
}

export default JUIAnimation;