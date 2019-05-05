/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:15 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import BuilderBase from "../helpers/builder-base.js";
import InvalidArgumentsError from "../errors/invalid-arguments-error.js";
import AFEndpointRequest from "./af-endpoints-request.js";
/**
 * A builder for {@link AFEndpointRequest}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFEndpointRequestBuilder extends BuilderBase {
    constructor() {
        super();
        this.addRequirements("httpMethod", "endpointPath");
        this.addOptionals("token", "requestBody");
    }
    withHTTPMethod(method) {
        this.fulfillRequirement("httpMethod", method);
        return this;
    }
    withEndpointPath(endpointPath) {
        this.fulfillRequirement("endpointPath", endpointPath);
        return this;
    }
    withRequestBody(requestBody) {
        this.fulfillRequirement("requestBody", requestBody);
        return this;
    }
    withToken(token) {
        this.fulfillRequirement("token", token);
        return this;
    }
    build() {
        if (this.checkFulfillment()) {
            let result = new AFEndpointRequest(this.getValueOfRequirement("httpMethod"), this.getValueOfRequirement("endpointPath"));
            if (this.checkFulfillment("requestBody"))
                result.setRequestBody(this.getValueOfRequirement("requestBody"));
            if (this.checkFulfillment("token"))
                result.setToken(this.getValueOfRequirement("token"));
            return result;
        }
        else
            throw new InvalidArgumentsError(this.getErrorMessageForIncompleteBuilder());
    }
}
export default AFEndpointRequestBuilder;
//# sourceMappingURL=af-endpoint-request-builder.js.map