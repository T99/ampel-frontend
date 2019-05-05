/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:16 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransitionFunction from "../jui-transition-function.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIWobbleTransitionFunction implements JUITransitionFunction {
	
	private func: (point: number) => number;
	
	public constructor(wobbles: number) {
		
		this.func = (point: number): number => {
			
			return Math.sin(2 * wobbles * Math.PI * point);
			
		};
		
	}
	
	public getFunction(): (point: number) => number {
		
		return this.func;
		
	}
	
	public evaluateAtPoint(point: number): number {
		
		return this.func(point);
		
	}
	
}

export default JUIWobbleTransitionFunction;