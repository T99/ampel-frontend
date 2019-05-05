/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:14 AM -- December 19th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import JUIBoxShadowStyleMutator from "./mutators/jui-box-shadow-style-mutator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIStyleCollection {
    constructor(element) {
        this.element = element;
    }
    // ? additiveSymbols
    alignContent(value) {
        // TODO [12/19/18 @ 5:24 AM] - Fix this method, this is not yet correct.
    }
    // alignItems
    // alignSelf
    // all
    // animation
    // animationDelay
    // animationDirection
    // animationDuration
    // animationFillMode
    // animationIterationCount
    // animationName
    // animationPlayState
    // animationTimingFunction
    // ? backfaceVisibility
    // background
    // backgroundAttachment
    // backgroundBlendMode
    // backgroundClip
    // backgroundColor
    // backgroundImage
    // backgroundOrigin
    // backgroundPosition
    // backgroundRepeat
    // backgroundSize
    // ? blockSize
    // border
    // ? borderBlock
    // ? borderBlockColor
    // ? borderBlockEnd
    // ? borderBlockEndColor
    // ? borderBlockEndStyle
    // ? borderBlockEndWidth
    // ? borderBlockStart
    // ? borderBlockStartColor
    // ? borderBlockStartStyle
    // ? borderBlockStartWidth
    // ? borderBlockStyle
    // ? borderBlockWidth
    // borderBottom
    // borderBottomColor
    // borderBottomLeftRadius
    // borderBottomRightRadius
    // borderBottomStyle
    // borderBottomWidth
    // borderCollapse
    // borderColor
    // ? borderEndEndRadius
    // ? borderEndStartRadius
    // borderImage
    // borderImageOutset
    // borderImageRepeat
    // borderImageSlice
    // borderImageSource
    // borderImageWidth
    // ? borderInline
    // ? borderInlineColor
    // ? borderInlineEnd
    // ? borderInlineEndColor
    // ? borderInlineEndStyle
    // ? borderInlineEndWidth
    // ? borderInlineStart
    // ? borderInlineStartColor
    // ? borderInlineStartStyle
    // ? borderInlineStartWidth
    // ? borderInlineStyle
    // ? borderInlineWidth
    // borderLeft
    // borderLeftColor
    // borderLeftStyle
    // borderLeftWidth
    // borderRadius
    // borderRight
    // borderRightColor
    // borderRightStyle
    // borderRightWidth
    // borderSpacing
    // ? borderStartEndRadius
    // ? borderStartStartRadius
    // borderStyle
    // borderTop
    // borderTopColor
    // borderTopLeftRadius
    // borderTopRightRadius
    // borderTopStyle
    // borderTopWidth
    // borderWidth
    // bottom
    // ? boxDecorationBreak
    boxShadow() {
        if (!this.boxShadowMutator)
            this.boxShadowMutator = new JUIBoxShadowStyleMutator();
        return this.boxShadowMutator;
    }
}
export default JUIStyleCollection;
//# sourceMappingURL=jui-style-collection.js.map