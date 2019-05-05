/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:59 PM -- January 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import InvalidArgumentsError from "../errors/invalid-arguments-error.js";

type BuilderRequirement = {
	
	name: string,
	isOptional: boolean,
	isFulfilled: boolean;
	value: any;
	
};

/**
 * Enumerates the requirements of a given builder pattern.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class BuilderBase<E> {
	
	private requirements: Map<string, BuilderRequirement> = new Map<string, BuilderRequirement>();
	
	public constructor() { /* Do nothing. */ }
	
	protected addRequirements(...requirementNames: string[]): void {
		
		for (let requirementName of requirementNames) {
			
			this.requirements.set(requirementName, {
				name: requirementName,
				isOptional: false,
				isFulfilled: false,
				value: null
			});
			
		}
		
	}
	
	protected addOptionals(...optionalNames: string[]): void {
		
		for (let optionalName of optionalNames) {
			
			this.requirements.set(optionalName, {
				name: optionalName,
				isOptional: true,
				isFulfilled: false,
				value: null
			});
			
		}
		
	}
	
	protected fulfillRequirement(requirementName: string, value: any): void {
		
		if (this.requirements.has(requirementName)) {
			
			let requirement: BuilderRequirement = this.requirements.get(requirementName);
			
			requirement.isFulfilled = true;
			requirement.value = value;
			
		} else {
			
			throw new InvalidArgumentsError("Attempted to fulfill a requirement that did not exist: '" +
				requirementName + "'.");
		}
		
	}
	
	protected getValueOfRequirement(requirementName: string): any {
		
		if (this.requirements.has(requirementName)) return this.requirements.get(requirementName).value;
		else {
			
			throw new InvalidArgumentsError("Attempted to get the value of a requirement that did not exist: '" +
				requirementName + "'.");
			
		}
		
	}
	
	protected getNamesOfUnfulfilledRequirements(): string[] {
		
		let unfulfilledRequirementNames: string[] = [];
		
		for (let requirement of this.requirements.values()) {
			
			if (requirement.isOptional === false && requirement.isFulfilled === false) {
				
				unfulfilledRequirementNames.push(requirement.name);
				
			}
			
		}
		
		return unfulfilledRequirementNames;
		
	}
	
	protected getNamesOfUnfulfilledOptionalRequirements(): string[] {
		
		let unfulfilledOptionalRequirementNames: string[] = [];
		
		for (let requirement of this.requirements.values()) {
			
			if (requirement.isOptional === true && requirement.isFulfilled === false) {
				
				unfulfilledOptionalRequirementNames.push(requirement.name);
				
			}
			
		}
		
		return unfulfilledOptionalRequirementNames;
		
	}
	
	protected getNamesOfUnfulfilledRequirementsAndOptionalRequirements(): string[] {
		
		let unfulfilledRequirementsAndOptionalRequirementNames: string[] = [];
		
		for (let requirement of this.requirements.values()) {
			
			if (requirement.isFulfilled === false) {
				
				unfulfilledRequirementsAndOptionalRequirementNames.push(requirement.name);
				
			}
			
		}
		
		return unfulfilledRequirementsAndOptionalRequirementNames;
		
	}
	
	protected getErrorMessageForIncompleteBuilder(): string {
		
		let errorMessage: string = "Attempted to build from an incomplete builder. Missing fields include: ";
		
		let namesOfUnfulfilledRequirements: string[] = this.getNamesOfUnfulfilledRequirements();
		
		for (let index: number = 0; index < namesOfUnfulfilledRequirements.length; index++) {
			
			errorMessage += "'" + namesOfUnfulfilledRequirements[index] + "'";
			if (index < namesOfUnfulfilledRequirements.length - 2) errorMessage += ", ";
			else if (index < namesOfUnfulfilledRequirements.length - 1) errorMessage += ", and ";
			
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
	protected checkFulfillment(requirementName?: string): boolean {
		
		if (requirementName) {
			
			if (this.requirements.has(requirementName)) return (this.requirements.get(requirementName).isFulfilled === true);
			else {
				
				throw new InvalidArgumentsError("Attempted to check the fulfillment a requirement that did not exist:" +
					" '" + requirementName + "'.");
				
			}
			
		} else {
			
			for (let requirement of this.requirements.values()) {
				
				if (requirement.isOptional === false && requirement.isFulfilled === false) return false;
				
			}
			
			return true;
			
		}
		
	}
	
	public abstract build(): E;
	
}

export default BuilderBase;