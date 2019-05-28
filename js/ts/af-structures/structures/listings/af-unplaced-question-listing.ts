/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:54 PM -- March 23rd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClient from "../af-client.js";
import AFOrganization from "../af-organization.js";
import AFQuestionResponseStructure from "../../../net/response-structures/common/af-question-response-structure.js";
import AFConcreteStructureListing from "../../af-concrete-structure-listing.js";
import AFQuestion from "../af-question.js";
import AFSessionInformation from "../../information-contexts/af-session-information.js";
import AFClientInformation from "../../information-contexts/af-client-information.js";
import AFOrganizationInformation from "../../information-contexts/af-organization-information.js";
import AFSession from "../../af-session.js";
import AFAPIOrganizationAccessor from "../../../net/accessors/af-api-organization-accessor.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFUnplacedQuestionListing extends AFConcreteStructureListing<AFUnplacedQuestionListing, AFQuestion>
	implements AFSessionInformation, AFClientInformation, AFOrganizationInformation {
	
	protected organization: AFOrganization;
	
	protected constructor(organization: AFOrganization) {
	
		super();
		
		this.organization = organization;
	
	}
	
	public static async createWithAPIResponse(organization: AFOrganization,
											  questionResponses: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFUnplacedQuestionListing> {
		
		let questionListing: AFUnplacedQuestionListing = new AFUnplacedQuestionListing(organization);
		
		// for (let response of questionResponses) {
		//
		// 	// TODO [4/24/19 @ 6:11 PM] - Finish the 'createWithAPIResponse' method.
		//
		// }
		
		return questionListing;
		
	}
	
	public async refresh(questionResponses?: ReadonlyArray<AFQuestionResponseStructure>): Promise<AFUnplacedQuestionListing> {
		
		if (questionResponses === undefined) {
			
			questionResponses = await AFAPIOrganizationAccessor.getQuestions(this.getSession().getToken());
			
		}
		
		// for (let response of questionResponses) {
		//
		// 	// TODO [4/24/19 @ 6:11 PM] - Finish the 'refresh' method.
		//
		// }
		
		return undefined;
		
	}
	
	public getClient(): AFClient {
		
		return this.getOrganization().getClient();
		
	}
	
	public getOrganization(): AFOrganization {
		
		return this.organization;
		
	}
	
	public getSession(): AFSession {
		
		return this.getClient().getSession();
		
	}
	
	public log(recurse?: boolean): void {
	
	
	
	}
	
}

export default AFUnplacedQuestionListing;