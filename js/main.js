/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:00 AM -- October 09th, 2018.
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
import GlobalModificationImplementations from "./declaration/global-modification-implementations.js";
import AFAPI from "./net/af-api.js";
import AFEndpointRequestBuilder from "./net/af-endpoint-request-builder.js";
import AFSession from "./af-structures/af-session.js";
import HTTPMethod from "./descriptors/http-method.js";
import TSBrowserSession from "./ts-browser-session.js";
import TSMultiPathDoublyLinkedList from "./structures/implementations/list/ts-multi-path-doubly-linked-list.js";
import AFAPISessionAccessor from "./net/accessors/af-api-session-accessor.js";
import TSLoggableError from "./logging/loggables/ts-loggable-error.js";
import AFQuestionType from "./af-structures/descriptors/af-question-type.js";
import JUIWorld from "./jui/jui-world.js";
import AUIKioskPage from "./aui/pages/kiosk/aui-kiosk-page.js";
const main = () => __awaiter(this, void 0, void 0, function* () {
    // Make global .d.ts (definition) modifications.
    GlobalModificationImplementations.makeModifications();
    // Ready the browser session.
    const session = new TSBrowserSession(true);
    window["session"] = session;
    // Initialize the dashboard.
    // let dashboard: AFDashboard = await AFDashboard.go();
    // (new AUIKioskConfiguration()).make();
    // (new AUIContactCaptureConfiguration()).make();
    JUIWorld.getInstance().setPage(new AUIKioskPage());
    // Attach helpers to the window object.
    window["AFAPI"] = AFAPI;
    window["AFEndpointRequestBuilder"] = AFEndpointRequestBuilder;
    window["HTTPMethod"] = HTTPMethod;
    window["AFSession"] = AFSession;
    window["TSMultiPathDoublyLinkedList"] = TSMultiPathDoublyLinkedList;
    window["AFAPISessionAccessor"] = AFAPISessionAccessor;
    window["TSLoggableError"] = TSLoggableError;
    window["AFQuestionType"] = AFQuestionType;
});
main();
// TODO [2/4/19 @ 11:24 PM] - Return to the problem of constant event listening.
// TODO [2/5/19 @ 1:48 AM] - Build a top-level Error handler.
// TODO [2/10/19 @ 2:39 PM] - Add 'transition' and 'will-change' CSS rule before transitioning pages and elements.
// TODO [3/18/19 @ 12:03 AM] - Finish 'refresh' methods on AFStructure classes.
//# sourceMappingURL=main.js.map