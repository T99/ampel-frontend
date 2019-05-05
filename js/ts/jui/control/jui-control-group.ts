/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIControlComponentList from "./jui-control-component-list.js";
import JUINotifier from "../action/jui-notifier.js";
import JUINotificationFilter from "../action/jui-notification-filter.js";
import JUISubscription from "../action/jui-subscription.js";
import JUIControlComponent from "./jui-control-component.js";
import TSObjectIterator from "../../structures/implementations/iterate/ts-object-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIControlGroup<E = any> {
	
	protected components: Map<string, JUIControlComponent> = new Map();
	protected verifications: Array<() => boolean> = [];
	private readonly action: (inputs: Map<string, string>) => E;
	
	public constructor(components: JUIControlComponentList, action: (inputs: Map<string, string>) => E) {
		
		let iterator: TSObjectIterator = new TSObjectIterator(components);
		while (iterator.hasNext()) {
			
			let keyValuePair: { key: string, value: JUIControlComponent } = iterator.next();
			this.components.set(keyValuePair.key, keyValuePair.value);
			
		}
		
		this.action = action;
		
	}
	
	public addVerificationStep(verification: () => boolean): void {
		
		this.verifications.push(verification);
		
	}
	
	public addActionNotifier<I>(notifier: JUINotifier<I>, filter?: JUINotificationFilter<I>): void {
		
		let subscription: JUISubscription<I> = notifier.subscribe(() => this.attemptAction());
		if (filter) subscription.filter(filter);
		
	}
	
	public checkVerifications(): boolean {
		
		for (let verification of this.verifications) if (!verification()) return false;
		for (let component of this.components.values()) {
			
			if (component.validateComponent && !component.validateComponent()) return false;
			
		}
		
		return true;
		
	}
	
	public attemptAction(): Promise<E> {
		
		return new Promise<any>((resolve: (...params: any) => any, reject: (...params: any) => any): void => {
			
			if (this.checkVerifications()) {
				
				let componentMap: Map<string, string> = new Map();
				for (let key of this.components.keys()) componentMap.set(key, this.components.get(key).getComponentValue());
				
				this.action(componentMap);
				
				resolve();
				
			} else reject();
			
		});
		
	}
	
}

export default JUIControlGroup;