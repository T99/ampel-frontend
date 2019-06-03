/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:15 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import BuilderBase from "../helpers/builder-base.js";
import InvalidArgumentsError from "../errors/invalid-arguments-error.js";
import HTTPMethod from "../descriptors/http-method.js";
import AFEndpointRequest from "./af-endpoints-request.js";
import AFAPIContentType from "./af-api-content-type.js";

/**
 * A builder for {@link AFEndpointRequest}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFEndpointRequestBuilder extends BuilderBase<AFEndpointRequest> {
	
	public constructor() {
		
		super();
		
		this.addRequirements(
			"httpMethod",
			"endpointPath"
		);
		
		this.addOptionals(
			"token",
			"requestBody",
			"expectedContentType"
		);
		
	}
	
	public withHTTPMethod(method: HTTPMethod): AFEndpointRequestBuilder {
		
		this.fulfillRequirement("httpMethod", method);
		
		return this;
		
	}
	
	public withEndpointPath(endpointPath: string): AFEndpointRequestBuilder {
		
		this.fulfillRequirement("endpointPath", endpointPath);
		
		return this;
		
	}
	
	public withRequestBody(requestBody: any): AFEndpointRequestBuilder {
		
		this.fulfillRequirement("requestBody", requestBody);
		
		return this;
		
	}
	
	public withToken(token: string): AFEndpointRequestBuilder {
		
		this.fulfillRequirement("token", token);
		
		return this;
		
	}
	
	public withExpectedContentType(contentType: AFAPIContentType): AFEndpointRequestBuilder {
		
		this.fulfillRequirement("expectedContentType", contentType);
		
		return this;
		
	}
	
	public build(): AFEndpointRequest {
		
		if (this.checkFulfillment()) {
			
			let result: AFEndpointRequest = new AFEndpointRequest(
				this.getValueOfRequirement("httpMethod"),
				this.getValueOfRequirement("endpointPath")
			);
			
			if (this.checkFulfillment("requestBody")) result.setRequestBody(this.getValueOfRequirement("requestBody"));
			if (this.checkFulfillment("token")) result.setToken(this.getValueOfRequirement("token"));
			if (this.checkFulfillment("expectedContentType")) result.setResponseContentType(this.getValueOfRequirement("expectedContentType"));
			
			return result;
			
		} else throw new InvalidArgumentsError(this.getErrorMessageForIncompleteBuilder());
		
	}
	
}

export default AFEndpointRequestBuilder;