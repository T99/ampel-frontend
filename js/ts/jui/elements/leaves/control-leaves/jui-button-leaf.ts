/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:49 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
import JUIElement from "../../jui-element.js";
import JUIControlLeafType from "../../../types/element-types/control-leaves/jui-control-leaf-type.js";

class JUIButtonLeaf extends JUIElement<HTMLButtonElement> {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-button-leaf";
	
	// DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
	private buttonText: string;
	
	// DOC-ME [12/8/18 @ 4:52 PM] - Documentation required!
	public constructor(buttonText: string) {
		
		super(JUIControlLeafType.INPUT);
		this.addClasses(this.TYPE_IDENTITY);
		this.getHTMLElement().setAttribute("type", "button");
		
		this.setText(buttonText);
		
	}
	
	// DOC-ME [12/22/18 @ 4:07 PM] - Documentation required!
	public setText(buttonText: string): void {
		
		this.buttonText = buttonText;
		this.getHTMLElement().value = buttonText;
		
	}
	
	// DOC-ME [12/22/18 @ 4:08 PM] - Documentation required!
	public getText(): string {
		
		return this.buttonText;
		
	}
	
}

export default JUIButtonLeaf;