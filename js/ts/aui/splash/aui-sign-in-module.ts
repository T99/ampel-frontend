/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:58 AM -- February 06th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import { JUIModule } from "../../jui/jui-module.js";
import AUISplashContainer from "./aui-splash-container.js";
import JUIImageLeaf from "../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUITextLabel from "../global/aui-text-label.js";
import { AUITextInputModule } from "../global/aui-text-input-module.js";
import JUISVGLeaf from "../../jui/elements/leaves/content-leaves/jui-svg-leaf.js";
import AUIButton from "../global/aui-button.js";
import AFClient from "../../af-structures/structures/af-client.js";
import JUINotifier from "../../jui/action/jui-notifier.js";
import JUISubscription from "../../jui/action/jui-subscription.js";
import JUITextLeafType from "../../jui/types/element-types/content-leaves/jui-text-leaf-type.js";
import AFSession from "../../af-structures/af-session.js";
import JUILeftRightShakeAnimation from "../../jui/animations/animations/jui-left-right-shake-animation.js";
import JUIKeyboardEvent from "../../jui/action/events/jui-keyboard-event.js";
import JUINotificationFilter from "../../jui/action/jui-notification-filter.js";
import JUITextualInputType from "../../jui/types/input-types/jui-textual-input-type.js";

/**
 * A sign-in modal with an email and password field as well as a submission button.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUISignInModule extends JUIModule<AUISplashContainer> {
	
	private signInNotifier: JUINotifier<AFClient>;
	
	private emailInput: AUITextInputModule;
	
	private passInput: AUITextInputModule;
	
	public constructor() {
		
		super(new AUISplashContainer());
		
		this.getModuleElement().addClasses("aui-sign-in-module");
		
		// Stoplight creation.
		
		let stoplightImage: JUIImageLeaf = new JUIImageLeaf("img/main-icon.png");
		let stoplightImageStyles: CSSStyleDeclaration = stoplightImage.getElement().style;
		
		stoplightImageStyles.filter = "drop-shadow(6px 6px 10px #000000)";
		stoplightImageStyles.marginBottom = "2.5vh";
		
		// Title text creation.
		
		let ampelTitle: AUITextLabel = new AUITextLabel("AMPEL FEEDBACK", JUITextLeafType.H2);
		let ampelTitleStyles: CSSStyleDeclaration = ampelTitle.getElement().style;
		ampelTitleStyles.fontSize = "2em";
		ampelTitleStyles.marginBottom = "5vh";
		ampelTitleStyles.fontWeight = "600";
		
		// "Sign-in" text creation.
		
		let signInText: AUITextLabel = new AUITextLabel("Sign-in to your account", JUITextLeafType.H4);
		let signInTextStyles: CSSStyleDeclaration = signInText.getElement().style;
		signInTextStyles.fontSize = "1.25em";
		signInTextStyles.marginBottom = "2vh";
		signInTextStyles.fontWeight = "400";
		
		// Text input box creations.
		
		this.emailInput = new AUITextInputModule(
			"Your email address...",
			new JUISVGLeaf("img/icons/letter.svg"),
			JUITextualInputType.EMAIL
		);
		
		this.passInput = new AUITextInputModule(
			"Your password...",
			new JUISVGLeaf("img/icons/lock.svg"),
			JUITextualInputType.PASSWORD
		);
		
		// Button creation.
		
		let button: AUIButton = new AUIButton("Sign-in");
		
		// Setting tab indicies.
		
		this.emailInput.setTabIndex(1);
		this.passInput.setTabIndex(2);
		button.getElement().tabIndex = 3;
		
		// Adding children to container.
		
		this.getModuleElement().addChildren(stoplightImage, ampelTitle, signInText, this.emailInput, this.passInput, button);
		
		// Control group implementation.
		
		this.signInNotifier = new JUINotifier<AFClient>();
		
		let enterFilter: JUINotificationFilter<JUIKeyboardEvent> = new JUINotificationFilter<JUIKeyboardEvent>(
			(notification: JUIKeyboardEvent): boolean => (notification.getKey() === "Enter")
		);
		
		button.getEventManager().ELEMENT_MOUSE_CLICKED.subscribe(() => this.attemptSignIn());

		this.emailInput.getEventManager().KEY_PRESSED.subscribe(() => this.attemptSignIn()).filter(enterFilter);
		this.passInput.getEventManager().KEY_PRESSED.subscribe(() => this.attemptSignIn()).filter(enterFilter);
		
	}
	
	private async attemptSignIn(): Promise<any> {
		
		try {
			
			let afSession: AFSession = await session.getAmpelSession().initializeSession(
				this.emailInput.getContent(),
				this.passInput.getContent()
			);
			
			this.signInNotifier.notify(afSession.getClient());
			
		} catch (error) {
			
			if (error.getTypeValue !== undefined) {

				// Username incorrect.
				if (error.getTypeValue() === 14) (new JUILeftRightShakeAnimation(this.emailInput)).play();

				// Password incorrect.
				if (error.getTypeValue() === 8) (new JUILeftRightShakeAnimation(this.passInput)).play();

			} else console.error(error);
			
		}
		
	}
	
	public subscribeToSignInNotifier(handler: (notification: AFClient) => void): JUISubscription<AFClient> {
		
		return this.signInNotifier.subscribe(handler);
		
	}
	
}

export default AUISignInModule;