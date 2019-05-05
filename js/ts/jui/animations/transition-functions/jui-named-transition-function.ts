/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:22 PM -- February 03rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransitionFunction from "./jui-transition-function.js";

/**
 * Enumerates standard/common transition functions.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINamedTransitionFunction implements JUITransitionFunction {
	
	/**
	 *     |            .
	 *     |          .
	 *     |        .
	 * pos |      .
	 *     |    .
	 *     |  .
	 *     |.
	 *     +--------------
	 *          time
	 *
	 * @type {JUINamedTransitionFunction}
	 */
	public static readonly LINEAR: JUINamedTransitionFunction = new JUINamedTransitionFunction((point: number): number => {
		
		return point;
		
	});
	
	/**
	 *     |            .
	 *     |         .
	 *     |       .
	 * pos |      .
	 *     |     .
	 *     |   .
	 *     |.
	 *     +--------------
	 *          time
	 *
	 * @type {JUINamedTransitionFunction}
	 */
	public static readonly EASE_IN_OUT: JUINamedTransitionFunction = new JUINamedTransitionFunction((point: number): number => {
		
		let numerator: number = 1;
		
		/*
		 * If there is need to adjust the rate at which the easing occurs, k is the variable to change.
		 * Recommended range is {10 <= k <= 20}.
		 */
		let k: number = 15;
		
		let power: number = -k * (point - 0.5);
		
		let denominator: number = 1 + Math.pow(Math.E, power);
		
		return (numerator / denominator);
		
	});
	
	/**
	 *     |            .
	 *     |            .
	 *     |            .
	 * pos |           .
	 *     |         .
	 *     |     .
	 *     |.
	 *     +--------------
	 *          time
	 *
	 * @type {JUINamedTransitionFunction}
	 */
	public static readonly EASE_IN: JUINamedTransitionFunction = new JUINamedTransitionFunction((point: number): number => {
		
		/*
		 * If there is need to adjust the rate at which the easing occurs, r is the variable to change.
		 * Recommended range is {1.5 <= r <= 4}.
		 */
		let r: number = 2;
		
		let numerator: number = Math.pow(point, r);
		
		let power: number = r - 1;
		
		let denominator: number = Math.pow(1, power);
		
		return (numerator / denominator);
		
	});
	
	/**
	 *     |            .
	 *     |       .
	 *     |    .
	 * pos |  .
	 *     | .
	 *     |.
	 *     |.
	 *     +--------------
	 *          time
	 *
	 * @type {JUINamedTransitionFunction}
	 */
	public static readonly EASE_OUT: JUINamedTransitionFunction = new JUINamedTransitionFunction((point: number): number => {
		
		/*
		 * If there is need to adjust the rate at which the easing occurs, r is the variable to change.
		 * Recommended range is {1.5 <= r <= 2}.
		 */
		let r: number = 2;
		
		let numerator: number = Math.pow(point, r);
		
		let power: number = r - 1;
		
		let denominator: number = Math.pow(1, power);
		
		return (2 * point) - (numerator / denominator);
		
	});
	
	/**
	 *     | .   .   .
	 *     |
	 *     |
	 * pos |. . . . . . .
	 *     |
	 *     |
	 *     |   .   .   .
	 *     +--------------
	 *          time
	 *
	 * @type {JUINamedTransitionFunction}
	 */
	public static readonly WOBBLE: JUINamedTransitionFunction = new JUINamedTransitionFunction((point: number): number => {
		
		return Math.sin(6 * Math.PI * point);
		
	});
	
	private readonly transitionFunction: (point: number) => number;
	
	private constructor(transitionFunction: (point: number) => number) {
		
		this.transitionFunction = transitionFunction;
		
	}
	
	public getFunction(): (point: number) => number {
		
		return this.transitionFunction;
		
	}
	
	public evaluateAtPoint(point: number): number {
		
		return this.transitionFunction(point);
		
	}
	
}

export default JUINamedTransitionFunction;