/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:42 PM -- January 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIWorld from "../../jui/jui-world.js";
import AUISplashPage from "../splash/aui-splash-page.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISignInConfiguration {
    constructor() { }
    make() {
        console.log("Making configuration: AUISignInConfiguration");
        JUIWorld.getInstance().setPage(new AUISplashPage());
    }
}
export default AUISignInConfiguration;
//# sourceMappingURL=aui-sign-in-configuration.js.map