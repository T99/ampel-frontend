/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:12 PM -- February 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFOrganizationResponseStructure from "../common/af-organization-response-structure.js";

/**
 * The structure of the response when attempting to get all organizations about an organization via its token.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 * @see AFGetOrganizationsForClientEndpointRequest
 */
interface AFGetOrganizationsForClientResponseStructure extends ReadonlyArray<AFOrganizationResponseStructure> { /* Tagging interface only. */ }

export default AFGetOrganizationsForClientResponseStructure;