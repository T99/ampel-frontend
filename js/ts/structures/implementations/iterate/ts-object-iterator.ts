/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:45 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import TSAIterator from "../../partials/iterate/ts-a-iterator.js";

type KeyValuePair<K, V> = { key: K, value: V };

/**
 * A TSAIterator that iterates over the keys of an object.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSObjectIterator<E = any> extends TSAIterator<KeyValuePair<string, E>> {
	
	private content: any;
	private keys: string[];
	private index: number = 0;
	
	public constructor(content: any) {
		
		super();
		
		this.content = content;
		
		if ((this.content !== null) && (this.content !== undefined)) {
			
			this.keys = Object.keys(this.content);
			
		} else this.keys = [];
		
	}
	
	public hasNext(): boolean {
		
		return (this.index < this.keys.length);
		
	}
	
	public next(): KeyValuePair<string, E> {
		
		return {
			
			key: this.keys[this.index],
			value: this.content[this.keys[this.index++]]
			
		};
		
	}
	
	public remove(): KeyValuePair<string, E> {
		
		throw new Error("Unsupported operation.");
		// TODO [3/17/19 @ 9:40 PM] - Can this be done?
		
	}
	
	public reset(): void {
		
		this.index = 0;
		
	}
	
}

export default TSObjectIterator;