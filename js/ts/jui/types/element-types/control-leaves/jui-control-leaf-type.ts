/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:06 PM -- May 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIElementType from "../jui-element-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIControlLeafType<E extends HTMLElement = HTMLElement> extends JUIElementType<E> {
	
	public static readonly CANVAS:		JUIControlLeafType<HTMLCanvasElement>	= new JUIControlLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLCanvasElement>("canvas")
	);
	
	public static readonly INPUT:		JUIControlLeafType<HTMLInputElement>	= new JUIControlLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLInputElement>("input")
	);
	
	public static readonly TEXTAREA:	JUIControlLeafType<HTMLTextAreaElement>	= new JUIControlLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLTextAreaElement>("textarea")
	);
	
	protected constructor(factoryMethod: () => E) {
		
		super(factoryMethod);
		
	}
	
}

export default JUIControlLeafType;