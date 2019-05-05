/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:09 AM -- April 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JUIWorld from "../../jui/jui-world.js";
import AUIContactCapturePage from "../pages/contact-capture/aui-contact-capture-page.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIContactCaptureConfiguration {
    constructor() { }
    make() {
        return __awaiter(this, void 0, void 0, function* () {
            JUIWorld.getInstance().setPage(new AUIContactCapturePage());
        });
    }
}
export default AUIContactCaptureConfiguration;
//# sourceMappingURL=aui-contact-capture-configuration.js.map