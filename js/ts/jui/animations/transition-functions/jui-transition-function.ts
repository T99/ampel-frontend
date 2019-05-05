/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:20 PM -- February 03rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A mathematical formula representing the progress of a transition within JUI. 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUITransitionFunction {
	
	getFunction(): (point: number) => number;
	
	evaluateAtPoint(point: number): number;
	
}

export default JUITransitionFunction;