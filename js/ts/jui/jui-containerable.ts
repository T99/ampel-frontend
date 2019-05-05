/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:28 PM -- December 18th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainer from "./elements/jui-container.js";
import TSLock from "../structures/implementations/ts-lock.js";

/**
 * Describes an item that can be placed inside a {@link JUIContainer}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface JUIContainerable<E extends Element = Element> {
	
	readonly TYPE_IDENTITY: string;
	
	getHTMLElement(): E;
	
	setID(id: string): void;
	
	getID(): string;
	
	getContainer(): JUIContainer;
	
	setContainer(container: JUIContainer): void;
	
	hasContainer(container?: JUIContainer): boolean;
	
	getTransitionLock(): Promise<TSLock>;
	
	orphan(): void;
	
}

export default JUIContainerable;