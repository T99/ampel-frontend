/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:28 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIUnitDescriptor from "./jui-unit-descriptor.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUILengthUnitDescriptor extends JUIUnitDescriptor {
	
	/**
	 * Relative to the length of the '0' character.
	 */
	public static readonly CH: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("ch");
	
	/**
	 * One metric centimeter.
	 */
	public static readonly CM: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("cm");
	
	/**
	 * Relative to the 'x-getHeight' of the current font.
	 */
	public static readonly EM: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("em");
	
	/**
	 * Relative to the 'x-getHeight' of the current font.
	 */
	public static readonly EX: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("ex");
	
	/**
	 * One imperial inch (96px).
	 */
	public static readonly IN: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("in");
	
	/**
	 * One metric millimeter.
	 */
	public static readonly MM: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("mm");
	
	/**
	 * One pica, where one pica is equivalent to your standard 12pt font.
	 */
	public static readonly PC: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("pc");
	
	/**
	 * Relative to the parent element.
	 */
	public static readonly PERCENT: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("%");
	
	/**
	 * One point, where one point is 1/96th of an inch.
	 */
	public static readonly PT: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("pt");
	
	/**
	 * One pixel.
	 */
	public static readonly PX: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("px");
	
	/**
	 * Relative to the font-size of the root element.
	 */
	public static readonly REM: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("rem");
	
	/**
	 * Relative to 1% of the getHeight of the viewport.
	 */
	public static readonly VH: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("vh");
	
	/**
	 * Relative to 1% of the viewport's larger dimension.
	 */
	public static readonly VMAX: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("vmax");
	
	/**
	 * Relative to 1% of the viewport's smaller dimension.
	 */
	public static readonly VMIN: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("vmin");
	
	/**
	 * Relative to 1% of the width of the viewport.
	 */
	public static readonly VW: JUILengthUnitDescriptor = new JUILengthUnitDescriptor("vw");
	
	private constructor(cssString: string) {
		
		super(cssString);
		
	}
	
}

export default JUILengthUnitDescriptor;