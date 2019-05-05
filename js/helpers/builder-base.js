/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:59 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import InvalidArgumentsError from "../errors/invalid-arguments-error.js";
/**
 * Enumerates the requirements of a given builder pattern.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class BuilderBase {
    constructor() {
        this.requirements = new Map();
    }
    addRequirements(...requirementNames) {
        for (let requirementName of requirementNames) {
            this.requirements.set(requirementName, {
                name: requirementName,
                isOptional: false,
                isFulfilled: false,
                value: null
            });
        }
    }
    addOptionals(...optionalNames) {
        for (let optionalName of optionalNames) {
            this.requirements.set(optionalName, {
                name: optionalName,
                isOptional: true,
                isFulfilled: false,
                value: null
            });
        }
    }
    fulfillRequirement(requirementName, value) {
        if (this.requirements.has(requirementName)) {
            let requirement = this.requirements.get(requirementName);
            requirement.isFulfilled = true;
            requirement.value = value;
        }
        else {
            throw new InvalidArgumentsError("Attempted to fulfill a requirement that did not exist: '" +
                requirementName + "'.");
        }
    }
    getValueOfRequirement(requirementName) {
        if (this.requirements.has(requirementName))
            return this.requirements.get(requirementName).value;
        else {
            throw new InvalidArgumentsError("Attempted to get the value of a requirement that did not exist: '" +
                requirementName + "'.");
        }
    }
    getNamesOfUnfulfilledRequirements() {
        let unfulfilledRequirementNames = [];
        for (let requirement of this.requirements.values()) {
            if (requirement.isOptional === false && requirement.isFulfilled === false) {
                unfulfilledRequirementNames.push(requirement.name);
            }
        }
        return unfulfilledRequirementNames;
    }
    getNamesOfUnfulfilledOptionalRequirements() {
        let unfulfilledOptionalRequirementNames = [];
        for (let requirement of this.requirements.values()) {
            if (requirement.isOptional === true && requirement.isFulfilled === false) {
                unfulfilledOptionalRequirementNames.push(requirement.name);
            }
        }
        return unfulfilledOptionalRequirementNames;
    }
    getNamesOfUnfulfilledRequirementsAndOptionalRequirements() {
        let unfulfilledRequirementsAndOptionalRequirementNames = [];
        for (let requirement of this.requirements.values()) {
            if (requirement.isFulfilled === false) {
                unfulfilledRequirementsAndOptionalRequirementNames.push(requirement.name);
            }
        }
        return unfulfilledRequirementsAndOptionalRequirementNames;
    }
    getErrorMessageForIncompleteBuilder() {
        let errorMessage = "Attempted to build from an incomplete builder. Missing fields include: ";
        let namesOfUnfulfilledRequirements = this.getNamesOfUnfulfilledRequirements();
        for (let index = 0; index < namesOfUnfulfilledRequirements.length; index++) {
            errorMessage += "'" + namesOfUnfulfilledRequirements[index] + "'";
            if (index < namesOfUnfulfilledRequirements.length - 2)
                errorMessage += ", ";
            else if (index < namesOfUnfulfilledRequirements.length - 1)
                errorMessage += ", and ";
        }
        errorMessage += ".";
        return errorMessage;
    }
    /**
     * Checks if requirements have been fulfilled. If a requirement name is specified, this method returns true if that
     * specific requirement has been fulfilled. Otherwise, this method returns true if all non-optional (required)
     * requirements have been fulfilled.
     *
     * @param {string} requirementName The (optional) name of a requirement.
     * @returns {boolean} If a requirement name is specified, true if that specific requirement has been fulfilled.
     * Otherwise, true if all non-optional (required) requirements have been fulfilled.
     */
    checkFulfillment(requirementName) {
        if (requirementName) {
            if (this.requirements.has(requirementName))
                return (this.requirements.get(requirementName).isFulfilled === true);
            else {
                throw new InvalidArgumentsError("Attempted to check the fulfillment a requirement that did not exist:" +
                    " '" + requirementName + "'.");
            }
        }
        else {
            for (let requirement of this.requirements.values()) {
                if (requirement.isOptional === false && requirement.isFulfilled === false)
                    return false;
            }
            return true;
        }
    }
}
export default BuilderBase;
//# sourceMappingURL=builder-base.js.map