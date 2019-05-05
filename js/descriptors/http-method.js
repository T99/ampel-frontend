/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:06 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates possible HTTP methods.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["CONNECT"] = "CONNECT";
    HTTPMethod["DELETE"] = "DELETE";
    HTTPMethod["GET"] = "GET";
    HTTPMethod["HEAD"] = "HEAD";
    HTTPMethod["OPTIONS"] = "OPTIONS";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));
export default HTTPMethod;
//# sourceMappingURL=http-method.js.map