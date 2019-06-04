/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:28 PM -- May 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "../../jui/jui-page.js";
import JUIFlowContainer from "../../jui/elements/containers/multi-containers/jui-flow-container.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIContainerType from "../../jui/types/element-types/jui-container-type.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUITextLabel from "../global/aui-text-label.js";
import JUITextLeafType from "../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";
import AUIActivityDrawer from "../global/aui-activity-drawer.js";
import AFKioskActivity from "../../af-activities/af-kiosk-activity.js";
import JUIScrollContainer from "../../jui/elements/containers/single-containers/jui-scroll-container.js";
import JUIVerticalContainer from "../../jui/elements/containers/multi-containers/jui-vertical-container.js";
import AUINotification from "../global/aui-notification.js";
import TSBrowserSession from "../../ts-browser-session.js";
import JUIWorld from "../../jui/jui-world.js";
import AUISplashPage from "../splash/aui-splash-page.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIDashboardPage extends JUIPage {
	
	public readonly TYPE_IDENTITY: string = "aui-dashboard-page";
	
	private mainFlowContainer: JUIFlowContainer;
	
	private header: JUIFlowContainer;
	
	private leftHeader: JUIFlowContainer;
	
	private rightHeader: JUIFlowContainer;
	
	private main: JUIFlowContainer;
	
	private mainScroller: JUIScrollContainer<JUIVerticalContainer>;
	
	private activityDrawerWrapper: JUIVerticalContainer<AUIActivityDrawer>;
	
	private footer: JUIFlowContainer;
	
	public constructor() {
	
		super();
		this.addClasses(this.TYPE_IDENTITY);
		
		this.mainFlowContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		
		this.header = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER, undefined, JUIContainerType.HEADER);
		
		this.leftHeader = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.LEFT);
		
		this.rightHeader = new JUIFlowContainer(JUIDirection.TO_LEFT, JUIAlignment.RIGHT);
		
		this.leftHeader.addClasses("left-header");
		this.rightHeader.addClasses("right-header");
		
		this.leftHeader.addChildren(
			new JUIImageLeaf("/img/main-icon.png"),
			new AUITextLabel("Ampel Feedback", JUITextLeafType.H3)
		);
		
		this.header.addChildren(this.leftHeader, this.rightHeader);
		
		this.main = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER, undefined, JUIContainerType.MAIN);
		this.mainScroller = new JUIScrollContainer<JUIVerticalContainer>(true, false);
		this.activityDrawerWrapper = new JUIVerticalContainer<AUIActivityDrawer>();
		
		this.activityDrawerWrapper.addChildren(
			new AUIActivityDrawer("Kiosk Activities", true, [
				{
					name: "Pure Kiosk",
					activity: (): Promise<any> => AFKioskActivity.create(session.getAmpelSession().getDevice().getDefaultFolder())
				},
				{
					name: "Pure Contact Capture",
					activity: (): Promise<any> => AFKioskActivity.create(session.getAmpelSession().getDevice().getDefaultFolder())
				},
				{
					name: "Kiosk to contact capture",
					activity: (): Promise<any> => AFKioskActivity.create(session.getAmpelSession().getDevice().getDefaultFolder())
				},
				{
					name: "Contact capture to kiosk",
					activity: (): Promise<any> => AFKioskActivity.create(session.getAmpelSession().getDevice().getDefaultFolder())
				}
			]),
			new AUIActivityDrawer("Reporting", false, [
				{
					name: "Access my reports",
					activity: (): any => new AUINotification("This feature is not yet live.")
				},
				{
					name: "Live Feedback",
					activity: (): any => new AUINotification("This feature is not yet live.")
				},
				{
					name: "Export data to CSV",
					activity: (): any => window.location.href = "https://api.ampelfeedback.xyz/reporting/csv?token=" + session.getAmpelSession().getToken()
				}
			]),
			new AUIActivityDrawer("My Account", false, [
				{
					name: "Account Settings",
					activity: (): any => new AUINotification("This feature is not yet live.")
				},
				{
					name: "Sign-out",
					activity: (): Promise<void> => {
						
						window["session"] = new TSBrowserSession(true);
						return JUIWorld.getInstance().goToPageLeft(new AUISplashPage());
						
					}
				}
			]),
			new AUIActivityDrawer("My Organization", false, [
				{
					name: "Organization Settings",
					activity: (): any => new AUINotification("This feature is not yet live.")
				},
				{
					name: "Switch Organization",
					activity: async (): Promise<any> => {
						
						let page: AUISplashPage = new AUISplashPage();
						await page.goToOrganizationSelector(session.getAmpelSession().getClient().getOrganizationListing());
						
						return JUIWorld.getInstance().goToPageLeft(page);
						
					}
				}
			]),
			new AUIActivityDrawer("Extra drawer...", false, [
				{
					name: "Misc drawer item #1",
					activity: (): any => new AUINotification("This doesn't do anything!")
				},
				{
					name: "Misc drawer item #2",
					activity: (): any => new AUINotification("This doesn't do anything!")
				},
				{
					name: "Misc drawer item #3",
					activity: (): any => new AUINotification("This doesn't do anything!")
				}
			])
		);
		
		this.mainScroller.setChild(this.activityDrawerWrapper);
		
		this.main.addChild(this.mainScroller);
		
		this.footer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.LEFT, undefined, JUIContainerType.FOOTER);
		
		this.mainFlowContainer.addChildren(this.header, this.main, this.footer);
		
		this.setChild(this.mainFlowContainer);
	
	}
	
}

export default AUIDashboardPage;