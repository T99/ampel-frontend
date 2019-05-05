/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:53 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganizationListing from "./listings/af-organization-listing.js";
import AFGender from "../descriptors/af-gender.js";
import TSDate from "../../descriptors/time/ts-date.js";
import AFIDObject from "../af-id-object.js";
import AFStructure from "../af-structure.js";
import AFClientResponseStructure from "../../net/response-structures/common/af-client-response-structure.js";
import AFAPIClientAccessor from "../../net/accessors/af-api-client-accessor.js";
import AFOrganization from "./af-organization.js";
import TSDateBuilder from "../../descriptors/time/ts-date-builder.js";
import TSMonth from "../../descriptors/time/ts-month.js";
import AFPhoneNumber from "../descriptors/af-phone-number.js";
import AFSessionInformation from "../information-contexts/af-session-information.js";
import AFSession from "../af-session.js";

/**
 * A signed-in client of Ampel's.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 * @see AFCurrentClient
 */
class AFClient extends AFStructure<AFClient> implements AFIDObject, AFSessionInformation {
	
	/**
	 * The ID of this {@link AFClient}.
	 *
	 * @type {string}
	 */
	private id: string;
	
	/**
	 * The first name of this {@link AFClient}.
	 *
	 * @type {string}
	 */
	private firstName: string;
	
	/**
	 * The last name of this {@link AFClient}.
	 *
	 * @type {string}
	 */
	private lastName: string;
	
	/**
	 * The email address of this {@link AFClient}.
	 *
	 * @type {string}
	 */
	private email: string;
	
	/**
	 * The phone number of this {@link AFClient}.
	 *
	 * @type {AFPhoneNumber}
	 */
	private phoneNumber: AFPhoneNumber;
	
	/**
	 * The gender of this {@link AFClient}.
	 *
	 * @type {AFGender}
	 */
	private gender: AFGender;
	
	/**
	 * The birthday of this {@link AFClient}.
	 *
	 * @type {TSDate}
	 */
	private birthday: TSDate;
	
	private session: AFSession;
	
	private organizationListing: AFOrganizationListing;
	
	/**
	 * Initializes a new {@link AFClient} with a given token.
	 *
	 * @param session {AFSession} The session to which this AFClient belongs.
	 * @param shouldMaintainChildren {boolean} A boolean value indicating whether or not this client should maintain its
	 * own subset of information (belonging organizations, locations, etc).
	 */
	protected constructor(session: AFSession, shouldMaintainChildren: boolean) {
		
		super(shouldMaintainChildren);
		
		this.session = session;
		
	}
	
	public static async createAsSessionOwner(session: AFSession, clientID: string): Promise<AFClient> {
	
		let client: AFClient = new AFClient(session, true);
		
		client.id = clientID;
		
		await client.refresh();
		
		client.organizationListing = await AFOrganizationListing.createForClient(client, false);
		
		return client;
	
	}
	
	public static async createAsOrganizationChild(session: AFSession, clientResponse?: AFClientResponseStructure): Promise<AFClient> {
		
		let client: AFClient = new AFClient(session, false);
		
		await client.refresh(clientResponse);
		
		return client;
		
	}
	
	/**
	 * Refreshes the information in this {@link AFClient} with the corresponding information from the API.
	 *
	 * @returns {Promise<void>} A Promise that resolves once the information has been refreshed.
	 */
	public async refresh(clientResponse?: AFClientResponseStructure): Promise<AFClient> {

		let response: AFClientResponseStructure;
		
		if (clientResponse === undefined) response = await AFAPIClientAccessor.getBaseForID(this.getSession().getToken(), this.getID());
		else response = clientResponse;
		
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
		
	}
	
	public getFirstName(): string {
		
		return this.firstName;
		
	}
	
	public getLastName(): string {
		
		return this.lastName;
		
	}
	
	public getFullName(): string {
		
		return (this.firstName + " " + this.lastName);
		
	}
	
	public getEmail(): string {
		
		return this.email;
		
	}
	
	public getPhoneNumber(): AFPhoneNumber {
		
		return this.phoneNumber;
		
	}
	
	public getGender(): AFGender {
		
		return this.gender;
		
	}
	
	public getBirthday(): TSDate {
		
		return this.birthday;
		
	}
	
	public isAdmin(): boolean {
	
		return (this.isSessionClient() && this.getSession().isAdminSession());
	
	}
	
	public isSessionClient(): boolean {
		
		return (this.getSession().hasClient() && (this.getSession().getClient().getID() === this.getID()));
		
	}
	
	public getID(): string {
		
		return this.id;
		
	}
	
	public getName(): string {
		
		return this.getFullName();
		
	}
	
	public getSession(): AFSession {
		
		return this.session;
		
	}
	
	public getOrganizationListing(): AFOrganizationListing {
		
		return this.organizationListing;
		
	}
	
	protected getChildrenStructures(): AFOrganization[] {
		
		return this.getOrganizationListing().getAllSignedInOrganizations();
		
	}
	
	public log(recurse: boolean = true): void {
		
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
		
		if (this.shouldMaintainChildren() && recurse) for (let childStructure of [ this.getOrganizationListing() ]) childStructure.log();
		
		console.groupEnd();
		
	}
}

export default AFClient;