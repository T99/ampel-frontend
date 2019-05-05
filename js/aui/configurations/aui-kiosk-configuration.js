/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:49 PM -- January 22nd, 2019.
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
import AUIKioskPageOld from "../pages/kiosk-old/aui-kiosk-page-old.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskConfiguration {
    constructor() { }
    make() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Making configuration: AUIKioskConfiguration");
            yield session.getAmpelSession().initializeSession("trevor@ampelfeedback.com", "password");
            let client = session.getAmpelSession().getClient();
            let organization = yield session.getAmpelSession().setOrganization(client.getOrganizationListing().getAll()[1].getID());
            let location = organization.getLocationListing().getAll()[0];
            let device = yield session.getAmpelSession().setDevice(location.getDeviceListing().getAll()[0].getID());
            let folder = organization.getFolderListing().getAll()[0];
            console.log("Using the device '" + device.getName() + "' and starting the folder '" + folder.getName() + "'...");
            JUIWorld.getInstance().setPage(new AUIKioskPageOld(folder));
        });
    }
}
export default AUIKioskConfiguration;
//# sourceMappingURL=aui-kiosk-configuration.js.map