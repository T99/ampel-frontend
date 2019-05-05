/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:42 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JUIPage from "../../jui/jui-page.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIAlignmentContainer from "../../jui/elements/single-containers/jui-alignment-container.js";
import AUISignInModule from "./aui-sign-in-module.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import JUITransition from "../../jui/animations/jui-transition.js";
import JUINamedTransitionFunction from "../../jui/animations/transition-functions/jui-named-transition-function.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";
import JUIWorld from "../../jui/jui-world.js";
import AUIStructureSelectorModule from "./aui-structure-selector-module.js";
import AUIActivitySelectorModule from "./aui-activity-selector-module.js";
import AUIUserActivity from "../global/aui-user-activity.js";
import AUINotification from "../global/aui-notification.js";
import AUIKioskPageOld from "../pages/kiosk-old/aui-kiosk-page-old.js";
/**
 * A standard splash page for AUI.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISplashPage extends JUIPage {
    constructor() {
        super(JUIAlignment.CENTER);
        /**
         * A String that represents the identity of the type that is being identified.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "aui-splash-page";
        this.currentView = AUISplashPage.VIEW_ENUMERATION.SIGN_IN;
        this.addClasses(this.TYPE_IDENTITY);
        this.innerFlowContainer = new JUIFlowContainer(JUIDirection.TO_RIGHT, JUIAlignment.CENTER);
        let signInModule = new AUISignInModule();
        this.focusElement = AUISplashPage.containerizeSplashContainer(signInModule);
        this.focusElement.getHTMLElement().style.flexShrink = "0";
        this.innerFlowContainer.addChildren(this.focusElement);
        this.innerFlowContainer.getHTMLElement().style.height = "100%";
        this.innerFlowContainer.getHTMLElement().style.width = "100%";
        this.signInSubscription = signInModule.subscribeToSignInNotifier((client) => this.proceedFromClient(client));
        this.setChild(this.innerFlowContainer);
    }
    static containerizeSplashContainer(element) {
        let alignmentContainer = new JUIAlignmentContainer(JUIAlignment.CENTER);
        alignmentContainer.setChild(element);
        alignmentContainer.getHTMLElement().style.height = "100%";
        alignmentContainer.getHTMLElement().style.width = "100%";
        return alignmentContainer;
    }
    transitionTo(element, view) {
        if (this.currentView.INDEX === view.INDEX)
            return JUITransition.getZeroLengthTransition();
        let directionIsRight = (this.currentView.INDEX < view.INDEX);
        let oldFocusElement = this.focusElement;
        let transition = new JUITransition(2000, JUINamedTransitionFunction.EASE_IN_OUT, (progress) => {
            this.innerFlowContainer.getHTMLElement().style.transform = "translateX(" + progress + "vw)";
        }, [this.innerFlowContainer], 0, (directionIsRight ? -100 : 100));
        transition.addPreAction(() => {
            this.focusElement = AUISplashPage.containerizeSplashContainer(element);
            this.focusElement.getHTMLElement().style.flexShrink = "0";
            if (directionIsRight) {
                this.innerFlowContainer.setDirection(JUIDirection.TO_RIGHT);
                this.innerFlowContainer.setAlignment(JUIAlignment.LEFT);
            }
            else {
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
    cleanUpFromView(view) {
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
    proceedFromClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client.getOrganizationListing().size() === 1)
                this.proceedFromOrganization(client.getOrganizationListing().getAll()[0]);
            else
                this.goToOrganizationSelector(client.getOrganizationListing());
        });
    }
    proceedFromOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            yield session.getAmpelSession().setOrganization(organization.getID());
            if (organization.getLocationListing().size() === 1)
                this.proceedFromLocation(organization.getLocationListing().getAll()[0]);
            else
                this.goToLocationSelector(organization.getLocationListing());
        });
    }
    proceedFromLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            yield session.getAmpelSession().setLocation(location.getID());
            if (location.getDeviceListing().size() === 1)
                this.proceedFromDevice(location.getDeviceListing().getAll()[0]);
            else
                this.goToDeviceSelector(location.getDeviceListing());
        });
    }
    proceedFromDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            let signedInDevice = yield session.getAmpelSession().setDevice(device.getID());
            // JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld(signedInDevice.getDefaultFolder()));
            yield this.goToActivitySelector();
        });
    }
    proceedFromActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    goToOrganizationSelector(organizationListing) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeOrganizationListing = organizationListing;
            let organizationSelector = new AUIStructureSelectorModule(organizationListing, "organization", "Whoops! Looks like you don't belong to any organizations! Join one, then head back here!");
            // TODO [2/12/19 @ 12:30 AM] - Subscribe to back button notifier.
            this.organizationSelectionSubscription = organizationSelector.subscribeToSelectionNotifier((organization) => this.proceedFromOrganization(organization));
            let transition = this.transitionTo(organizationSelector, AUISplashPage.VIEW_ENUMERATION.ORGANIZATION_SELECTOR);
            this.cleanUpFromView(this.currentView);
            this.currentView = AUISplashPage.VIEW_ENUMERATION.ORGANIZATION_SELECTOR;
            yield transition.getTransitionPromise();
        });
    }
    goToLocationSelector(locationListing) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeLocationListing = locationListing;
            let locationSelector = new AUIStructureSelectorModule(locationListing, "location", "Whoops! Looks like this organization doesn't have any locations! Add one, then head back here!");
            this.backButtonSubscription = locationSelector.subscribeToBackButtonNotifier(() => {
                // TODO [3/27/19 @ 1:57 AM] - Go back to sign-in if there's only 1 organization.
                this.goToOrganizationSelector(this.activeOrganizationListing);
            });
            this.locationSelectionSubscription = locationSelector.subscribeToSelectionNotifier((location) => this.proceedFromLocation(location));
            let transition = this.transitionTo(locationSelector, AUISplashPage.VIEW_ENUMERATION.LOCATION_SELECTOR);
            this.cleanUpFromView(this.currentView);
            this.currentView = AUISplashPage.VIEW_ENUMERATION.LOCATION_SELECTOR;
            yield transition.getTransitionPromise();
        });
    }
    goToDeviceSelector(deviceListing) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeDeviceListing = deviceListing;
            let deviceSelector = new AUIStructureSelectorModule(deviceListing, "device", "Whoops! Looks like this organization doesn't have any devices! Add one, then head back here!");
            this.backButtonSubscription = deviceSelector.subscribeToBackButtonNotifier(() => this.goToLocationSelector(this.activeLocationListing));
            this.deviceSelectionSubscription = deviceSelector.subscribeToSelectionNotifier((device) => this.proceedFromDevice(device));
            let transition = this.transitionTo(deviceSelector, AUISplashPage.VIEW_ENUMERATION.DEVICE_SELECTOR);
            this.cleanUpFromView(this.currentView);
            this.currentView = AUISplashPage.VIEW_ENUMERATION.DEVICE_SELECTOR;
            yield transition.getTransitionPromise();
        });
    }
    goToFolderSelector(folderListing) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let folderSelector = new AUIStructureSelectorModule(folderListing, "folder", "Whoops! Looks like this organization doesn't have any folders! Try adding one, then head back here!");
                this.backButtonSubscription = folderSelector.subscribeToBackButtonNotifier(() => this.goToDeviceSelector(this.activeDeviceListing));
                this.folderSelectionSubscription = folderSelector.subscribeToSelectionNotifier((folder) => JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld(folder)));
                let transition = this.transitionTo(folderSelector, AUISplashPage.VIEW_ENUMERATION.FOLDER_SELECTOR);
                this.cleanUpFromView(this.currentView);
                this.currentView = AUISplashPage.VIEW_ENUMERATION.FOLDER_SELECTOR;
                transition.getTransitionPromise().then(() => resolve());
            });
        });
    }
    goToActivitySelector() {
        return __awaiter(this, void 0, void 0, function* () {
            let activitySelector = new AUIActivitySelectorModule();
            this.backButtonSubscription = activitySelector.subscribeToBackButtonNotifier(() => this.goToDeviceSelector(this.activeDeviceListing));
            this.activitySelectionSubscription = activitySelector.subscribeToSelectionNotifier((activity) => this.proceedFromActivity(activity));
            let transition = this.transitionTo(activitySelector, AUISplashPage.VIEW_ENUMERATION.ACTIVITY_SELECTOR);
            this.cleanUpFromView(this.currentView);
            this.currentView = AUISplashPage.VIEW_ENUMERATION.ACTIVITY_SELECTOR;
            yield transition.getTransitionPromise();
        });
    }
}
AUISplashPage.VIEW_ENUMERATION = {
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
export default AUISplashPage;
//# sourceMappingURL=aui-splash-page.js.map