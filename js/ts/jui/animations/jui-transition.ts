/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:55 PM -- February 03rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUITransitionFunction from "./transition-functions/jui-transition-function.js";
import JUINamedTransitionFunction from "./transition-functions/jui-named-transition-function.js";
import { JUIContainerable } from "../jui-containerable.js";
import TSLock from "../../util/structures/implementations/ts-lock.js";
import TSActionQueue from "../../util/structures/implementations/queue/ts-action-queue.js";

/**
 * Represents an asynchronous graphical transition.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUITransition {
	
	private static readonly TIMING_INCREMENT: number = 25;
	
	private duration: number;
	
	private transitionFunction: JUITransitionFunction;
	
	private transitionAction: (progress: number) => any;
	
	private transitionElements: JUIContainerable[] = [];
	
	private elementLocks: TSLock[];
	
	private startValue: number;
	
	private endValue: number;
	
	private preActionQueue: TSActionQueue = new TSActionQueue();
	
	private postActionQueue: TSActionQueue = new TSActionQueue();
	
	private resolveTransitionPromise: () => void;
	
	private transitionPromise: Promise<void> = new Promise<void>((resolve: () => void): void => {
		
		this.resolveTransitionPromise = resolve;
		
	});
	
	private intervalID: number;
	
	private currentMillisecondCount: number = 0;
	
	public constructor(duration: number,
					   transitionFunction: JUITransitionFunction,
					   transitionAction: (progress: number) => any,
					   elements?: JUIContainerable[],
					   startValue?: number,
					   endValue?: number) {
		
		this.duration = duration;
		this.transitionFunction = transitionFunction;
		this.transitionAction = transitionAction;
		
		if (elements !== undefined) this.transitionElements.push(...elements);
		
		if ((startValue !== undefined) && (endValue !== undefined)) {
			
			this.startValue = startValue;
			this.endValue = endValue;
			
		} else {
			
			this.startValue = 0;
			this.endValue = 1;
			
		}
		
		// console.log("Created new " + (this.startValue < this.endValue ? "forward" : "reverse") + " transition with " +
		// 	(this.duration / 1000) + "s duration, transitioning from " + this.startValue + " to " + this.endValue +
		// 	" on a " + JUITransition.TIMING_INCREMENT + "ms increment.");
		
	}
	
	public static getZeroLengthTransition(): JUITransition {
		
		let transition: JUITransition = new JUITransition(
			0,
			JUINamedTransitionFunction.LINEAR,
			(progress: number): any => null,
			[],
			0,
			0
		);
		
		transition.transitionPromise = Promise.resolve();
		
		return transition;
		
	}
	
	private async getLocks(): Promise<TSLock[]> {
		
		let lockPromises: Array<Promise<TSLock>> = this.transitionElements.map((element: JUIContainerable): Promise<TSLock> => element.getTransitionLock());
		
		return Promise.all(lockPromises);
		
	}
	
	private relinquishLocks(): void {
		
		if (this.elementLocks !== undefined) this.elementLocks.forEach((lock: TSLock): void => { lock.relinquish(); });
		
	}
	
	public addPreAction(action: () => any): void {
		
		this.preActionQueue.enqueue(action);
		
	}
	
	public addPostAction(action: () => any): void {
		
		this.postActionQueue.enqueue(action);
		
	}
	
	public getProgress(): number {
		
		if (this.duration === 0) return 1;
		else return (this.currentMillisecondCount / this.duration);
		
	}
	
	public getTransitionPromise(): Promise<void> {
		
		return this.transitionPromise;
		
	}
	
	public async play(): Promise<void> {
		
		if (this.intervalID === undefined) {
			
			this.elementLocks = await this.getLocks();
			
			this.preActionQueue.executeAll();
			
			this.intervalID = setInterval(() => {
				
				this.currentMillisecondCount += JUITransition.TIMING_INCREMENT;
				
				if (this.currentMillisecondCount >= this.duration) {
					
					clearInterval(this.intervalID);
					this.intervalID = undefined;
					
					this.transitionAction(this.endValue);
					
					this.postActionQueue.executeAll();
					
					this.relinquishLocks();
					
					if (this.resolveTransitionPromise !== undefined) this.resolveTransitionPromise();
					
				} else {
					
					let functionResult: number = this.transitionFunction.evaluateAtPoint(this.getProgress());
					
					if (this.startValue < this.endValue) this.transitionAction(this.startValue + (functionResult * (this.endValue - this.startValue)));
					else if (this.startValue === this.endValue) this.transitionAction(this.startValue + functionResult);
					else this.transitionAction(this.startValue - (functionResult * (this.startValue - this.endValue)));
					
				}
				
			}, JUITransition.TIMING_INCREMENT);
			
		}
		
		return this.transitionPromise;
		
	}
	
	public pause(): Promise<void> {
		
		if (this.intervalID !== undefined) {
			
			clearInterval(this.intervalID);
			this.intervalID = undefined;
			
		}
		
		return this.transitionPromise;
		
	}
	
	public isPaused(): boolean {
		
		return (this.intervalID === undefined);
		
	}
	
	public reset(): Promise<void> {
		
		if (this.intervalID !== undefined) {
			
			clearInterval(this.intervalID);
			this.intervalID = undefined;
			
		}
		
		this.currentMillisecondCount = 0;
		
		this.transitionPromise = new Promise<void>((resolve: () => void): void => {
			
			this.resolveTransitionPromise = resolve;
			
		});
		
		this.transitionAction(this.startValue);
		
		return this.play();
		
	}
	
	public resetPaused(): Promise<void> {
		
		if (this.intervalID !== undefined) {
			
			clearInterval(this.intervalID);
			this.intervalID = undefined;
			
		}
		
		this.currentMillisecondCount = 0;
		
		this.transitionPromise = new Promise<void>((resolve: () => void): void => {
			
			this.resolveTransitionPromise = resolve;
			
		});
		
		this.transitionAction(this.startValue);
		
		return this.transitionPromise;
		
	}
	
}

export default JUITransition;