/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:15 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIColor from "./jui-color.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUINamedColor extends JUIColor {
	
	public static readonly BLACK: JUINamedColor = new JUINamedColor("rgba(0, 0, 0, 1)");
	
	public static readonly WHITE: JUINamedColor = new JUINamedColor("rgba(255, 255, 255, 1)");
	
	public static readonly TRANSPARENT: JUINamedColor = new JUINamedColor("rgba(0, 0, 0, 0)");
	
	public static readonly RED: JUINamedColor = new JUINamedColor("rgba(255, 0, 0, 1)");
	
	public static readonly GREEN: JUINamedColor = new JUINamedColor("rgba(0, 255, 0, 1)");
	
	public static readonly BLUE: JUINamedColor = new JUINamedColor("rgba(0, 0, 255, 1)");
	
	public static readonly YELLOW: JUINamedColor = new JUINamedColor("rgba(255, 255, 0, 1)");
	
	public static readonly CYAN: JUINamedColor = new JUINamedColor("rgba(0, 255, 255, 1)");
	
	private readonly cssString: string;
	
	private constructor(cssString: string) {
		
		super();
		
		this.cssString = cssString;
		
	}
	
	public getCSSString(): string {
		
		return this.cssString;
		
	}
	
}

export default JUINamedColor;