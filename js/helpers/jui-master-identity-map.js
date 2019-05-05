/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:11 AM -- December 07th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIIdentityMap from "./jui-identity-map.js";
/**
 * The master {@link JUIIdentityMap}, all other IdentityMaps are children of this master map.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIMasterIdentityMap extends JUIIdentityMap {
    /**
     * Initializes a new JUIMasterIdentityMap.
     */
    constructor() {
        super({ CONTENT_PATTERN: "3l3n" });
    }
    /**
     * Returns the Singleton instance of the MasterIdentityMap.
     *
     * @returns {JUIIdentityMap<JUIContainerable>} The Singleton instance of the MasterIdentityMap.
     */
    static getInstance() {
        if (this.instance == undefined)
            this.instance = new JUIMasterIdentityMap();
        return this.instance;
    }
}
export default JUIMasterIdentityMap;
//# sourceMappingURL=jui-master-identity-map.js.map