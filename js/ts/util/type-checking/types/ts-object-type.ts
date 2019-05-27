/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:30 PM -- May 26th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSType from "./ts-type.js";
import TSObjectTypeDefinition from "./ts-object-type-definition.js";
import TSObjectIterator from "../../structures/implementations/iterate/ts-object-iterator.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSObjectType extends TSType {
	
	private readonly objectName: string;
	
	private readonly typeDefinition: TSObjectTypeDefinition;
	
	public constructor(typeDefinition: TSObjectTypeDefinition, objectName: string = "") {
	
		super();
		
		this.typeDefinition = typeDefinition;
		this.objectName = objectName;
		
		console.log("Building object type for...");
		console.log(TSObjectType.typeDefinitionToString(typeDefinition));
	
	}
	
	public static typeDefinitionToReadableJSON(typeDefinition: TSObjectTypeDefinition): any {
		
		let iterator: TSObjectIterator<TSType | TSObjectTypeDefinition> = new TSObjectIterator<TSType | TSObjectTypeDefinition>(typeDefinition);
		let result: any = {};
		
		for (let element of iterator) {
			
			if (element.value.getTypeName !== undefined) result[element.key] = (element.value as TSType).getTypeName();
			else result[element.key] = TSObjectType.typeDefinitionToReadableJSON(element.value as TSObjectTypeDefinition);
			
		}
		
		return result;
	
	}
	
	public static typeDefinitionToString(typeDefinition: TSObjectTypeDefinition): string {
		
		let structureToStringArray: (struct: TSObjectTypeDefinition) => string[] = (struct: TSObjectTypeDefinition): string[] => {
			
			let iterator: TSObjectIterator<TSType | TSObjectTypeDefinition> = new TSObjectIterator<TSType | TSObjectTypeDefinition>(struct);
			let resultLines: string[] = [];
			
			for (let element of iterator) {
				
				if (element.value.getTypeName !== undefined) {
					
					let typeName: string = (element.value as TSType).getTypeName();
					
					resultLines.push("|  " + element.key + ": " + typeName);
					
				} else {
					
					resultLines.push("|  " + element.key + ": object \u23ce");
					
					let nestedResultLines: string[] = structureToStringArray(element.value as TSObjectTypeDefinition);
					
					for (let line of nestedResultLines) resultLines.push("|  " + line);
					
				}
				
			}
			
			return resultLines;
			
		};
		
		return structureToStringArray(typeDefinition).join("\n");
		
	}
	
	public typeDefinitionToReadableJSON(): any {
		
		return TSObjectType.typeDefinitionToReadableJSON(this.typeDefinition);
		
	}
	
	public typeDefinitionToString(): string {
		
		return TSObjectType.typeDefinitionToString(this.typeDefinition);
		
	}
	
	public getTypeName(): string {
		
		return "object" + (this.objectName !== "" ? " (" + this.objectName + ")" : "");
		
	}
	
	// TODO [5/27/19 @ 12:54 AM] - Need to take into account that some properties might be optional, nullable, or explicitly undefined.
	
	public checkConformity(input: any, typeDefinition: TSObjectTypeDefinition = this.typeDefinition): boolean {
		
		if (!(typeof input === "object") || (input === null)) return false;
		
		let iterator: TSObjectIterator<TSType | TSObjectTypeDefinition> = new TSObjectIterator<TSType | TSObjectTypeDefinition>(typeDefinition);
		
		for (let element of iterator) {
			
			let propertyName: string = element.key;
			let propertyValue: any = input[propertyName];
			
			console.log("Checking kv pair -> " + propertyName + ": ", propertyValue);
			
			if (propertyValue === undefined) return false;
			
			if (element.value.getTypeName !== undefined) {
				
				let type: TSType = element.value as TSType;
				
				if (!type.checkConformity(propertyValue)) return false;
				
			} else {
				
				if (!this.checkConformity(propertyValue, element.value as TSObjectTypeDefinition)) return false;
				
			}
			
		}
		
		return true;
		
	}
	
	public exhaustivelyCheckConformity(input: any, typeDefinition: TSObjectTypeDefinition = this.typeDefinition): boolean {
		
		if (!this.checkConformity(input, typeDefinition)) return false;
		
		let clonedInput: any = JSON.parse(JSON.stringify(input));
		let iterator: TSObjectIterator<any> = new TSObjectIterator<any>(clonedInput);
		
		for (let element of iterator) {
			
			let propertyName: string = element.key;
			let propertyValue: any = input[propertyName];
			
			if (typeDefinition[propertyName] !== undefined) {
				
				if (typeDefinition[propertyName].getTypeName !== undefined) {
					
					let type: TSType = typeDefinition[propertyName] as TSType;
					
					if (!type.checkConformity(propertyValue)) return false;
					
				} else {
					
					if (!this.exhaustivelyCheckConformity(propertyValue, typeDefinition[propertyName] as TSObjectTypeDefinition)) return false;
					
				}
				
			} else return false;
			
		}
		
		return true;
		
	}
	
}

export default TSObjectType;