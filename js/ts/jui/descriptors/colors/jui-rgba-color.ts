/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:45 PM -- January 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIColor from "./jui-color.js";

/**
 * Represents a color within the RGBA color spectrum.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIRGBAColor extends JUIColor {
	
	/**
	 * The red component of the color.
	 */
	private red: number;
	
	/**
	 * The green component of the color.
	 */
	private green: number;
	
	/**
	 * The blue component of the color.
	 */
	private blue: number;
	
	/**
	 * The alpha component of the color.
	 */
	private alpha: number;
	
	/**
	 * Initializes a new RGBA-type color, given the three required color components and potentially one optional
	 * component (alpha).
	 *
	 * @param {number} red The red value of the color.
	 * @param {number} green The green value of the color.
	 * @param {number} blue The blue value of the color.
	 * @param {number} alpha The alpha value of the color.
	 */
	public constructor(red: number, green: number, blue: number, alpha?: number) {
		
		super();
		
		this.setRedValue(red);
		this.setGreenValue(green);
		this.setBlueValue(blue);
		this.setAlphaValue((alpha ? alpha : 1));
		
	}
	
	public getRedValue(): number {
		
		return this.red;
		
	}
	
	public setRedValue(value: number): void {
		
		JUIColor.rangeCheck("red value", value, 0, 255);
		
		this.red = value;
		
	}
	
	public getGreenValue(): number {
		
		return this.green;
		
	}
	
	public setGreenValue(value: number): void {
		
		JUIColor.rangeCheck("green value", value, 0, 255);
		
		this.green = value;
		
	}
	
	public getBlueValue(): number {
		
		return this.blue;
		
	}
	
	public setBlueValue(value: number): void {
		
		JUIColor.rangeCheck("blue value", value, 0, 255);
		
		this.blue = value;
		
	}
	
	public getAlphaValue(): number {
		
		return this.alpha;
		
	}
	
	public setAlphaValue(value: number): void {
		
		JUIColor.rangeCheck("alpha value", value, 0, 1);
		
		this.alpha = value;
		
	}
	
	/**
	 * Returns a valid CSS color value-string.
	 */
	public getCSSString(): string {
		
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
		
	}
	
}

export default JUIRGBAColor;