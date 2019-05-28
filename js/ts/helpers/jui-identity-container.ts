/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:36 AM -- December 04th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An interface outlining classes that can maintain {@link JUIIdentityMap}s.
 *
 * @see JUIIdentityMap
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUIIdentityContainer {
	
	/**
	 * Describes the {@link AlphanumericalGenerator} pattern that this JUIIdentityContainer uses to generate new IDs.
	 */
	readonly CONTENT_PATTERN: string;
	
}

export default JUIIdentityContainer;