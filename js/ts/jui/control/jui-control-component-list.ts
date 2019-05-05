/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:40 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIControlComponent from "./jui-control-component.js";

/**
 * A list of {@link JUIControlComponent}s formatted in such a way that their contents can be used as the inputs for a
 * {@link JUIControlGroup}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUIControlComponentList {
	
	[name: string]: JUIControlComponent;
	
}

export default JUIControlComponentList;