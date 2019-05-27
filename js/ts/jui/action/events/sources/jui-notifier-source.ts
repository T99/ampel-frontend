/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:53 PM -- February 04th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../jui-notifier.js";

/**
 * Serves as a standardized point-of-instantiation for {@link JUINotifier}s of certain types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class JUINotifierSource<E> {
	
	protected notifier: JUINotifier<E>;
	
	protected attached: boolean = false;
	
	protected constructor(notifier: JUINotifier<E>) {
		
		this.notifier = notifier;
		
	}
	
	public abstract attach(): void;
	
	public abstract detach(): void;
	
	public isAttached(): boolean {
		
		return this.attached;
		
	}
	
	public getAssociatedNotifier(): JUINotifier<E> {
		
		return this.notifier;
		
	}
	
}

export default JUINotifierSource;