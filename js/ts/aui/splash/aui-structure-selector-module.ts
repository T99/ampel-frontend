/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:58 PM -- February 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUINotifier from "../../jui/action/jui-notifier.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUITextLabel from "../global/aui-text-label.js";
import JUIScrollContainer from "../../jui/elements/containers/single-containers/jui-scroll-container.js";
import JUIVerticalContainer from "../../jui/elements/containers/multi-containers/jui-vertical-container.js";
import JUIMouseEvent from "../../jui/action/events/jui-mouse-event.js";
import AUIButton from "../global/aui-button.js";
import JUISubscription from "../../jui/action/jui-subscription.js";
import AFStructure from "../../af-structures/af-structure.js";
import AFStructureListing from "../../af-structures/af-structure-listing.js";
import AFIDObject from "../../af-structures/af-id-object.js";
import { JUIModule } from "../../jui/jui-module.js";
import JUIFlowContainer from "../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUITextLeafType from "../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIStructureSelectorModule<S extends AFStructure<any> & AFIDObject, L extends AFStructureListing<any, S>> extends JUIModule<AUISplashContainer> {
	
	private selectionNotifier: JUINotifier<S> = new JUINotifier<S>();
	
	private backButtonNotifier: JUINotifier<void> = new JUINotifier<void>();
	
	public constructor(listing: L, selectionType: string, noneAvailableMessage: string) {
		
		super(new AUISplashContainer());
		
		this.getModuleElement().addClasses("aui-structure-selector-module");
		
		// Stoplight creation.
		
		let stoplightImage: JUIImageLeaf = new JUIImageLeaf("img/main-icon.png");
		let stoplightImageStyles: CSSStyleDeclaration = stoplightImage.getElement().style;
		
		stoplightImageStyles.filter = "drop-shadow(6px 6px 10px #000000)";
		stoplightImageStyles.marginBottom = "2.5vh";
		
		// Title text creation.
		
		let ampelTitle: AUITextLabel = new AUITextLabel("AMPEL FEEDBACK", JUITextLeafType.H2);
		let ampelTitleStyles: CSSStyleDeclaration = ampelTitle.getElement().style;
		ampelTitleStyles.fontSize = "2em";
		ampelTitleStyles.marginBottom = "5vh";
		ampelTitleStyles.fontWeight = "600";
		
		// "Sign-in" text creation.
		
		let signInText: AUITextLabel = new AUITextLabel("Select a " + selectionType.toLowerCase() + " to use", JUITextLeafType.H4);
		let signInTextStyles: CSSStyleDeclaration = signInText.getElement().style;
		signInTextStyles.fontSize = "1.25em";
		signInTextStyles.marginBottom = "2vh";
		signInTextStyles.fontWeight = "400";
		
		// Organization scroller creation.
		
		let substructureScrollContainer: JUIScrollContainer<JUIVerticalContainer<AUITextLabel>> = new JUIScrollContainer(true, false);
		let substructureVerticalContainer: JUIVerticalContainer<AUITextLabel> = new JUIVerticalContainer();
		
		if (listing.isEmpty()) {
			
			let noneAvailableText: AUITextLabel = new AUITextLabel(noneAvailableMessage);
			
			noneAvailableText.getElement().style.textAlign = "center";
			
			let scrollStyles: CSSStyleDeclaration = substructureScrollContainer.getElement().style;
			scrollStyles.display = "flex";
			scrollStyles.flexDirection = "column";
			scrollStyles.justifyContent = "center";
			scrollStyles.overflowY = "auto";
			
			substructureVerticalContainer.addChildren(noneAvailableText);
			
		} else {
			
			for (let substructure of listing.getAll()) {
				
				let textLabel: AUITextLabel = new AUITextLabel(substructure.getName());
				textLabel.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
					(event: JUIMouseEvent) => {
						
						this.selectionNotifier.notify(substructure);
						
					}
				);
				substructureVerticalContainer.addChildren(textLabel);
				
			}
			
		}
		
		substructureScrollContainer.setChild(substructureVerticalContainer);
		
		// Button creation.
		
		let buttonContainer: JUIFlowContainer<AUIButton> = new JUIFlowContainer<AUIButton>(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		
		buttonContainer.addClasses("aui-structure-selector-button-container");
		
		let backButton: AUIButton = new AUIButton("Back");
		let selectionButton: AUIButton = new AUIButton("Select " + selectionType.substring(0, 1).toUpperCase() + selectionType.substring(1).toLowerCase());
		
		backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(
			(): any => this.backButtonNotifier.notify()
		);
		
		buttonContainer.addChildren(backButton, selectionButton);
		
		this.getModuleElement().addChildren(stoplightImage, ampelTitle, signInText, substructureScrollContainer, buttonContainer);
		
	}
	
	public subscribeToSelectionNotifier(handler: (notification: S) => any): JUISubscription<S> {
		
		return this.selectionNotifier.subscribe(handler);
		
	}
	
	public subscribeToBackButtonNotifier(handler: () => any): JUISubscription<void> {
		
		return this.backButtonNotifier.subscribe(handler);
		
	}
	
}

export default AUIStructureSelectorModule;