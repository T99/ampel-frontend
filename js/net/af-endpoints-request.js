/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:10 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import HTTPMethod from "../descriptors/http-method.js";
import TSObjectIterator from "../structures/implementations/iterate/ts-object-iterator.js";
/**
 * Describes the most basic form of an request to an Ampel endpoint.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFEndpointRequest {
    constructor(method, endpointPath) {
        this.path = "https://api.ampelfeedback.xyz";
        this.method = method;
        this.path += endpointPath;
    }
    // DOC-ME [12/16/18 @ 11:57 PM] - Documentation required!
    getMethod() {
        return this.method;
    }
    // DOC-ME [12/16/18 @ 11:40 PM] - Documentation required!
    getPath() {
        if (this.method !== HTTPMethod.GET || (this.method === HTTPMethod.GET && this.requestBody === undefined))
            return this.path;
        else {
            let uri = this.path + "?";
            let objectIterator = new TSObjectIterator(this.requestBody);
            objectIterator.forEachRemaining((element) => {
                uri += element.key;
                uri += "=";
                uri += element.value;
                if (objectIterator.hasNext())
                    uri += "&";
            });
            return uri;
        }
    }
    // DOC-ME [2/5/19 @ 12:02 AM] - Documentation required!
    getRawPath() {
        return this.path;
    }
    // DOC-ME [2/8/19 @ 12:34 AM] - Documentation required!
    setRequestBody(requestBody) {
        this.requestBody = requestBody;
    }
    /**
     * Returns true if this AFEndpointRequest has a request body associated with it.
     *
     * @returns {boolean} true if this AFEndpointRequest has a request body associated with it.
     */
    hasRequestBody() {
        if (this.method === HTTPMethod.GET)
            return false;
        else
            return (this.requestBody !== undefined);
    }
    /**
     * Gets the API token/JWT that is associated with this type of AFEndpointRequest.
     *
     * @returns {object} The API token/JWT that is associated with this type of AFEndpointRequest.
     */
    getRequestBody() {
        if (this.method !== HTTPMethod.GET)
            return this.requestBody;
        else
            return null;
    }
    getRawRequestBody() {
        return this.requestBody;
    }
    // DOC-ME [2/8/19 @ 12:34 AM] - Documentation required!
    setToken(token) {
        this.token = token;
    }
    /**
     * Returns true if this type of AFEndpointRequest has a required token associated with it.
     *
     * @returns {boolean} true if this type of AFEndpointRequest has a required token associated with it.
     */
    hasToken() {
        return (this.token !== undefined);
    }
    /**
     * Gets the API token/JWT that is associated with this type of AFEndpointRequest.
     *
     * @returns {string} The API token/JWT that is associated with this type of AFEndpointRequest.
     */
    getToken() {
        return this.token;
    }
}
export default AFEndpointRequest;
//# sourceMappingURL=af-endpoints-request.js.map