/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:02 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
class ActionQueue {
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	private actions: Array<() => any>;
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	public constructor(...actions: Array<() => any>) {
		
		this.actions = [];
		actions.forEach((action: () => any) => this.add(action));
		
	}
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	public add(action: () => any): void {
		
		this.actions.push(action);
		
	}
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	public execute(): any {
		
		if (this.actions.length > 0) (this.actions.shift())();
		else throw new RangeError("Attempted to execute the next action of an empty ActionQueue.");
		
	}
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	public skip(): void {
		
		if (this.actions.length > 0) this.actions.shift();
		else throw new RangeError("Attempted to skip the next action of an empty ActionQueue.");
		
	}
	
	// DOC-ME [12/8/18 @ 4:55 PM] - Documentation required!
	public get length(): number {
		
		return this.actions.length;
		
	}
	
}

export default ActionQueue;