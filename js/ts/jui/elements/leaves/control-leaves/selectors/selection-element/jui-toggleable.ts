/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:54 PM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../../../../action/jui-notifier.js";

/**
 * An interface for any element that can be in one of two states, active or inactive.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface JUIToggleable {
	
	/**
	 * Toggles the state of this JUIToggleable, returning the new state.
	 *
	 * @returns {boolean} The new state of this JUIToggleable.
	 */
	toggle(): boolean;
	
	/**
	 * Explicitly sets the state of this JUIToggleable.
	 *
	 * @param {boolean} state The state to set this JUIToggleable to.
	 */
	setState(state: boolean): void;
	
	/**
	 * Returns the state of the JUIToggleable.
	 *
	 * @returns {boolean} The state of this JUIToggleable.
	 */
	getState(): boolean;
	
	getEventManager(): JUIToggleable.JUIToggleableEvents;

}

export namespace JUIToggleable {
	
	export interface JUIToggleableEvents {
		
		readonly TOGGLEABLE_STATE_CHANGE: JUINotifier<boolean>;
		
		readonly TOGGLEABLE_BECAME_ACTIVE: JUINotifier<void>;
		
		readonly TOGGLEABLE_BECAME_INACTIVE: JUINotifier<void>;
		
	}
	
}