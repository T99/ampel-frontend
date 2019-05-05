/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:02 PM -- November 08th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

// DOC-ME [12/8/18 @ 4:51 PM] - Documentation required!
import JUIOverlay from "../../jui/overlays/jui-overlay.js";
import JUIAlignment from "../../jui/descriptors/jui-alignment.js";
import JUIDirection from "../../jui/descriptors/jui-direction.js";
import AUITextLabel from "./aui-text-label.js";
import JUIFlowContainer from "../../jui/elements/multi-containers/jui-flow-container.js";

class AUINotification extends JUIOverlay {
	
	/**
	 * A String that represents the identity of this type.
	 *
	 * @type {string}
	 */
	public readonly TYPE_IDENTITY: string = "aui-notification";
	
	private static readonly AVERAGE_WORDS_PER_MINUTE: number = 200;
	private static readonly VISUAL_ACQUISITION_TIME: number = 1000;
	
	private innerContainer: JUIFlowContainer;
	private textLabel: AUITextLabel;
	
	public constructor(content: string) {
		
		super(JUIAlignment.BOTTOM, JUIDirection.TO_BOTTOM);
		this.container.addClasses(this.TYPE_IDENTITY);
		
		this.innerContainer = new JUIFlowContainer(JUIDirection.TO_BOTTOM, JUIAlignment.CENTER);
		this.textLabel = new AUITextLabel(content);
		this.innerContainer.addChildren(this.textLabel);
		this.container.setChild(this.innerContainer);
		
		let timeout: number =
			((content.split(" ").length) * ((60 / AUINotification.AVERAGE_WORDS_PER_MINUTE) * 1000)) + AUINotification.VISUAL_ACQUISITION_TIME;
		
		this.show();
		this.scheduleHide(timeout);
		
	}
	
}

export default AUINotification;