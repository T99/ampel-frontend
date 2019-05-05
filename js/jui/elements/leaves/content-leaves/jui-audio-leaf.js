/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:49 AM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIContentLeaf from "../jui-content-leaf.js";
import JUIAudioLeafType from "../../../types/leaves/content-leaves/jui-audio-leaf-type.js";
/**
 * A {@link JUIElement} that plays audio in some capacity.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIAudioLeaf extends JUIContentLeaf {
    // DOC-ME [12/14/18 @ 9:40 AM] - Documentation required!
    constructor( /* audioType: JUIAudioLeafType */) {
        super(JUIAudioLeafType.AUDIO.toString());
        /**
         * A String that represents the identity of this type.
         *
         * @type {string}
         */
        this.TYPE_IDENTITY = "jui-audio-leaf";
        this.addClasses(this.TYPE_IDENTITY);
    }
}
export default JUIAudioLeaf;
//# sourceMappingURL=jui-audio-leaf.js.map