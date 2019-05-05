/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:12 AM -- December 17th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import InvalidArgumentsError from "../../../../errors/invalid-arguments-error.js";
import JUIContentLeaf from "../jui-content-leaf.js";
import JUIContentLeafType from "../../../types/leaves/jui-content-leaf-type.js";
import JUISVGLeafType from "../../../types/leaves/content-leaves/jui-svg-leaf-type.js";
import JUISVGGeometry from "./svg-element-leaves/jui-svg-geometry.js";
import JUIIdentityContainer from "../../../../helpers/jui-identity-container.js";
import JUIIdentityMap from "../../../../helpers/jui-identity-map.js";
import JUIMasterIdentityMap from "../../../../helpers/jui-master-identity-map.js";

/**
 * A {@link JUIElement} that displays an SVG (scalable vector graphic).
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGLeaf<G extends JUISVGGeometry<SVGGraphicsElement> = JUISVGGeometry<SVGGraphicsElement>>
	extends JUIContentLeaf<SVGSVGElement> implements JUIIdentityContainer {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-svg-leaf";
	
	/**
	 * Describes the {@link AlphanumericalGenerator} pattern that JUIIdentityContainers will use to generate new IDs for
	 * this JUIContainer.
	 */
	public readonly CONTENT_PATTERN: string = "3l3n";
	
	private static readonly SVG_ATTRIBUTES: string[] = [
		"xmlns",
		"width",
		"height",
		"viewBox",
		"fill",
		"stroke",
		"stroke-width",
		"stroke-linecap",
		"stroke-linejoin"
	];
	
	private childGeometry: JUIIdentityMap<G>;
	
	public constructor(svgURI?: string) {
		
		super(JUISVGLeafType.SVG.toString() as unknown as JUIContentLeafType);
		this.addClasses(this.TYPE_IDENTITY);
		
		// if (this.hasContainer()) this.childGeometry = this.getContainer().children.getChildMap(this);
		// else
		
		// TODO [1/26/19 @ 4:39 PM] - This should use the above code to get a child IdentityMap from the parent
		//  container.
		this.childGeometry = JUIMasterIdentityMap.getInstance().getChildMap(this);
		
		if (svgURI) this.addGeometryFromSource(svgURI);
		
	}
	
	public addGeometryFromSource(svgURI: string): void {
		
		if ((/\.svg$/).test(svgURI)) {
			
			let xhr: XMLHttpRequest = new XMLHttpRequest();
			xhr.open("GET", svgURI);
			
			xhr.onloadend = (): void => {
				
				if (xhr.responseXML.documentElement.tagName.toLowerCase() === "svg") {
					
					let svg: Element = xhr.responseXML.documentElement;
					
					this.getHTMLElement().innerHTML = svg.innerHTML;
					
					let attributes: NamedNodeMap = svg.attributes;
					
					for (let key of attributes) this.getHTMLElement().setAttribute(key.name, key.value);
					
					for (let geometry of this.childGeometry.valueSet()) {
						
						this.getHTMLElement().appendChild(geometry.getHTMLElement());
						
					}
					
				} else throw new InvalidArgumentsError("Attempted to initialize a new JUISVGLeaf with a non-SVG file.");
				
			};
			
			xhr.send();
			
		} else throw new InvalidArgumentsError("Attempted to initialize a new JUISVGLeaf with a non-SVG file.");
		
	}
	
	public setSource(svgURI: string): void {
		
		this.reset();
		this.addGeometryFromSource(svgURI);
		
	}
	
	public addGeometry(...geometry: G[]): void {
		
		for (let element of geometry) {
			
			this.childGeometry.add(element);
			this.element.appendChild(element.getHTMLElement());
			
		}
		
		// if (geometry.hasContainer(this)) return geometry.getID();
		// else if (geometry.hasContainer()) throw new JUIContainerDichotomyError();
		// else {
		//	
		// 	this.getHTMLElement().appendChild(geometry.getHTMLElement());
		// 	geometry.setContainer(this);
		// 	return this.children.add(geometry);
		//	
		// }
			
	}
	
	/**
	 * Removes all of the child components of this JUISVGLeaf.
	 */
	private reset(): void {
		
		let element: Element = this.getHTMLElement();
		if (element.hasChildNodes()) while (element.firstChild) element.removeChild(element.firstChild);
		for (let attribute in JUISVGLeaf.SVG_ATTRIBUTES) element.removeAttribute(attribute);
		
	}
	
}

export default JUISVGLeaf;