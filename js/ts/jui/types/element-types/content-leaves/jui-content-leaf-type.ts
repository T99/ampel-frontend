/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:39 PM -- May 23rd, 2019.
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
class JUIContentLeafType<E extends Element> extends JUIElementType<E> {
	
	public static readonly AUDIO:		JUIContentLeafType<HTMLAudioElement>	= new JUIContentLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLAudioElement>("audio")
	);
	
	public static readonly CANVAS:		JUIContentLeafType<HTMLCanvasElement>	= new JUIContentLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLCanvasElement>("canvas")
	);
	
	public static readonly IMG:			JUIContentLeafType<HTMLImageElement>	= new JUIContentLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLImageElement>("img")
	);
	
	public static readonly PROGRESS:	JUIContentLeafType<HTMLProgressElement>	= new JUIContentLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLProgressElement>("progress")
	);
	
	public static readonly SVG:			JUIContentLeafType<SVGSVGElement>		= new JUIContentLeafType(
		(): SVGSVGElement => document.createElementNS("http://www.w3.org/2000/svg", "svg") as unknown as SVGSVGElement
	);
	
	public static readonly VIDEO:		JUIContentLeafType<HTMLVideoElement>	= new JUIContentLeafType(
		JUIElementType.getPlainElementFactoryMethod<HTMLVideoElement>("video")
	);
	
	protected constructor(factoryMethod: () => E) {
	
		super(factoryMethod);
	
	}
	
}

export default JUIContentLeafType;