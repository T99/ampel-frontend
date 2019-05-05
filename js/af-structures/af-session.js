/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:31 PM -- January 26th, 2019.
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
import AFClient from "./structures/af-client.js";
import AFStructure from "./af-structure.js";
import AFAPISessionAccessor from "../net/accessors/af-api-session-accessor.js";
/**
 * An over-arching handler for Ampel session information.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFSession extends AFStructure {
    constructor(developerMode = false) {
        super(true);
        this.developerMode = developerMode;
        this.isAdmin = false;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
    }
    isSessionLive() {
        return (this.sessionToken !== undefined);
    }
    initializeSession(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSessionLive()) {
                if (this.getClient().getEmail() === email)
                    return this;
                else {
                    throw new Error("ERR | Attempted to initialize the Ampel session even though it has already been " +
                        "initialized.");
                }
            }
            else {
                let sessionResponse = yield AFAPISessionAccessor.createSession(email, password);
                if (sessionResponse.isLive === false) {
                    throw new Error("ERR | Somehow received a dead session upon sign-in...");
                }
                else {
                    this.updateSession(sessionResponse);
                    this.client = yield AFClient.createAsSessionOwner(this, sessionResponse.clientId);
                    return this;
                }
            }
        });
    }
    updateSession(response) {
        if (response.isLive === false) {
            throw new Error("ERR | Session has died or expired...");
        }
        else {
            this.sessionToken = response.id;
            if (response.isAdmin !== undefined)
                this.isAdmin = response.isAdmin;
        }
    }
    getToken() {
        return this.sessionToken;
    }
    hasClient() {
        return (this.client !== undefined);
    }
    getClient() {
        return this.client;
    }
    hasOrganization() {
        return (this.organization !== undefined);
    }
    getOrganization() {
        if (this.hasOrganization())
            return this.organization;
        else
            return undefined;
    }
    setOrganization(organizationID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasOrganization() && this.getOrganization().getID() !== organizationID)
                yield this.getOrganization().signOut();
            if (organizationID === undefined)
                this.organization = undefined;
            if (this.hasOrganization() && this.getOrganization().getID() === organizationID)
                return this.getOrganization();
            if (this.hasClient()) {
                if (this.getClient().getOrganizationListing().hasItemWithID(organizationID)) {
                    this.updateSession(yield AFAPISessionAccessor.setSessionOrganization(this.getToken(), organizationID));
                    this.organization = this.getClient().getOrganizationListing().getItemWithID(organizationID);
                    yield this.getOrganization().signIn();
                    if (this.hasExitSecurityCode()) {
                        // Notify the iOS browser that we have a valid security code.
                        if (window["webkit"])
                            window["webkit"]["messageHandlers"]["receivedSecurityCode"]["postMessage"]({ code: this.getExitSecurityCode() });
                    }
                }
                else {
                    throw new Error("ERR | Attempted to sign-in to an organization that the current user does not have " +
                        "access to.");
                }
            }
            else {
                throw new Error("ERR | Attempted to set the organization of the Ampel session while the session did not " +
                    "have a client.");
            }
            return this.getOrganization();
        });
    }
    hasLocation() {
        return (this.location !== undefined);
    }
    getLocation() {
        return this.location;
    }
    setLocation(locationID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasOrganization()) {
                if (this.getOrganization().getLocationListing().hasItemWithID(locationID)) {
                    this.location = this.getOrganization().getLocationListing().getItemWithID(locationID);
                    return this.getLocation();
                }
                else {
                    throw new Error("ERR | Attempted to set the session's current location to a location that does not " +
                        "exist for the current organization.");
                }
            }
            else {
                throw new Error("ERR | Attempted to set the location of the Ampel session while the session did not " +
                    "have an organization.");
            }
        });
    }
    hasDevice() {
        return (this.device !== undefined);
    }
    getDevice() {
        return this.device;
    }
    setDevice(deviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasLocation()) {
                if (this.getLocation().getDeviceListing().hasItemWithID(deviceID)) {
                    this.updateSession(yield AFAPISessionAccessor.setSessionDevice(this.getToken(), deviceID));
                    this.device = this.location.getDeviceListing().getItemWithID(deviceID);
                    return this.getDevice();
                }
                else {
                    throw new Error("ERR | Attempted to set the session's current device to a device that does not exist " +
                        "for the current location.");
                }
            }
            else {
                throw new Error("ERR | Attempted to set the device of the Ampel session while the session did not have " +
                    "a location.");
            }
        });
    }
    hasFolder() {
        return (this.folder !== undefined);
    }
    getFolder() {
        return this.folder;
    }
    setFolder(folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasOrganization()) {
                if (this.getOrganization().getFolderListing().hasItemWithID(folderID)) {
                    this.folder = this.getOrganization().getFolderListing().getItemWithID(folderID);
                    return this.getFolder();
                }
                else {
                    throw new Error("ERR | Attempted to set the session's current folder to a folder that does not " +
                        "exist for the current organization.");
                }
            }
            else {
                throw new Error("ERR | Attempted to set the folder of the Ampel session while the session did not " +
                    "have an organization.");
            }
        });
    }
    hasQuestion() {
        return (this.question !== undefined);
    }
    getQuestion() {
        return this.question;
    }
    setQuestion(questionID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFolder()) {
                if (this.getFolder().getQuestionListing().hasItemWithID(questionID)) {
                    this.question = this.getFolder().getQuestionListing().getItemWithID(questionID);
                    return this.getQuestion();
                }
                else {
                    throw new Error("ERR | Attempted to set the session's current question to a question that does not " +
                        "exist for the current folder.");
                }
            }
            else {
                throw new Error("ERR | Attempted to set the question of the Ampel session while the session did not " +
                    "have a folder.");
            }
        });
    }
    isAdminSession() {
        return this.isAdmin;
    }
    hasExitSecurityCode() {
        return (this.hasOrganization() && this.getOrganization().hasExitSecurityCode());
    }
    getExitSecurityCode() {
        if (this.hasExitSecurityCode())
            return this.getOrganization().getExitSecurityCode();
        else
            return undefined;
    }
    getChildrenStructures() {
        return [this.getClient()];
    }
    log(recurse) {
        console.groupCollapsed("AFSession");
        if (this.isSessionLive())
            console.info("Session Token:\t" + this.getToken());
        else
            console.info("Session Token:\t%cSession is not yet active...", "font-style: italic");
        if (this.hasClient())
            this.getClient().log();
        else
            console.info("%cNo active client...", "font-style: italic");
        if (this.hasOrganization())
            this.getOrganization().log();
        else
            console.info("%cNo active organization...", "font-style: italic");
        if (this.hasLocation())
            this.getLocation().log();
        else
            console.info("%cNo active location...", "font-style: italic");
        if (this.hasDevice())
            this.getDevice().log();
        else
            console.info("%cNo active device...", "font-style: italic");
        if (this.hasFolder())
            this.getFolder().log();
        else
            console.info("%cNo active folder...", "font-style: italic");
        if (this.hasQuestion())
            this.getQuestion().log();
        else
            console.info("%cNo active question...", "font-style: italic");
        console.groupEnd();
    }
}
export default AFSession;
//# sourceMappingURL=af-session.js.map