/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:41 PM -- January 16th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A component whose inputs/implementation specific values can be used in a {@link JUIControlGroup}.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUIControlComponent {
	
	getComponentValue(): any;
	
	validateComponent?(): boolean;
	
}

export default JUIControlComponent;