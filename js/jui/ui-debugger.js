/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:39 AM -- November 09th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIWorld from "./jui-world.js";
import JUIPage from "./jui-page.js";
/**
 * An ease-of-debugging tool through which all of the various UI elements can be accessed.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class UIDebugger {
    constructor() { }
    static getInstance() {
        if (!UIDebugger.instance)
            UIDebugger.instance = new UIDebugger();
        return UIDebugger.instance;
    }
}
UIDebugger.World = JUIWorld;
UIDebugger.Page = JUIPage;
UIDebugger.Element = Element;
export default UIDebugger;
//# sourceMappingURL=ui-debugger.js.map