/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:35 AM -- May 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganizationResponseStructureType from "../common/af-organization-response-structure-type.js";
import TSType from "../../../util/type-checking/types/ts-type.js";
import TSArrayType from "../../../util/type-checking/types/ts-array-type.js";
import AFClientResponseStructureType from "../common/af-client-response-structure-type.js";
import TSObjectType from "../../../util/type-checking/types/ts-object-type.js";
import AFLocationResponseStructureType from "../common/af-location-response-structure-type.js";
import AFDeviceResponseStructureType from "../common/af-device-response-structure-type.js";
import AFFolderResponseStructureType from "../common/af-folder-response-structure-type.js";
import AFQuestionResponseStructureType from "../common/af-question-response-structure-type.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFOrganizationEverythingResponseStructureType extends AFOrganizationResponseStructureType {
	
	public readonly clients: TSType = new TSArrayType(new TSObjectType(new AFClientResponseStructureType));
	
	public readonly locations: TSType = new TSArrayType(new TSObjectType(new AFLocationResponseStructureType()));
	
	public readonly devices: TSType = new TSArrayType(new TSObjectType(new AFDeviceResponseStructureType()));
	
	public readonly folders: TSType = new TSArrayType(new TSObjectType(new AFFolderResponseStructureType()));
	
	public readonly questions: TSType = new TSArrayType(new TSObjectType(new AFQuestionResponseStructureType()));
	
}

export default AFOrganizationEverythingResponseStructureType;