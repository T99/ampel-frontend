/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:28 AM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransitionFunction from "./jui-transition-function.js";

/**
 * A custom transition function.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUICustomTransitionFunction implements JUITransitionFunction {
	
	private transitionFunction: (point: number) => number;
	
	public constructor(transitionFunction: (point: number) => number) {
		
		this.transitionFunction = transitionFunction;
		
	}
	
	public getFunction(): (point: number) => number {
		
		return this.transitionFunction;
		
	}
	
	public evaluateAtPoint(point: number): number {
		
		return this.transitionFunction(point);
		
	}
	
}

export default JUICustomTransitionFunction;