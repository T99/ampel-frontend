/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:33 PM -- April 30th, 2019.
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
import AUIKioskPage from "../aui/pages/kiosk/aui-kiosk-page.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFKioskActivity {
    constructor(folder) {
        this.currentFolder = folder;
    }
    create(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (folder.getQuestionListing().size() === 0) {
                throw new Error("ERR | Attempted to start the kiosk with an empty folder.");
            }
            else {
                let kioskActivity = new AFKioskActivity(folder);
                yield kioskActivity.reinitializeQuestionList();
                kioskActivity.kioskPage = new AUIKioskPage(this.questionList.get(0));
                return kioskActivity;
            }
        });
    }
    queueFolderChange(folder) {
        this.upcomingFolder = folder;
    }
    reinitializeQuestionList() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.upcomingFolder !== undefined) {
                this.currentFolder = this.upcomingFolder;
                this.upcomingFolder = undefined;
            }
            yield this.currentFolder.deepRefresh();
            this.questionList.clear();
            this.questionList.addAll(this.currentFolder.getQuestionListing().getAll());
            if (this.currentFolder.isShuffled())
                this.questionList.shuffle();
        });
    }
}
export default AFKioskActivity;
//# sourceMappingURL=af-kiosk-activity.js.map