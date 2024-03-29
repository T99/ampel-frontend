/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:13 PM -- March 25th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIPage from "../../../jui/jui-page.js";
import JUIAlignment from "../../../jui/descriptors/jui-alignment.js";
import JUIStackContainer from "../../../jui/elements/containers/multi-containers/jui-stack-container.js";
import JUIImageLeaf from "../../../jui/elements/leaves/content-leaves/jui-image-leaf.js";
import AUIKioskTextLabel from "../kiosk-old/aui-kiosk-text-label.js";
import TSAwaitUtils from "../../../util/misc/ts-await-utils.js";
import JUIWorld from "../../../jui/jui-world.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AUIKioskThankYouPage extends JUIPage {
	
	/**
	 * A String that represents the identity of the type that is being identified.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-kiosk-thank-you-page";
	
	private static readonly DEFAULT_TIMEOUT: number = 5000;
	
	private stackContainer: JUIStackContainer;
	
	private constructor() {
	
		super();
		this.addClasses(this.TYPE_IDENTITY);
		
		this.stackContainer = new JUIStackContainer(JUIAlignment.CENTER);
		
		this.stackContainer.addStackedChild(new JUIImageLeaf("/img/main-icon.png"));
		this.stackContainer.addStackedChild(new AUIKioskTextLabel("Thanks for \n helping!"));
		
		this.setChild(this.stackContainer);
	
	}
	
	public static async sayThankYou(wait: number = AUIKioskThankYouPage.DEFAULT_TIMEOUT): Promise<void> {
		
		let thankYouPage: AUIKioskThankYouPage = new AUIKioskThankYouPage();
		
		await JUIWorld.getInstance().goToPageRight(thankYouPage);
		
		await TSAwaitUtils.ms(wait);
		
	}
	
}

export default AUIKioskThankYouPage;