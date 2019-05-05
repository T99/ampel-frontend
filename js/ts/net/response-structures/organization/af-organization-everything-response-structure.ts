/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:34 PM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFClientResponseStructure from "../common/af-client-response-structure.js";
import AFLocationResponseStructure from "../common/af-location-response-structure.js";
import AFDeviceResponseStructure from "../common/af-device-response-structure.js";
import AFFolderResponseStructure from "../common/af-folder-response-structure.js";
import AFQuestionResponseStructure from "../common/af-question-response-structure.js";
import AFOrganizationResponseStructure from "../common/af-organization-response-structure.js";

/**
 * 
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFOrganizationEverythingResponseStructure extends AFOrganizationResponseStructure {
	
	/*
	 * AFClient (Current Client/Signed-in Client)
	 *  |
	 *  \- AFOrganizationListing
	 *      |
	 *      \- AFOrganization[]
	 *          |
	 *          +- AFClientListing
	 *          |   |
	 *          |   \- AFClient[]
	 *          |
	 *          +- AFDeviceListing
	 *          |   |
	 *          |   \- AFDevice[]
	 *          |
	 *          +- AFFolderListing[]
	 *          |   |
	 *          |   \- AFFolder[]
	 *          |       |
	 *          |       \- AFQuestionListing
	 *          |           |
	 *          |           \- AFQuestion[]
	 *          |
	 *          +- AFLocationListing[]
	 *          |   |
	 *          |   \- AFLocation[]
	 *          |       |
	 *          |       \- AFDeviceListing
	 *          |           |
	 *          |           \- AFDevice[]
	 *          |
	 *          \- AFQuestionListing[]
	 *              |
	 *              \- AFQuestion[]
	 *          
	 */
	
	readonly clients: ReadonlyArray<AFClientResponseStructure>;
	
	readonly locations: ReadonlyArray<AFLocationResponseStructure>;
	
	readonly devices: ReadonlyArray<AFDeviceResponseStructure>;
	
	readonly folders: ReadonlyArray<AFFolderResponseStructure>;
	
	readonly questions: ReadonlyArray<AFQuestionResponseStructure>;
	
}

export default AFOrganizationEverythingResponseStructure;