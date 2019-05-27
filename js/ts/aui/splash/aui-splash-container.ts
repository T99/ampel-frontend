/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:22 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIFlowContainer from "../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIContainerType from "../../jui/types/element-types/jui-container-type.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIFlexWrappingRule from "../../jui/descriptors/jui-flex-wrapping-rule.js";
import { JUIContainerable } from "../../jui/jui-containerable.js";

/**
 * A standard content container for AUI.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISplashContainer<T extends JUIContainerable = JUIContainerable> extends JUIFlowContainer<T> {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-splash-container";
	
	// DOC-ME [12/16/18 @ 7:23 PM] - Documentation required!
	public constructor() {
		
		super(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER, JUIFlexWrappingRule.NO_WRAP, JUIContainerType.DIV);
		this.addClasses(this.TYPE_IDENTITY);
		
	}
	
}

export default AUISplashContainer;