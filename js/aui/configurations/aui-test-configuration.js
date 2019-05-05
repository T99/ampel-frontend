/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:38 PM -- February 15th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIPage from "../../jui/jui-page.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIWorld from "../../jui/jui-world.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUITestConfiguration {
    constructor() { }
    make() {
        console.log("Making configuration: AUITestConfiguration");
        let page = new JUIPage(JUIAlignment.CENTER);
        let container = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
        let yesImage = new JUIImageLeaf("/img/question-types/true-false/yes-rasterized-cropped.png");
        let noImage = new JUIImageLeaf("/img/question-types/true-false/no-rasterized-cropped.png");
        yesImage.getHTMLElement().style.height = "50%";
        noImage.getHTMLElement().style.height = "50%";
        container.addChildren(yesImage, noImage);
        page.setChild(container);
        JUIWorld.getInstance().setPage(page);
    }
}
export default AUITestConfiguration;
//# sourceMappingURL=aui-test-configuration.js.map