/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:50 PM -- December 14th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
import TSObjectIterator from "../../structures/implementations/iterate/ts-object-iterator.js";
/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIControlGroup {
    constructor(components, action) {
        this.components = new Map();
        this.verifications = [];
        let iterator = new TSObjectIterator(components);
        while (iterator.hasNext()) {
            let keyValuePair = iterator.next();
            this.components.set(keyValuePair.key, keyValuePair.value);
        }
        this.action = action;
    }
    addVerificationStep(verification) {
        this.verifications.push(verification);
    }
    addActionNotifier(notifier, filter) {
        let subscription = notifier.subscribe(() => this.attemptAction());
        if (filter)
            subscription.filter(filter);
    }
    checkVerifications() {
        for (let verification of this.verifications)
            if (!verification())
                return false;
        for (let component of this.components.values()) {
            if (component.validateComponent && !component.validateComponent())
                return false;
        }
        return true;
    }
    attemptAction() {
        return new Promise((resolve, reject) => {
            if (this.checkVerifications()) {
                let componentMap = new Map();
                for (let key of this.components.keys())
                    componentMap.set(key, this.components.get(key).getComponentValue());
                this.action(componentMap);
                resolve();
            }
            else
                reject();
        });
    }
}
export default JUIControlGroup;
//# sourceMappingURL=jui-control-group.js.map