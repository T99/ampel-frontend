/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:42 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "../../jui/jui-page.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../jui/elements/single-containers/jui-alignment-container.js";
import AUISignInModule from "./aui-sign-in-module.js";
import JUIContainerable from "../../jui/jui-containerable.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUITransition from "../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../jui/animations/transition-functions/jui-named-transition-function.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import AFClient from "../../af-structures/structures/af-client.js";
import JUISubscription from "../../jui/action/jui-subscription.js";
import AFOrganizationListing from "../../af-structures/structures/listings/af-organization-listing.js";
import JUIWorld from "../../jui/jui-world.js";
import AFOrganization from "../../af-structures/structures/af-organization.js";
import AFFolderListing from "../../af-structures/structures/listings/af-folder-listing.js";
import AFFolder from "../../af-structures/structures/af-folder.js";
import AUIStructureSelectorModule from "./aui-structure-selector-module.js";
import AFLocationListing from "../../af-structures/structures/listings/af-location-listing.js";
import AFLocation from "../../af-structures/structures/af-location.js";
import AFDeviceListing from "../../af-structures/structures/listings/af-device-listing.js";
import AFDevice from "../../af-structures/structures/af-device.js";
import AUIActivitySelectorModule from "./aui-activity-selector-module.js";
import AUIUserActivity from "../global/aui-user-activity.js";
import AUINotification from "../global/aui-notification.js";
import AUIKioskPageOld from "../pages/kiosk-old/aui-kiosk-page-old.js";

type SplashViewEnumeration = { [ splashView: string ]: SplashView };
type SplashView = {
	
	NAME: string,
	INDEX: number
	
};

