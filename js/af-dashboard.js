/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:08 PM -- February 11th, 2019.
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
import JUIWorld from "./jui/jui-world.js";
import AUISplashPage from "./aui/splash/aui-splash-page.js";
/**
 * The program entry-point for Ampel Feedback's online web-app.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFDashboard {
    constructor() { }
    static go() {
        return __awaiter(this, void 0, void 0, function* () {
            if (AFDashboard.instance === undefined) {
                AFDashboard.instance = new AFDashboard();
                yield AFDashboard.instance.readyPage();
                yield AFDashboard.instance.generatePage();
            }
            return AFDashboard.instance;
        });
    }
    readyPage() {
        return __awaiter(this, void 0, void 0, function* () {
            // Removes any straggling elements from the body.
            while (document.body.firstChild)
                document.body.removeChild(document.body.firstChild);
            // Makes the <html> and <body> elements inaccessible via the Tab key.
            document.documentElement.tabIndex = -1;
            document.body.tabIndex = -1;
        });
    }
    generatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO [2/11/19 @ 10:35 PM] - Make this method more dynamic (should work with the session manager).
            JUIWorld.getInstance().setPage(new AUISplashPage());
        });
    }
}
export default AFDashboard;
//# sourceMappingURL=af-dashboard.js.map