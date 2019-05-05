/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:27 PM -- February 15th, 2019.
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
class JUIAngleUnitDescriptor extends JUIUnitDescriptor {
	
	/**
	 * One standard degree of rotation.
	 */
	public static readonly DEG: JUIAngleUnitDescriptor = new JUIAngleUnitDescriptor("deg");
	
	/**
	 * One mathematical 'gradian', where a full circle is 400grad.
	 */
	public static readonly GRAD: JUIAngleUnitDescriptor = new JUIAngleUnitDescriptor("grad");
	
	/**
	 * One mathematical 'radian', where a full circle is 2pi radians.
	 */
	public static readonly RAD: JUIAngleUnitDescriptor = new JUIAngleUnitDescriptor("rad");
	
	/**
	 * One full turn, equal to 360deg.
	 */
	public static readonly TURN: JUIAngleUnitDescriptor = new JUIAngleUnitDescriptor("turn");
	
	private constructor(cssString: string) {
		
		super(cssString);
		
	}
	
}

export default JUIAngleUnitDescriptor;