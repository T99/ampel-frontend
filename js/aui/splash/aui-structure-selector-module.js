/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:58 PM -- February 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUINotifier from "../../jui/action/jui-notifier.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUITextLabel from "../global/aui-text-label.js";
import JUITextLeafType from "../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import JUIScrollContainer from "../../jui/elements/single-containers/jui-scroll-container.js";
import JUIVerticalContainer from "../../jui/elements/multi-containers/jui-vertical-container.js";
import AUIButton from "../global/aui-button.js";
import JUIModule from "../../jui/jui-module.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIStructureSelectorModule extends JUIModule {
    constructor(listing, selectionType, noneAvailableMessage) {
        super(new AUISplashContainer());
        this.selectionNotifier = new JUINotifier();
        this.backButtonNotifier = new JUINotifier();
        this.element.addClasses("aui-structure-selector-module");
        // Stoplight creation.
        let stoplightImage = new JUIImageLeaf("img/main-icon.png");
        let stoplightImageStyles = stoplightImage.getHTMLElement().style;
        stoplightImageStyles.filter = "drop-shadow(6px 6px 10px #000000)";
        stoplightImageStyles.marginBottom = "2.5vh";
        // Title text creation.
        let ampelTitle = new AUITextLabel("AMPEL FEEDBACK", JUITextLeafType.H2);
        let ampelTitleStyles = ampelTitle.getHTMLElement().style;
        ampelTitleStyles.fontSize = "2em";
        ampelTitleStyles.marginBottom = "5vh";
        ampelTitleStyles.fontWeight = "600";
        // "Sign-in" text creation.
        let signInText = new AUITextLabel("Select a " + selectionType.toLowerCase() + " to use", JUITextLeafType.H4);
        let signInTextStyles = signInText.getHTMLElement().style;
        signInTextStyles.fontSize = "1.25em";
        signInTextStyles.marginBottom = "2vh";
        signInTextStyles.fontWeight = "400";
        // Organization scroller creation.
        let substructureScrollContainer = new JUIScrollContainer(true, false);
        let substructureVerticalContainer = new JUIVerticalContainer();
        if (listing.isEmpty()) {
            let noneAvailableText = new AUITextLabel(noneAvailableMessage);
            noneAvailableText.getHTMLElement().style.textAlign = "center";
            let scrollStyles = substructureScrollContainer.getHTMLElement().style;
            scrollStyles.display = "flex";
            scrollStyles.flexDirection = "column";
            scrollStyles.justifyContent = "center";
            scrollStyles.overflowY = "auto";
            substructureVerticalContainer.addChildren(noneAvailableText);
        }
        else {
            for (let substructure of listing.getAll()) {
                let textLabel = new AUITextLabel(substructure.getName());
                textLabel.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe((event) => {
                    this.selectionNotifier.notify(substructure);
                });
                substructureVerticalContainer.addChildren(textLabel);
            }
        }
        substructureScrollContainer.setChild(substructureVerticalContainer);
        // Button creation.
        let buttonContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        buttonContainer.addClasses("aui-structure-selector-button-container");
        let backButton = new AUIButton("Back");
        let selectionButton = new AUIButton("Select " + selectionType.substring(0, 1).toUpperCase() + selectionType.substring(1).toLowerCase());
        backButton.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.backButtonNotifier.notify());
        buttonContainer.addChildren(backButton, selectionButton);
        this.element.addChildren(stoplightImage, ampelTitle, signInText, substructureScrollContainer, buttonContainer);
    }
    subscribeToSelectionNotifier(handler) {
        return this.selectionNotifier.subscribe(handler);
    }
    subscribeToBackButtonNotifier(handler) {
        return this.backButtonNotifier.subscribe(handler);
    }
}
export default AUIStructureSelectorModule;
//# sourceMappingURL=aui-structure-selector-module.js.map