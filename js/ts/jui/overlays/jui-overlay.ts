/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:19 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIContainerType from "../types/element-types/jui-container-type.js";
import JUIOverlayState from "./jui-overlay-state.js";
import JUIDirection from "../descriptors/jui-direction.js";
import JUIAlignment from "../descriptors/jui-alignment.js";
import { JUIContainerable } from "../jui-containerable.js";
import JUIAlignmentContainer from "../elements/containers/single-containers/jui-alignment-container.js";
import { JUIElement } from "../elements/jui-element.js";
import JUITransition from "../animations/jui-transition.js";
import JUINamedTransitionFunction from "../animations/transition-functions/jui-named-transition-function.js";
import JUISubscription from "../action/jui-subscription.js";
import JUIMouseEvent from "../action/events/jui-mouse-event.js";

type TransitionInfo = {
	
	type: string;
	unit: string;
	beginValue: number;
	endValue: number;
	
};

/**
 * An class representing any UI element that does not interrupt JUIPage flow ('position: fixed' for those that
 * understand CSS positioning).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIOverlay<C extends JUIContainerable = JUIElement> {
	
	private alignment: JUIAlignment;
	protected container: JUIAlignmentContainer<C>;
	private transitionDirection: JUIDirection;
	protected state: JUIOverlayState;
	private isMouseHovering: boolean = false;
	
	public constructor(alignment: JUIAlignment, transitionDirection?: JUIDirection, containerType: JUIContainerType = JUIContainerType.DIV) {
		
		this.container = new JUIAlignmentContainer(JUIAlignment.CENTER, containerType);
		this.state = JUIOverlayState.HIDDEN;
		
		this.setAlignment(alignment, transitionDirection);
		
		this.container.addClasses("jui-overlay");
		this.container.getEventManager().ELEMENT_MOUSE_ENTER.subscribe(() => { this.isMouseHovering = true; });
		this.container.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe(() => { this.isMouseHovering = false; });
		
	}
	
	private static getDefaultTransitionDirection(alignment: JUIAlignment): JUIDirection {
		
		switch (alignment) {
			
			case JUIAlignment.UPPER_LEFT:	return JUIDirection.TO_TOP;
			
			case JUIAlignment.TOP:			return JUIDirection.TO_TOP;
			
			case JUIAlignment.UPPER_RIGHT:	return JUIDirection.TO_TOP;
			
			case JUIAlignment.LEFT:			return JUIDirection.TO_LEFT;
			
			case JUIAlignment.CENTER:		return JUIDirection.TO_BOTTOM;
			
			case JUIAlignment.RIGHT:		return JUIDirection.TO_RIGHT;
			
			case JUIAlignment.LOWER_LEFT:	return JUIDirection.TO_BOTTOM;
			
			case JUIAlignment.BOTTOM:		return JUIDirection.TO_BOTTOM;
			
			case JUIAlignment.LOWER_RIGHT:	return JUIDirection.TO_BOTTOM;
			
		}
		
	}
	
	private static getOverlayAlignmentClass(alignment: JUIAlignment): string {
		
		return ("jui-overlay" + alignment.toString().substring(3));
		
	}
	
	private static getTransitionInfo(isCurrentlyShown: boolean, alignment: JUIAlignment, transitionDirection: JUIDirection): TransitionInfo {
		
		let type: string = "translateY";
		let unit: string = "%";
		let beginValue: number;
		let endValue: number;
		
		let isNormalTransition: boolean = (transitionDirection === JUIOverlay.getDefaultTransitionDirection(alignment));
		
		if (isNormalTransition) {
			
			if (alignment === JUIAlignment.CENTER) {
				
				unit = "vh";
				beginValue = (isCurrentlyShown ? 0 : 100);
				endValue = (isCurrentlyShown ? 100 : 0);
				
			} else if ((alignment === JUIAlignment.LEFT) || alignment === JUIAlignment.RIGHT) {
				
				type = "translateX";
				
				if (alignment === JUIAlignment.LEFT) {
					
					beginValue = (isCurrentlyShown ? 0 : -100);
					endValue = (isCurrentlyShown ? -100 : 0);
					
				} else {
					
					beginValue = (isCurrentlyShown ? 0 : 100);
					endValue = (isCurrentlyShown ? 100 : 0);
					
				}
				
			} else if ((alignment === JUIAlignment.TOP) || (alignment === JUIAlignment.UPPER_LEFT) || (alignment === JUIAlignment.UPPER_RIGHT)) {
				
				beginValue = (isCurrentlyShown ? 0 : -100);
				endValue = (isCurrentlyShown ? -100 : 0);
				
			} else {
				
				beginValue = (isCurrentlyShown ? 0 : 100);
				endValue = (isCurrentlyShown ? 100 : 0);
				
			}
			
		} else {
			
			if (transitionDirection === JUIDirection.TO_TOP) {
				
				unit = "vh";
				beginValue = (isCurrentlyShown ? 0 : -100);
				endValue = (isCurrentlyShown ? -100 : 0);
				
			} else if (transitionDirection === JUIDirection.TO_BOTTOM) {
				
				unit = "vh";
				beginValue = (isCurrentlyShown ? 0 : 100);
				endValue = (isCurrentlyShown ? 100 : 0);
				
			} else if (transitionDirection === JUIDirection.TO_LEFT) {
				
				type = "translateX";
				unit = "vw";
				beginValue = (isCurrentlyShown ? 0 : -100);
				endValue = (isCurrentlyShown ? -100 : 0);
				
			} else {
				
				type = "translateX";
				unit = "vw";
				beginValue = (isCurrentlyShown ? 0 : 100);
				endValue = (isCurrentlyShown ? 100 : 0);
				
			}
			
		}
		
		return {
			
			type,
			unit,
			beginValue,
			endValue
			
		};
		
	}
	
	public setAlignment(alignment: JUIAlignment, transitionDirection?: JUIDirection): void {
		
		if (this.alignment !== undefined) this.container.removeClasses(JUIOverlay.getOverlayAlignmentClass(this.alignment));
		
		this.alignment = alignment;
		
		this.container.addClasses(JUIOverlay.getOverlayAlignmentClass(this.alignment));
		this.transitionDirection = (transitionDirection !== undefined ? transitionDirection : JUIOverlay.getDefaultTransitionDirection(this.alignment));
		
	}
	
	public setChild(child: C): void {
		
		this.container.setChild(child);
		
	}
	
	public async show(): Promise<void> {
		
		if (
			(this.state !== JUIOverlayState.VISIBLE) &&
			(this.state !== JUIOverlayState.DESTROYED) &&
			(this.state !== JUIOverlayState.TRANSITIONING)) {
			
			let info: TransitionInfo = JUIOverlay.getTransitionInfo(false, this.alignment, this.transitionDirection);
			
			let transition: JUITransition = new JUITransition(
				2000,
				JUINamedTransitionFunction.EASE_IN_OUT,
				(progress: number): void => {
					
					this.container.getElement().style.transform = info.type + "(" + progress + info.unit + ")";
					
				},
				[this.container],
				info.beginValue,
				info.endValue
			);
			
			transition.addPreAction(() => {
				
				this.state = JUIOverlayState.TRANSITIONING;
				
				this.container.getElement().style.transform = (info.type + "(" + info.beginValue + info.unit + ")");
				
				document.body.appendChild(this.container.getElement());
				
			});
			
			transition.addPostAction(() => {
				
				this.container.getElement().style.transform = "";
				this.state = JUIOverlayState.VISIBLE;
				
			});
			
			await transition.play();
			
		}
		
	}
	
	public async hide(): Promise<void> {
		
		if (
			(this.state !== JUIOverlayState.HIDDEN) &&
			(this.state !== JUIOverlayState.DESTROYED) &&
			(this.state !== JUIOverlayState.TRANSITIONING)) {
			
			let info: TransitionInfo = JUIOverlay.getTransitionInfo(true, this.alignment, this.transitionDirection);
			
			let transition: JUITransition = new JUITransition(
				2000,
				JUINamedTransitionFunction.EASE_IN_OUT,
				(progress: number): void => {
					
					this.container.getElement().style.transform = info.type + "(" + progress + info.unit + ")";
					
				},
				[this.container],
				info.beginValue,
				info.endValue
			);
			
			transition.addPreAction(() => {
				
				this.state = JUIOverlayState.TRANSITIONING;
				
				this.container.getElement().style.transform = (info.type + "(" + info.beginValue + info.unit + ")");
				
				document.body.appendChild(this.container.getElement());
				
			});
			
			transition.addPostAction(() => {
				
				this.container.getElement().style.transform = "";
				document.body.removeChild(this.container.getElement());
				this.state = JUIOverlayState.HIDDEN;
			
			});
			
			await transition.play();
			
		}
		
	}
	
	public async scheduleHide(milliseconds: number, hoverTimeout?: number): Promise<void> {
		
		return new Promise<void>((resolve: () => void): void => {
			
			hoverTimeout = (hoverTimeout !== undefined ? hoverTimeout : (milliseconds / 2));
			let leaveSubscription: JUISubscription<JUIMouseEvent>;
			let enterSubscription: JUISubscription<JUIMouseEvent>;
			
			setTimeout(() => {
				
				if (this.isMouseHovering) {
					
					let timeoutID: number;
					
					leaveSubscription = this.container.getEventManager().ELEMENT_MOUSE_LEAVE.subscribe(() => {
						
						if (timeoutID !== undefined) clearTimeout(timeoutID);
						
						timeoutID = setTimeout(() => {
							
							leaveSubscription.unsubscribe();
							enterSubscription.unsubscribe();
							
							this.hide().then(() => resolve());
							
						}, hoverTimeout);
						
					});
					
					enterSubscription = this.container.getEventManager().ELEMENT_MOUSE_ENTER.subscribe(() => {
						
						if (timeoutID !== undefined) clearTimeout(timeoutID);
						
					});
					
				} else this.hide().then(() => resolve());
				
			}, milliseconds);
			
		});
		
	}
	
	public async destroy(): Promise<void> {
		
		if (this.state !== JUIOverlayState.DESTROYED) {
			
			this.state = JUIOverlayState.DESTROYED;
			this.container.orphan();
			this.container = undefined;
			
		}
		
	}
	
}

export default JUIOverlay;