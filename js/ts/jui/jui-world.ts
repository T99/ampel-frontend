/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:20 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "./jui-page.js";
import JUIFlowContainer from "./elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "./descriptors/jui-direction.js";
import JUIAlignment from "./descriptors/jui-alignment.js";
import JUIFlexWrappingRule from "./descriptors/jui-flex-wrapping-rule.js";
import JUITransition from "./animations/jui-transition.js";
import JUINamedTransitionFunction from "./animations/transition-functions/jui-named-transition-function.js";

/**
 * The JUIWorld, in which all Pages exists. Represents the entirety of normal page flow.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIWorld extends JUIFlowContainer<JUIPage> {
	
	/**
	 * The JUIWorld instance.
	 */
	private static instance: JUIWorld;
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "jui-world";
	
	/**
	 * The current page.
	 */
	private page: JUIPage;
	
	/**
	 * A private constructor to prevent external instantiation.
	 */
	private constructor() {
		
		super(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER, JUIFlexWrappingRule.NO_WRAP);
		this.addClasses(this.TYPE_IDENTITY);
		this.setID(this.TYPE_IDENTITY);
		
		document.body.appendChild(this.getElement());
		
	}
	
	/**
	 * Gets the JUIWorld's singleton instance.
	 *
	 * @returns {JUIWorld} The JUIWorld's singleton instance.
	 */
	public static getInstance(): JUIWorld {
		
		if (!JUIWorld.instance) JUIWorld.instance = new JUIWorld();
		return JUIWorld.instance;
		
	}
	
	/**
	 * Sets the current page of the JUIWorld.
	 *
	 * @param {JUIPage} page The page to set the JUIWorld to.
	 */
	public setPage(page: JUIPage): void {
		
		if (this.page === page) return;
		else {
			
			// Set the JUIWorld page to the new page.
			this.page = page;
			
			// Remove the contents of the JUIWorld.
			this.orphanAllChildren();
			
			// Adopt the page as a new child.
			this.adoptChild(page);
			
		}
		
	}
	
	// TODO [2/4/19 @ 2:33 AM] - Should the below functions return Promises or transitions?
	// TODO [2/4/19 @ 2:33 AM] - Remember to remove the elements after the below transitions finish.
	
	public goToPageLeft(page: JUIPage): Promise<void> {
		
		return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
			
			if (this.page === page) {
				
				reject(new Error("ERR | Attempted to change the page of the JUIWorld to the page to which it was " +
					"already set."));
				
			} else {
				
				let oldPage: JUIPage = this.page;
				
				this.page = page;
				
				let transition: JUITransition = new JUITransition(
					2000,
					JUINamedTransitionFunction.EASE_IN_OUT,
					(progress: number): void => {
						
						oldPage.getElement().style.transform = "translateX(" + progress + "vw)";
						this.page.getElement().style.transform = "translateX(" + progress + "vw)";
						
					},
					[oldPage, this.page],
					0,
					100
				);
				
				transition.addPreAction(() => {
					
					this.setDirection(JUIDirection.TO_LEFT);
					this.setAlignment(JUIAlignment.RIGHT);
					
					this.addChild(page);
					
				});
				
				transition.addPostAction(() => {
					
					this.removeChild(oldPage.getID());
					this.page.getElement().style.transform = "";
					resolve();
					
				});
				
				transition.play();
				
			}
			
		});
		
	}
	
	public goToPageRight(page: JUIPage): Promise<void> {
		
		return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
			
			if (this.page === page) {
				
				reject(new Error("ERR | Attempted to change the page of the JUIWorld to the page to which it was " +
					"already set."));
				
			} else {
				
				let oldPage: JUIPage = this.page;
				
				this.page = page;
				
				let transition: JUITransition = new JUITransition(
					2000,
					JUINamedTransitionFunction.EASE_IN_OUT,
					(progress: number): void => {
					
						oldPage.getElement().style.transform = "translateX(" + progress + "vw)";
						this.page.getElement().style.transform = "translateX(" + progress + "vw)";
						
					},
					[oldPage, this.page],
					0,
					-100
				);
				
				transition.addPreAction(() => {
					
					this.setDirection(JUIDirection.TO_RIGHT);
					this.setAlignment(JUIAlignment.LEFT);
					
					this.addChild(page);
					
				});
				
				transition.addPostAction(() => {
					
					this.removeChild(oldPage.getID());
					this.page.getElement().style.transform = "translateX(0vw)";
					resolve();
					
				});
				
				transition.play();
				
			}
			
		});
		
	}
	
	public goToPageAbove(page: JUIPage): Promise<void> {
		
		return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
			
			if (this.page === page) {
				
				reject(new Error("ERR | Attempted to change the page of the JUIWorld to the page to which it was " +
					"already set."));
				
			} else {
				
				let oldPage: JUIPage = this.page;
				
				this.page = page;
				
				let transition: JUITransition = new JUITransition(
					2000,
					JUINamedTransitionFunction.EASE_IN_OUT,
					(progress: number): void => {
						
						oldPage.getElement().style.transform = "translateY(" + progress + "vh)";
						this.page.getElement().style.transform = "translateY(" + progress + "vh)";
						
					},
					[oldPage, this.page],
					-100,
					0
				);
				
				transition.addPreAction(() => {
					
					this.setDirection(JUIDirection.TO_TOP);
					this.setAlignment(JUIAlignment.BOTTOM);
					
					this.addChild(page);
					
				});
				
				transition.addPostAction(() => {
					
					this.removeChild(oldPage.getID());
					this.page.getElement().style.transform = "translateX(0vw)";
					resolve();
					
				});
				
				transition.play();
				
			}
			
		});
		
	}
	
	public goToPageBelow(page: JUIPage): Promise<void> {
		
		return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
			
			if (this.page === page) {
				
				reject(new Error("ERR | Attempted to change the page of the JUIWorld to the page to which it was " +
					"already set."));
				
			} else {
				
				let oldPage: JUIPage = this.page;
				
				this.page = page;
				
				let transition: JUITransition = new JUITransition(
					2000,
					JUINamedTransitionFunction.EASE_IN_OUT,
					(progress: number): void => {
						
						oldPage.getElement().style.transform = "translateY(" + progress + "vh)";
						this.page.getElement().style.transform = "translateY(" + progress + "vh)";
						
					},
					[oldPage, this.page],
					0,
					-100
				);
				
				transition.addPreAction(() => {
					
					this.setDirection(JUIDirection.TO_BOTTOM);
					this.setAlignment(JUIAlignment.TOP);
					
					this.addChild(page);
					
				});
				
				transition.addPostAction(() => {
					
					this.removeChild(oldPage.getID());
					this.page.getElement().style.transform = "translateX(0vw)";
					resolve();
					
				});
				
				transition.play();
				
			}
			
		});
		
	}
	
}

export default JUIWorld;