/**
 * A standard splash page for AUI.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISplashPage extends JUIPage {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-splash-page";
	
	private static readonly VIEW_ENUMERATION: SplashViewEnumeration = {
		
		SIGN_IN: {
			
			NAME: "SIGN_IN",
			INDEX: 0
			
		},
		
		TFA: {
			
			NAME: "TFA",
			INDEX: 1
			
		},
		
		ORGANIZATION_SELECTOR: {
			
			NAME: "ORGANIZATION_SELECTOR",
			INDEX: 2
			
		},
		
		LOCATION_SELECTOR: {
			
			NAME: "LOCATION_SELECTOR",
			INDEX: 3
			
		},
		
		DEVICE_SELECTOR: {
			
			NAME: "DEVICE_SELECTOR",
			INDEX: 4
			
		},
		
		FOLDER_SELECTOR: {
			
			NAME: "FOLDER_SELECTOR",
			INDEX: 5
			
		},
		
		ACTIVITY_SELECTOR: {
			
			NAME: "ACTIVITY_SELECTOR",
			INDEX: 6
			
		}
		
	};
	
	private innerFlowContainer: JUIFlowContainer;
	
	private focusElement: JUIAlignmentContainer<JUIContainerable>;
	
	private currentView: SplashView = AUISplashPage.VIEW_ENUMERATION.SIGN_IN;
	
	private signInSubscription: JUISubscription<AFClient>;
	
	private backButtonSubscription: JUISubscription<void>;
	
	private organizationSelectionSubscription: JUISubscription<AFOrganization>;
	
	private locationSelectionSubscription: JUISubscription<AFLocation>;
	
	private deviceSelectionSubscription: JUISubscription<AFDevice>;
	
	private folderSelectionSubscription: JUISubscription<AFFolder>;
	
	private activitySelectionSubscription: JUISubscription<AUIUserActivity>;
	
	private activeOrganizationListing: AFOrganizationListing;
	
	private activeLocationListing: AFLocationListing;
	
	private activeDeviceListing: AFDeviceListing;
	
	public constructor() {
		
		super(JUIAlignment.CENTER);
		this.addClasses(this.TYPE_IDENTITY);
		
		this.innerFlowContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
		let signInModule: AUISignInModule = new AUISignInModule();
		
		this.focusElement = AUISplashPage.containerizeSplashContainer(signInModule);
		this.focusElement.getHTMLElement().style.flexShrink = "0";
		
		this.innerFlowContainer.addChildren(this.focusElement);
		
		this.innerFlowContainer.getHTMLElement().style.height = "100%";
		this.innerFlowContainer.getHTMLElement().style.width = "100%";
		
		this.signInSubscription = signInModule.subscribeToSignInNotifier((client: AFClient): any => this.proceedFromClient(client));
		
		this.setChild(this.innerFlowContainer);
		
	}
	
	private static containerizeSplashContainer(element: JUIContainerable): JUIAlignmentContainer<JUIContainerable> {
		
		let alignmentContainer: JUIAlignmentContainer<JUIContainerable> = new JUIAlignmentContainer<JUIContainerable>(JUIAlignment.CENTER);
		
		alignmentContainer.setChild(element);
		
		alignmentContainer.getHTMLElement().style.height = "100%";
		alignmentContainer.getHTMLElement().style.width = "100%";
		
		return alignmentContainer;
		
	}
	
	private transitionTo(element: JUIContainerable, view: SplashView): JUITransition {
		
		if (this.currentView.INDEX === view.INDEX) return JUITransition.getZeroLengthTransition();
		
		let directionIsRight: boolean = (this.currentView.INDEX < view.INDEX);
		
		let oldFocusElement: JUIAlignmentContainer<JUIContainerable> = this.focusElement;
		
		let transition: JUITransition = new JUITransition(
			2000,
			JUINamedTransitionFunction.EASE_IN_OUT,
			(progress: number): void => {
				
				this.innerFlowContainer.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
				
			},
			[this.innerFlowContainer],
			0,
			(directionIsRight ? -100 : 100)
		);
		
		transition.addPreAction(() => {
			
			this.focusElement = AUISplashPage.containerizeSplashContainer(element);
			this.focusElement.getHTMLElement().style.flexShrink = "0";
			
			if (directionIsRight) {
				
				this.innerFlowContainer.setDirection(JUIDirection.TO_RIGHT);
				this.innerFlowContainer.setAlignment(JUIAlignment.LEFT);
				
			} else {
				
				this.innerFlowContainer.setDirection(JUIDirection.TO_LEFT);
				this.innerFlowContainer.setAlignment(JUIAlignment.RIGHT);
				
			}
			
			this.innerFlowContainer.addChild(this.focusElement);
			
		});
		
		transition.play().then(() => {
			
			this.innerFlowContainer.removeChild(oldFocusElement.getID());
			this.innerFlowContainer.getHTMLElement().style.transform = null;
			this.setAlignment(JUIAlignment.CENTER);
			this.innerFlowContainer.setAlignment(JUIAlignment.CENTER);
			
		});
		
		return transition;
		
	}
	
	private cleanUpFromView(view: SplashView): void {
		
		switch (view.NAME) {
			
			case "SIGN_IN": {
				if (this.signInSubscription !== undefined) {
					
					this.signInSubscription.unsubscribe();
					this.signInSubscription = undefined;
					
				}
				
				break;
				
			}
			
			case "ORGANIZATION_SELECTOR": {
				if (this.organizationSelectionSubscription !== undefined) {
					
					this.organizationSelectionSubscription.unsubscribe();
					this.organizationSelectionSubscription = undefined;
					
				}
				
				break;
				
			}
			
			case "LOCATION_SELECTOR": {
				if (this.locationSelectionSubscription !== undefined) {
					
					this.locationSelectionSubscription.unsubscribe();
					this.locationSelectionSubscription = undefined;
					
				}
				
				break;
				
			}
			
			case "DEVICE_SELECTOR": {
				if (this.deviceSelectionSubscription !== undefined) {
					
					this.deviceSelectionSubscription.unsubscribe();
					this.deviceSelectionSubscription = undefined;
					
				}
				
				break;
				
			}
			
			case "FOLDER_SELECTOR": {
				if (this.folderSelectionSubscription !== undefined) {
					
					this.folderSelectionSubscription.unsubscribe();
					this.folderSelectionSubscription = undefined;
					
				}
				
				if (this.backButtonSubscription !== undefined) {
					
					this.backButtonSubscription.unsubscribe();
					this.backButtonSubscription = undefined;
					
				}
				
				break;
				
			}
			
		}
		
	}
	
	private async proceedFromClient(client: AFClient): Promise<void> {
		
		if (client.getOrganizationListing().size() === 1) this.proceedFromOrganization(client.getOrganizationListing().getAll()[0]);
		else this.goToOrganizationSelector(client.getOrganizationListing());
		
	}
	
	private async proceedFromOrganization(organization: AFOrganization): Promise<void> {
		
		await session.getAmpelSession().setOrganization(organization.getID());
		
		if (organization.getLocationListing().size() === 1) this.proceedFromLocation(organization.getLocationListing().getAll()[0]);
		else this.goToLocationSelector(organization.getLocationListing());
		
	}
	
	private async proceedFromLocation(location: AFLocation): Promise<void> {
		
		await session.getAmpelSession().setLocation(location.getID());
	
		if (location.getDeviceListing().size() === 1) this.proceedFromDevice(location.getDeviceListing().getAll()[0]);
		else this.goToDeviceSelector(location.getDeviceListing());
	
	}
	
	private async proceedFromDevice(device: AFDevice): Promise<void> {
		
		let signedInDevice: AFDevice = await session.getAmpelSession().setDevice(device.getID());
		
		// JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld(signedInDevice.getDefaultFolder()));
		await this.goToActivitySelector();
	
	}
	
	private async proceedFromActivity(activity: AUIUserActivity): Promise<void> {
		
		switch (activity) {
			
			case AUIUserActivity.KIOSK:
				JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld(session.getAmpelSession().getDevice().getDefaultFolder()));
				break;
			
			case AUIUserActivity.CONTACT_CAPTURE:
				new AUINotification("Attempted to start contact capture mode, but this mode is not yet available...");
				break;
			
			case AUIUserActivity.KIOSK_THEN_CONTACT_CAPTURE:
				new AUINotification("Attempted to start kiosk with contact capture mode, but this mode is not yet available...");
				break;
			
			case AUIUserActivity.CONTACT_CAPTURE_THEN_KIOSK:
				new AUINotification("Attempted to start contact capture with kiosk mode, but this mode is not yet available...");
				break;
			
		}
		
	}
	
	private async goToOrganizationSelector(organizationListing: AFOrganizationListing): Promise<void> {
		
		this.activeOrganizationListing = organizationListing;
		
		let organizationSelector: AUIStructureSelectorModule<AFOrganization, AFOrganizationListing>
			= new AUIStructureSelectorModule<AFOrganization, AFOrganizationListing>(
			organizationListing,
			"organization",
			"Whoops! Looks like you don't belong to any organizations! Join one, then head back here!"
		);
		
		// TODO [2/12/19 @ 12:30 AM] - Subscribe to back button notifier.
		
		this.organizationSelectionSubscription = organizationSelector.subscribeToSelectionNotifier(
			(organization: AFOrganization) => this.proceedFromOrganization(organization)
		);
		
		let transition: JUITransition = this.transitionTo(organizationSelector, AUISplashPage.VIEW_ENUMERATION.ORGANIZATION_SELECTOR);
		this.cleanUpFromView(this.currentView);
		this.currentView = AUISplashPage.VIEW_ENUMERATION.ORGANIZATION_SELECTOR;
		await transition.getTransitionPromise();
		
	}
	
	private async goToLocationSelector(locationListing: AFLocationListing): Promise<void> {
		
		this.activeLocationListing = locationListing;
		
		let locationSelector: AUIStructureSelectorModule<AFLocation, AFLocationListing>
			= new AUIStructureSelectorModule<AFLocation, AFLocationListing>(
			locationListing,
			"location",
			"Whoops! Looks like this organization doesn't have any locations! Add one, then head back here!"
		);
		
		this.backButtonSubscription = locationSelector.subscribeToBackButtonNotifier(
			() => {
				
				// TODO [3/27/19 @ 1:57 AM] - Go back to sign-in if there's only 1 organization.
				this.goToOrganizationSelector(this.activeOrganizationListing);
				
			}
		);
		
		this.locationSelectionSubscription = locationSelector.subscribeToSelectionNotifier(
			(location: AFLocation): any => this.proceedFromLocation(location)
		);
		
		let transition: JUITransition = this.transitionTo(locationSelector, AUISplashPage.VIEW_ENUMERATION.LOCATION_SELECTOR);
		
		this.cleanUpFromView(this.currentView);
		this.currentView = AUISplashPage.VIEW_ENUMERATION.LOCATION_SELECTOR;
		
		await transition.getTransitionPromise();
		
	}
	
	private async goToDeviceSelector(deviceListing: AFDeviceListing): Promise<void> {
		
		this.activeDeviceListing = deviceListing;
		
		let deviceSelector: AUIStructureSelectorModule<AFDevice, AFDeviceListing>
			= new AUIStructureSelectorModule<AFDevice, AFDeviceListing>(
			deviceListing,
			"device",
			"Whoops! Looks like this organization doesn't have any devices! Add one, then head back here!"
		);
		
		this.backButtonSubscription = deviceSelector.subscribeToBackButtonNotifier(
			() => this.goToLocationSelector(this.activeLocationListing)
		);
		
		this.deviceSelectionSubscription = deviceSelector.subscribeToSelectionNotifier(
			(device: AFDevice): any => this.proceedFromDevice(device)
		);
		
		let transition: JUITransition = this.transitionTo(deviceSelector, AUISplashPage.VIEW_ENUMERATION.DEVICE_SELECTOR);
		this.cleanUpFromView(this.currentView);
		this.currentView = AUISplashPage.VIEW_ENUMERATION.DEVICE_SELECTOR;
		
		await transition.getTransitionPromise();
		
	}
	
	private async goToFolderSelector(folderListing: AFFolderListing): Promise<void> {
		
		return new Promise<void>((resolve: () => void, reject: () => void): void => {
			
			let folderSelector: AUIStructureSelectorModule<AFFolder, AFFolderListing>
				= new AUIStructureSelectorModule<AFFolder, AFFolderListing>(
				folderListing,
				"folder",
				"Whoops! Looks like this organization doesn't have any folders! Try adding one, then head back here!"
			);
			
			this.backButtonSubscription = folderSelector.subscribeToBackButtonNotifier(
				(): any => this.goToDeviceSelector(this.activeDeviceListing)
			);
			
			this.folderSelectionSubscription = folderSelector.subscribeToSelectionNotifier(
				(folder: AFFolder): any => JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld(folder))
			);
			
			let transition: JUITransition = this.transitionTo(folderSelector, AUISplashPage.VIEW_ENUMERATION.FOLDER_SELECTOR);
			this.cleanUpFromView(this.currentView);
			this.currentView = AUISplashPage.VIEW_ENUMERATION.FOLDER_SELECTOR;
			transition.getTransitionPromise().then((): any => resolve());
			
		});
		
	}
	
	private async goToActivitySelector(): Promise<void> {
	
		let activitySelector: AUIActivitySelectorModule = new AUIActivitySelectorModule();
		
		this.backButtonSubscription = activitySelector.subscribeToBackButtonNotifier(
			(): any => this.goToDeviceSelector(this.activeDeviceListing)
		);
		
		this.activitySelectionSubscription = activitySelector.subscribeToSelectionNotifier(
			(activity: AUIUserActivity): any => this.proceedFromActivity(activity)
		);
		
		let transition: JUITransition = this.transitionTo(activitySelector, AUISplashPage.VIEW_ENUMERATION.ACTIVITY_SELECTOR);
		this.cleanUpFromView(this.currentView);
		this.currentView = AUISplashPage.VIEW_ENUMERATION.ACTIVITY_SELECTOR;
		
		await transition.getTransitionPromise();
	
	}
	
}

export default AUISplashPage;