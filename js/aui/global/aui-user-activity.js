/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:26 PM -- April 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
var AUIUserActivity;
(function (AUIUserActivity) {
    AUIUserActivity[AUIUserActivity["KIOSK"] = 0] = "KIOSK";
    AUIUserActivity[AUIUserActivity["CONTACT_CAPTURE"] = 1] = "CONTACT_CAPTURE";
    AUIUserActivity[AUIUserActivity["KIOSK_THEN_CONTACT_CAPTURE"] = 2] = "KIOSK_THEN_CONTACT_CAPTURE";
    AUIUserActivity[AUIUserActivity["CONTACT_CAPTURE_THEN_KIOSK"] = 3] = "CONTACT_CAPTURE_THEN_KIOSK";
})(AUIUserActivity || (AUIUserActivity = {}));
export default AUIUserActivity;
//# sourceMappingURL=aui-user-activity.js.map