/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:04 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import AFAPIError from "./af-api-error.js";
/**
 * A grab-bag of methods for accessing the Ampel API.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPI {
    constructor() { }
    static makeRequest(endpointRequest) {
        return new Promise((resolve, reject) => {
            { // Console output block.
                console.groupCollapsed("Making a " + endpointRequest.getMethod().toString() + " to '" + endpointRequest.getPath() + "'...");
                console.info("HTTP Method:\t\t%c" + endpointRequest.getMethod().toString(), "font-weight: bold");
                console.info("Endpoint Path:\t\t" + endpointRequest.getRawPath());
                console.info("Actual URI:\t\t" + endpointRequest.getPath());
                if (endpointRequest.hasToken())
                    console.info("Token:\t\t\t" + endpointRequest.getToken());
                else
                    console.info("Token:\t\t\t%cN/A", "font-style: italic");
                if (endpointRequest.hasRequestBody())
                    console.info("Request Body:\t\t", endpointRequest.getRequestBody());
                else
                    console.info("Request Body:\t\t%cN/A", "font-style: italic");
                if (endpointRequest.getRawRequestBody() !== undefined)
                    console.info("Request Parameters:\t", endpointRequest.getRawRequestBody());
                else
                    console.info("Request Parameters:\t%cN/A", "font-style: italic");
                console.groupEnd();
            }
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200)
                        resolve(JSON.parse(xhr.responseText));
                    else {
                        let error = new AFAPIError(xhr.status, xhr.statusText, JSON.parse(xhr.responseText));
                        reject(error);
                        throw error;
                    }
                }
            });
            xhr.open(endpointRequest.getMethod().toString(), endpointRequest.getPath(), true);
            if (endpointRequest.hasToken()) {
                xhr.setRequestHeader("Authorization", "Bearer " + endpointRequest.getToken());
            }
            if (endpointRequest.hasRequestBody()) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(endpointRequest.getRequestBody()));
            }
            else
                xhr.send();
        });
    }
}
AFAPI.BASE_URL = "https://api.ampelfeedback.xyz/";
export default AFAPI;
//# sourceMappingURL=af-api.js.map