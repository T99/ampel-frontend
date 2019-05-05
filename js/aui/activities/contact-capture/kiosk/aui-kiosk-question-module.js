/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:30 AM -- February 05th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIModule from "../../../../jui/jui-module.js";
import JUIFlowContainer from "../../../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../../../jui/elements/single-containers/jui-alignment-container.js";
import AUIKioskTextLabel from "./aui-kiosk-text-label.js";
import JUITextLeafType from "../../../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskQuestionModule extends JUIModule {
    constructor(question) {
        super(new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER));
        this.element.addClasses("aui-kiosk-question-module");
        this.question = question;
        let upperContainer = new JUIAlignmentContainer(JUIAlignment.CENTER);
        this.questionText = new AUIKioskTextLabel(question.getInquiry(), JUITextLeafType.H3);
        upperContainer.setChild(this.questionText);
    }
}
export default AUIKioskQuestionModule;
//# sourceMappingURL=aui-kiosk-question-module.js.map