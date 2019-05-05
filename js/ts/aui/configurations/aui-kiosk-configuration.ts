/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:49 PM -- January 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIWorld from "../../jui/jui-world.js";
import AFFolder from "../../af-structures/structures/af-folder.js";
import AFClient from "../../af-structures/structures/af-client.js";
import AFOrganization from "../../af-structures/structures/af-organization.js";
import AFLocation from "../../af-structures/structures/af-location.js";
import AFDevice from "../../af-structures/structures/af-device.js";
import AUIKioskPageOld from "../pages/kiosk-old/aui-kiosk-page-old.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskConfiguration {
	
	public constructor() { /* Do nothing. */ }
	
	public async make(): Promise<void> {
		
		console.log("Making configuration: AUIKioskConfiguration");
		
		await session.getAmpelSession().initializeSession("trevor@ampelfeedback.com", "password");
		
		let client: AFClient = session.getAmpelSession().getClient();
		let organization: AFOrganization = await session.getAmpelSession().setOrganization(client.getOrganizationListing().getAll()[1].getID());
		let location: AFLocation = organization.getLocationListing().getAll()[0];
		let device: AFDevice = await session.getAmpelSession().setDevice(location.getDeviceListing().getAll()[0].getID());
		let folder: AFFolder = organization.getFolderListing().getAll()[0];
		
		console.log("Using the device '" + device.getName() + "' and starting the folder '" + folder.getName() + "'...");
		
		JUIWorld.getInstance().setPage(new AUIKioskPageOld(folder));
		
	}
	
}

export default AUIKioskConfiguration;