/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:02 PM -- April 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransition from "../../../animations/jui-transition.js";
import JUINamedTransitionFunction from "../../../animations/transition-functions/jui-named-transition-function.js";
import JUIElement from "../../jui-element.js";
import JUIContentLeafType from "../../../types/content-leaves/jui-content-leaf-type.js";

/**
 * A progress bar.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIProgressLeaf extends JUIElement<HTMLProgressElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-progress-leaf";
	
	public constructor(maximumValue: number, currentValue: number = 0) {
	
		super(JUIContentLeafType.PROGRESS);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.setMaximumValue(maximumValue);
		this.setCurrentValue(currentValue);
		
	}
	
	public getMaximumValue(): number {
		
		return this.getHTMLElement().max;
		
	}
	
	public setMaximumValue(maximumValue: number): number {
		
		let displaced: number = this.getMaximumValue();
		this.getHTMLElement().max = maximumValue;
		return displaced;
		
	}
	
	public getCurrentValue(): number {
		
		return this.getHTMLElement().value;
		
	}
	
	public setCurrentValue(currentValue: number): number {
		
		let displaced: number = this.getCurrentValue();
		this.getHTMLElement().value = currentValue;
		return displaced;
		
	}
	
	/**
	 * Animates to a given provided value at a specified speed.
	 *
	 * Note: The speed value is the number of milliseconds that it would take to animate from 0 to the maximum value of
	 * this progress bar.
	 *
	 * @param {number} value The value to animate to.
	 * @param {number} speed The speed at which to animate to the specified value.
	 * @returns {Promise<void>} A Promise that resolves when the animation is complete.
	 */
	public async animateToValue(value: number, speed: number): Promise<void> {
		
		if ((value < 0) || (value > this.getMaximumValue())) throw new Error("ERR | Attempted to animate to an out-of-range value.");
		
		let duration: number = ((Math.abs(value - this.getCurrentValue())) / this.getMaximumValue()) * speed;
		
		let transition: JUITransition = new JUITransition(
			duration,
			JUINamedTransitionFunction.EASE_IN_OUT,
			(progress: number): any => this.setCurrentValue(progress),
			[ this ],
			this.getCurrentValue(),
			value
		);
		
		await transition.play();
		
	}
	
}

export default JUIProgressLeaf;