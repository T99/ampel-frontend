/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:16 PM -- March 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElement from "../../jui-element.js";
import JUIControlLeafType from "../../../types/element-types/control-leaves/jui-control-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUICanvasLeaf extends JUIElement<HTMLCanvasElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-canvas-leaf";
	
	protected readonly context: CanvasRenderingContext2D = this.getHTMLElement().getContext("2d");
	
	public constructor() {
		
		super(JUIControlLeafType.CANVAS);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
	public correctSizing(): void {
		
		let heightString: string = getComputedStyle(this.getHTMLElement()).height;
		let widthString: string = getComputedStyle(this.getHTMLElement()).width;
		
		this.getHTMLElement().height = parseFloat(heightString.substring(0, heightString.length - 2));
		this.getHTMLElement().width = parseFloat(widthString.substring(0, widthString.length - 2));
		
	}
	
}

export default JUICanvasLeaf;