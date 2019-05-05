/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:58 AM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIModule from "../../jui/jui-module.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUITextLabel from "../global/aui-text-label.js";
import JUITextLeafType from "../../jui/types/leaves/content-leaves/jui-text-leaf-type.js";
import AUITextInputModule from "../global/aui-text-input-module.js";
import JUISVGLeaf from "../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import AUIButton from "../global/aui-button.js";
import JUIControlGroup from "../../jui/control/jui-control-group.js";
import JUINotificationFilter from "../../jui/action/jui-notification-filter.js";
import JUINotifier from "../../jui/action/jui-notifier.js";
import JUILeftRightShakeAnimation from "../../jui/animations/animations/jui-left-right-shake-animation.js";
/**
 * A sign-in modal with an email and password field as well as a submission button.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISignInModule extends JUIModule {
    constructor() {
        super(new AUISplashContainer());
        this.element.addClasses("aui-sign-in-module");
        // Stoplight creation.
        let stoplightImage = new JUIImageLeaf("img/main-icon.png");
        let stoplightImageStyles = stoplightImage.getHTMLElement().style;
        stoplightImageStyles.filter = "drop-shadow(6px 6px 10px #000000)";
        stoplightImageStyles.marginBottom = "2.5vh";
        // Title text creation.
        let ampelTitle = new AUITextLabel("AMPEL FEEDBACK", JUITextLeafType.H2);
        let ampelTitleStyles = ampelTitle.getHTMLElement().style;
        ampelTitleStyles.fontSize = "2em";
        ampelTitleStyles.marginBottom = "5vh";
        ampelTitleStyles.fontWeight = "600";
        // "Sign-in" text creation.
        let signInText = new AUITextLabel("Sign-in to your account", JUITextLeafType.H4);
        let signInTextStyles = signInText.getHTMLElement().style;
        signInTextStyles.fontSize = "1.25em";
        signInTextStyles.marginBottom = "2vh";
        signInTextStyles.fontWeight = "400";
        // Text input box creations.
        let emailInput = new AUITextInputModule("Your email address...", new JUISVGLeaf("img/icons/letter.svg"));
        let passInput = new AUITextInputModule("Your password...", new JUISVGLeaf("img/icons/lock.svg"), true);
        // Button creation.
        let button = new AUIButton("Sign-in");
        // Setting tab indicies.
        emailInput.setTabIndex(1);
        passInput.setTabIndex(2);
        button.getHTMLElement().tabIndex = 3;
        // Adding children to container.
        this.element.addChildren(stoplightImage, ampelTitle, signInText, emailInput, passInput, button);
        // Control group implementation.
        this.signInNotifier = new JUINotifier();
        let signInCG = new JUIControlGroup({
            email: emailInput,
            password: passInput
        }, (inputs) => {
            session.getAmpelSession().initializeSession(inputs.get("email"), inputs.get("password")).then((session) => {
                this.signInNotifier.notify(session.getClient());
                // JUIWorld.getInstance().goToPageRight(new AUIKioskPageOld());
            }).catch((error) => {
                if (error.getTypeValue !== undefined) {
                    // Username incorrect.
                    if (error.getTypeValue() === 14)
                        (new JUILeftRightShakeAnimation(emailInput)).play();
                    // Password incorrect.
                    if (error.getTypeValue() === 8)
                        (new JUILeftRightShakeAnimation(passInput)).play();
                }
                else
                    console.error(error);
            });
        });
        let enterFilter = new JUINotificationFilter((notification) => (notification.getKey() === "Enter"));
        signInCG.addActionNotifier(button.getEventManager().ELEMENT_MOUSE_CLICKED);
        signInCG.addActionNotifier(emailInput.getEventManager().KEY_PRESSED, enterFilter);
        signInCG.addActionNotifier(passInput.getEventManager().KEY_PRESSED, enterFilter);
    }
    subscribeToSignInNotifier(handler) {
        return this.signInNotifier.subscribe(handler);
    }
}
export default AUISignInModule;
//# sourceMappingURL=aui-sign-in-module.js.map