/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:00 AM -- October 09th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import GlobalModificationImplementations from "./declaration/global-modification-implementations.js";
import AFAPI from "./net/af-api.js";
import AFEndpointRequestBuilder from "./net/af-endpoint-request-builder.js";
import HTTPMethod from "./descriptors/http-method.js";
import TSBrowserSession from "./ts-browser-session.js";
import TSTypechecker from "./util/type-checking/ts-typechecker.js";
import TSStandardType from "./util/type-checking/types/ts-standard-type.js";
import TSArrayType from "./util/type-checking/types/ts-array-type.js";
import TSObjectType from "./util/type-checking/types/ts-object-type.js";
import TSObjectIterator from "./util/misc/iterate/ts-object-iterator.js";
import AFOrganizationEverythingResponseStructureType from "./net/response-structure-types/organization/af-organization-everything-response-structure-type.js";
import TSTimeoutHandler from "./util/misc/ts-timeout-handler.js";
import AFDashboard from "./af-dashboard.js";

declare global { var session: TSBrowserSession; }

const main: () => Promise<void> = async (): Promise<void> => {
	
	// Make global .d.ts (definition) modifications.
	GlobalModificationImplementations.makeModifications();
	
	// Ready the browser session.
	const session: TSBrowserSession = new TSBrowserSession(true);
	window["session"] = session;
	
	// Initialize the dashboard.
	AFDashboard.go();
	// (new AUIDashboardConfiguration()).make();
	
	// Attach helpers to the window object.
	window["AFAPI"] = AFAPI;
	window["AFEndpointRequestBuilder"] = AFEndpointRequestBuilder;
	window["HTTPMethod"] = HTTPMethod;
	window["TSTypechecker"] = TSTypechecker;
	window["TSStandardType"] = TSStandardType;
	window["TSArrayType"] = TSArrayType;
	window["TSObjectType"] = TSObjectType;
	window["TSObjectIterator"] = TSObjectIterator;
	window["AFOrganizationEverythingResponseStructureType"] = AFOrganizationEverythingResponseStructureType;
	window["TSTimeoutHandler"] = TSTimeoutHandler;

};

main();

// TODO [2/4/19 @ 11:24 PM] - Return to the problem of constant event listening.
// TODO [2/5/19 @ 1:48 AM] - Build a top-level Error handler.
// TODO [2/10/19 @ 2:39 PM] - Add 'transition' and 'will-change' CSS rule before transitioning pages and elements.
// TODO [3/18/19 @ 12:03 AM] - Finish 'refresh' methods on AFStructure classes.