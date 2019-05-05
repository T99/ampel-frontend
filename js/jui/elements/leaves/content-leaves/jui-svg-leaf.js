/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:12 AM -- December 17th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import InvalidArgumentsError from "../../../../errors/invalid-arguments-error.js";
import JUIContentLeaf from "../jui-content-leaf.js";
import JUISVGLeafType from "../../../types/leaves/content-leaves/jui-svg-leaf-type.js";
import JUIMasterIdentityMap from "../../../../helpers/jui-master-identity-map.js";
/**
 * A {@link JUIElement} that displays an SVG (scalable vector graphic).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUISVGLeaf extends JUIContentLeaf {
    constructor(svgURI) {
        super(JUISVGLeafType.SVG.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-svg-leaf";
        /**
         * Describes the {@link AlphanumericalGenerator} pattern that JUIIdentityContainers will use to generate new IDs for
         * this JUIContainer.
         */
        this.CONTENT_PATTERN = "3l3n";
        this.addClasses(this.TYPE_IDENTITY);
        // if (this.hasContainer()) this.childGeometry = this.getContainer().children.getChildMap(this);
        // else
        // TODO [1/26/19 @ 4:39 PM] - This should use the above code to get a child IdentityMap from the parent
        //  container.
        this.childGeometry = JUIMasterIdentityMap.getInstance().getChildMap(this);
        if (svgURI)
            this.addGeometryFromSource(svgURI);
    }
    addGeometryFromSource(svgURI) {
        if ((/\.svg$/).test(svgURI)) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", svgURI);
            xhr.onloadend = () => {
                if (xhr.responseXML.documentElement.tagName.toLowerCase() === "svg") {
                    let svg = xhr.responseXML.documentElement;
                    this.getHTMLElement().innerHTML = svg.innerHTML;
                    let attributes = svg.attributes;
                    for (let key of attributes)
                        this.getHTMLElement().setAttribute(key.name, key.value);
                    for (let geometry of this.childGeometry.valueSet()) {
                        this.getHTMLElement().appendChild(geometry.getHTMLElement());
                    }
                }
                else
                    throw new InvalidArgumentsError("Attempted to initialize a new JUISVGLeaf with a non-SVG file.");
            };
            xhr.send();
        }
        else
            throw new InvalidArgumentsError("Attempted to initialize a new JUISVGLeaf with a non-SVG file.");
    }
    setSource(svgURI) {
        this.reset();
        this.addGeometryFromSource(svgURI);
    }
    addGeometry(...geometry) {
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
    reset() {
        let element = this.getHTMLElement();
        if (element.hasChildNodes())
            while (element.firstChild)
                element.removeChild(element.firstChild);
        for (let attribute in JUISVGLeaf.SVG_ATTRIBUTES)
            element.removeAttribute(attribute);
    }
}
JUISVGLeaf.SVG_ATTRIBUTES = [
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
export default JUISVGLeaf;
//# sourceMappingURL=jui-svg-leaf.js.map