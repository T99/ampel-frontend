/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:56 PM -- March 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSBrowserIdentifier {
    constructor() { }
    /**
     * This method returns true if the browser on which it is being run is either Safari, OR Chrome/Firefox on iOS due
     * to the fact that iOS Chrome and iOS Firefox both use the Safari engine 'under the hood'.
     *
     * @returns {boolean} true if the current browser is Safari or a Safari 'reskin'.
     */
    static isSafari() {
        return navigator.vendor && navigator.vendor.indexOf("Apple") > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf("CriOS") === -1 &&
            navigator.userAgent.indexOf("FxiOS") === -1;
    }
}
export default TSBrowserIdentifier;
//# sourceMappingURL=ts-browser-identifier.js.map