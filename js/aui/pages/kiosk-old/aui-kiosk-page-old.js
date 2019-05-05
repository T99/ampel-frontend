/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:23 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIPage from "../../../jui/jui-page.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import AUIKioskTextLabel from "./aui-kiosk-text-label.js";
import JUIFlowContainer from "../../../jui/elements/multi-containers/jui-flow-container.js";
import JUITextLeafType from "../../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import JUIDirection from "../../../jui/descriptors/jui-direction.js";
import AUIKioskFolderElement from "./aui-kiosk-folder-element.js";
import JUIAlignmentContainer from "../../../jui/elements/single-containers/jui-alignment-container.js";
/**
 * The page shown while in 'kiosk' mode.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskPageOld extends JUIPage {
    constructor(folder) {
        super(JUIAlignment.CENTER);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-kiosk-page-old";
        this.currentButtons = [];
        this.addClasses(this.TYPE_IDENTITY);
        this.flowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
        this.folderElement = new AUIKioskFolderElement(this, folder);
        this.textElementWrapper = new JUIAlignmentContainer(JUIAlignment.CENTER);
        this.textElement = new AUIKioskTextLabel("", JUITextLeafType.H4);
        this.textElementWrapper.setChild(this.textElement);
        this.buttonContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        this.buttonContainer.addClasses("kiosk-button-container");
        this.refreshButtons();
        this.folderElement.subscribeToQuestionChangeNotifier((question) => {
            this.refreshButtons();
            this.setInquiryText(question.getInquiry());
        });
        // TODO [3/29/19 @ 1:26 PM] - Use EventManagers for this.
        window.addEventListener("resize", () => {
            console.log("Firing onresize");
            this.setInquiryText(this.folderElement.getCurrentQuestion().getInquiry());
        });
        this.flowContainer.addChildren(this.textElementWrapper, this.folderElement, this.buttonContainer);
        this.setChild(this.flowContainer);
        // ugh
        setTimeout(() => {
            this.setInquiryText(this.folderElement.getCurrentQuestion().getInquiry());
        }, 500);
    }
    setInquiryText(inquiry) {
        let originalSize = 3.5;
        this.textElement.setText(inquiry);
        this.textElement.getHTMLElement().style.fontSize = "3.5em";
        while (this.textElement.getHTMLElement().clientHeight > this.textElementWrapper.getHTMLElement().clientHeight) {
            this.textElement.getHTMLElement().style.fontSize = (originalSize -= 0.1) + "em";
        }
    }
    refreshButtons() {
        let relevantButtons = this.folderElement.getRelevantKioskButtons();
        let currentButtons = this.currentButtons;
        let fewer = currentButtons.filter((button) => !relevantButtons.includes(button));
        let more = relevantButtons.filter((button) => !currentButtons.includes(button));
        fewer.forEach((element) => {
            this.buttonContainer.removeChild(element.getID());
            this.currentButtons.removeElement(element);
        });
        more.forEach((element) => {
            let nextElement = relevantButtons[relevantButtons.indexOf(element) + 1];
            if ((nextElement !== undefined) && (this.buttonContainer.hasChild(nextElement.getID()))) {
                this.buttonContainer.addBefore(element, nextElement);
            }
            else
                this.buttonContainer.addChild(element);
            this.currentButtons.push(element);
        });
    }
}
export default AUIKioskPageOld;
//# sourceMappingURL=aui-kiosk-page-old.js.map