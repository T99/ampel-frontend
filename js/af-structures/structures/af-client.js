/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:53 AM -- January 31st, 2019.
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
import AFOrganizationListing from "./listings/af-organization-listing.js";
import AFGender from "../descriptors/af-gender.js";
import AFStructure from "../af-structure.js";
import AFAPIClientAccessor from "../../net/accessors/af-api-client-accessor.js";
import TSDateBuilder from "../../descriptors/time/ts-date-builder.js";
import TSMonth from "../../descriptors/time/ts-month.js";
import AFPhoneNumber from "../descriptors/af-phone-number.js";
/**
 * A signed-in client of Ampel's.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 * @see AFCurrentClient
 */
class AFClient extends AFStructure {
    /**
     * Initializes a new {@link AFClient} with a given token.
     *
     * @param session {AFSession} The session to which this AFClient belongs.
     * @param shouldMaintainChildren {boolean} A boolean value indicating whether or not this client should maintain its
     * own subset of information (belonging organizations, locations, etc).
     */
    constructor(session, shouldMaintainChildren) {
        super(shouldMaintainChildren);
        this.session = session;
    }
    static createAsSessionOwner(session, clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new AFClient(session, true);
            client.id = clientID;
            yield client.refresh();
            client.organizationListing = yield AFOrganizationListing.createForClient(client, false);
            return client;
        });
    }
    static createAsOrganizationChild(session, clientResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new AFClient(session, false);
            yield client.refresh(clientResponse);
            return client;
        });
    }
    /**
     * Refreshes the information in this {@link AFClient} with the corresponding information from the API.
     *
     * @returns {Promise<void>} A Promise that resolves once the information has been refreshed.
     */
    refresh(clientResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (clientResponse === undefined)
                response = yield AFAPIClientAccessor.getBaseForID(this.getSession().getToken(), this.getID());
            else
                response = clientResponse;
            this.id = response.id;
            this.firstName = response.firstName;
            this.lastName = response.lastName;
            this.email = response.email;
            this.phoneNumber = AFPhoneNumber.fromNumber(response.phone);
            this.gender = AFGender.fromNumericalValue(response.gender.value);
            this.birthday =
                (new TSDateBuilder())
                    .withYear(response.birthday.year)
                    .withMonth(TSMonth.getMonthByNumber(response.birthday.month))
                    .withDay(response.birthday.day)
                    .build();
            return this;
        });
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getFullName() {
        return (this.firstName + " " + this.lastName);
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getGender() {
        return this.gender;
    }
    getBirthday() {
        return this.birthday;
    }
    isAdmin() {
        return (this.isSessionClient() && this.getSession().isAdminSession());
    }
    isSessionClient() {
        return (this.getSession().hasClient() && (this.getSession().getClient().getID() === this.getID()));
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.getFullName();
    }
    getSession() {
        return this.session;
    }
    getOrganizationListing() {
        return this.organizationListing;
    }
    getChildrenStructures() {
        return this.getOrganizationListing().getAllSignedInOrganizations();
    }
    log(recurse = true) {
        console.groupCollapsed("AFClient: " + this.getFullName() + " [" + this.getID() + "]" + (this.isSessionClient() ? " \u2605" : ""));
        console.info("ID:\t\t" + this.getID());
        console.info("First Name:\t" + this.getFirstName());
        console.info("Last Name:\t" + this.getLastName());
        console.info("Full Name:\t" + this.getFullName());
        console.info("Email:\t\t" + this.getEmail());
        console.info("Phone Number:\t" + this.getPhoneNumber().toString());
        console.info("Gender:\t\t" + this.getGender().getStringValue());
        console.info("Birthday:\t" + this.getBirthday().toString());
        console.info("Current User:\t" + (this.getID() === session.getAmpelSession().getClient().getID()));
        console.info("Admin:\t\t" + this.isAdmin());
        console.groupCollapsed("Raw Object");
        console.info(this);
        console.groupEnd();
        if (this.shouldMaintainChildren() && recurse)
            for (let childStructure of [this.getOrganizationListing()])
                childStructure.log();
        console.groupEnd();
    }
}
export default AFClient;
//# sourceMappingURL=af-client.js.map