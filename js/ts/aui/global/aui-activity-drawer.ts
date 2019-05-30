/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:50 PM -- May 29th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../jui/jui-module.js";
import JUIFlowContainer from "../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import AUITextLabel from "./aui-text-label.js";
import JUIToggleableDropdownArrow from "../../jui/elements/leaves/control-leaves/selectors/selection-element/jui-toggleable-dropdown-arrow.js";
import JUIVerticalContainer from "../../jui/elements/containers/multi-containers/jui-vertical-container.js";
import JUISubscription from "../../jui/action/jui-subscription.js";
import JUISVGLeaf from "../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";

type PromiseFactory = () => Promise<any>;
type PlainFunction = () => any;

/**
 * A collapsible drawer of activities.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIActivityDrawer extends JUIModule<JUIFlowContainer, HTMLElement> {
	
	public readonly TYPE_IDENTITY: string = "aui-activity-drawer";
	
	private drawerHeader: JUIFlowContainer;
	
	private drawerNameText: AUITextLabel;
	
	private dropdownArrow: JUIToggleableDropdownArrow;
	
	private drawerContentsWrapper: JUIVerticalContainer;
	
	private drawerContents: JUIVerticalContainer;
	
	public constructor(drawerName: string, startOpen: boolean, drawerItems: Array<{ name: string, activity: PromiseFactory | PlainFunction }>) {
	
		super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
		this.addClasses(this.TYPE_IDENTITY);
		
		this.drawerHeader = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		this.drawerHeader.addClasses("aui-activity-drawer-header");
		this.drawerNameText = new AUITextLabel(drawerName);
		this.dropdownArrow = new JUIToggleableDropdownArrow(startOpen);
		this.drawerHeader.addChildren(this.drawerNameText, this.dropdownArrow);
		
		this.drawerContentsWrapper = new JUIVerticalContainer();
		this.drawerContentsWrapper.addClasses("aui-activity-drawer-content-wrapper");
		
		this.drawerContents = new JUIVerticalContainer();
		this.drawerContents.addClasses("aui-activity-drawer-content");
		
		this.drawerContentsWrapper.addChild(this.drawerContents);
		
		this.getModuleElement().addChildren(this.drawerHeader, this.drawerContentsWrapper);
		
		this.drawerHeader.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.dropdownArrow.toggle());
		this.dropdownArrow.getEventManager().TOGGLEABLE_BECAME_INACTIVE.subscribe((): any => this.close());
		this.dropdownArrow.getEventManager().TOGGLEABLE_BECAME_ACTIVE.subscribe((): any => this.open());
		
		for (let drawerItem of drawerItems) this.addActivity(drawerItem.name, drawerItem.activity);
		
		// This is a hacky way to try to prevent a transition-less closing effect.
		if (startOpen) {
			
			this.setOpenState(true);
			
			let subscription: JUISubscription<void> = this.getEventManager().ELEMENT_ADDED_TO_PAGE.subscribe(() => {
				
				this.setOpenState(this.getOpenState());
				subscription.unsubscribe();
				
			});
			
		}
	
	}
	
	public addActivity(name: string, activity: PromiseFactory | PlainFunction): void {
		
		let drawerItem: JUIFlowContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		let text: AUITextLabel = new AUITextLabel(name);
		let icon: JUISVGLeaf = new JUISVGLeaf("/img/icons/refresh-cw.svg");
		
		drawerItem.addChildren(text, icon);
		
		drawerItem.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => {
			
			let functionResult: PromiseFactory | any = activity();
			
			if (functionResult instanceof Promise) {
				
				icon.addClasses("loading");
				functionResult.then(() => icon.removeClasses("loading"));
				
			}
			
		});
		
		this.drawerContents.addChild(drawerItem);
		
	}
	
	public removeActivity(name: string): void {
		
		// TODO [5/29/19 @ 2:52 PM] - Finish the 'removeActivity' method.
		
	}
	
	public setOpenState(isOpen: boolean): void {
		
		if (isOpen) this.drawerContentsWrapper.getElement().style.maxHeight = this.drawerContentsWrapper.getElement().scrollHeight + "px";
		else this.drawerContentsWrapper.getElement().style.maxHeight = null;
	
	}
	
	public getOpenState(): boolean {
	
		return (this.drawerContentsWrapper.getElement().style.maxHeight !== undefined);
		
	}
	
	public open(): void {
		
		this.setOpenState(true);
		
	}
	
	public close(): void {
		
		this.setOpenState(false);
		
	}
	
}

export default AUIActivityDrawer;