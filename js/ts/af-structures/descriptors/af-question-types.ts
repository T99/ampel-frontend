/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:34 AM -- February 05th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import AFQuestion from "../structures/af-question.js";
import { AUINPSQuestion } from "../../aui/pages/kiosk/questions/aui-nps-question.js";
import { AUITrueFalseQuestion } from "../../aui/pages/kiosk/questions/aui-true-false-question.js";
import { AUISATAQuestion } from "../../aui/pages/kiosk/questions/aui-sata-question.js";
import { AUIMultipleChoiceQuestion } from "../../aui/pages/kiosk/questions/aui-multiple-choice-question.js";
import { AUIFreeResponseQuestion } from "../../aui/pages/kiosk/questions/aui-free-response-question.js";
import { AUIQuestion } from "../../aui/pages/kiosk/questions/aui-question.js";
import { AUIStoplightQuestion } from "../../aui/pages/kiosk/questions/aui-stoplight-question.js";
import { AUISliderQuestion } from "../../aui/pages/kiosk/questions/aui-slider-question.js";

/**
 * Enumerates the possible Ampel question types.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFQuestionTypes {
	
	public static readonly STOPLIGHT: AFQuestionTypes = new AFQuestionTypes(
		0, "StopLight", 2000,
		(question: AFQuestion): AUIQuestion => new AUIStoplightQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be either 0 (green), 1 (yellow), or 2 (red).
		 */
		
		return (
			(response === 0) ||	/* <-- Green	*/
			(response === 1) ||	/* <-- Yellow	*/
			(response === 2)	/* <-- Red		*/
		);
		
	});
	
	public static readonly SLIDER: AFQuestionTypes = new AFQuestionTypes(
		1, "Slider", 2500,
		(question: AFQuestion): AUIQuestion => new AUISliderQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be between 1 and 10 (1 <= x <= 10).
		 */
		
		return (
			(response >= 1) &&
			(response <= 10)
		);
		
	});
	
	public static readonly NPS: AFQuestionTypes = new AFQuestionTypes(
		2, "NPS", 2500,
		(question: AFQuestion): AUIQuestion => new AUINPSQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be between 1 and 10 (1 <= x <= 10).
		 */
		
		return (
			(response >= 1) &&
			(response <= 10)
		);
		
	});
	
	public static readonly TRUE_FALSE: AFQuestionTypes = new AFQuestionTypes(
		3, "TrueFalse", 2000,
		(question: AFQuestion): AUIQuestion => new AUITrueFalseQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be either 'true' or 'false'.
		 */
		
		return (typeof response === "boolean");
		
	});
	
	public static readonly SELECT_ALL_THAT_APPLY: AFQuestionTypes = new AFQuestionTypes(
		4, "SelectAllThatApply", 3000,
		(question: AFQuestion): AUIQuestion => new AUISATAQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be an array of strings.
		 */
		
		return (
			(response instanceof Array) &&
			(response.every((value: any): boolean => typeof value === "string"))
		);
		
	});
	
	public static readonly MULTIPLE_CHOICE: AFQuestionTypes = new AFQuestionTypes(
		5, "MultipleChoice", 3000,
		(question: AFQuestion): AUIQuestion => new AUIMultipleChoiceQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be a string, representing the ID of the chosen option.
		 */
		
		return (typeof response === "string");
		
	});
	
	public static readonly FREE_RESPONSE: AFQuestionTypes = new AFQuestionTypes(
		6, "FreeResponse", 4000,
		(question: AFQuestion): AUIQuestion => new AUIFreeResponseQuestion(question),
		(response: any): boolean => {
		
		/*
		 * The response must be a string, either representing the textual response or the ID of the response canvas
		 * file.
		 */
		
		return (typeof response === "string");
		
	});
	
	private static typeNumberMap: Map<number, AFQuestionTypes>;
	
	private static typeStringMap: Map<string, AFQuestionTypes>;
	
	private typeNumber: number;
	
	private typeString: string;
	
	private timeout: number;
	
	private validator: (response: any) => boolean;
	
	private constructorProxy: (question: AFQuestion) => AUIQuestion;
	
	public constructor(typeNumber: number,
					   typeString: string,
					   timeout: number,
					   constructorProxy: (question: AFQuestion) => AUIQuestion,
					   validator: (response: any) => boolean) {
		
		this.typeNumber = typeNumber;
		this.typeString = typeString;
		this.timeout = timeout;
		this.constructorProxy = constructorProxy;
		this.validator = validator;
		
		AFQuestionTypes.addTypeNumberMapping(typeNumber, this);
		AFQuestionTypes.addTypeStringMapping(typeString, this);
		
	}
	
	private static addTypeNumberMapping(typeNumber: number, questionType: AFQuestionTypes): void {
		
		if (AFQuestionTypes.typeNumberMap === undefined) AFQuestionTypes.typeNumberMap = new Map<number, AFQuestionTypes>();
		AFQuestionTypes.typeNumberMap.set(typeNumber, questionType);
		
	}
	
	private static addTypeStringMapping(typeString: string, questionType: AFQuestionTypes): void {
		
		if (AFQuestionTypes.typeStringMap === undefined) AFQuestionTypes.typeStringMap = new Map<string, AFQuestionTypes>();
		AFQuestionTypes.typeStringMap.set(typeString, questionType);
		
	}
	
	public static getQuestionTypeForTypeNumber(typeNumber: number): AFQuestionTypes {
		
		return AFQuestionTypes.typeNumberMap.get(typeNumber);
		
	}
	
	public static getQuestionTypeForTypeString(typeString: string): AFQuestionTypes {
		
		return AFQuestionTypes.typeStringMap.get(typeString);
		
	}
	
	public static createQuestionElementFromQuestion(question: AFQuestion): AUIQuestion {
		
		return question.getType().constructorProxy(question);
		
	}
	
	public validateResponse(response: any): boolean {
		
		return this.validator(response);
		
	}
	
	public getTypeNumber(): number {
		
		return this.typeNumber;
		
	}
	
	public getTypeString(): string {
		
		return this.typeString;
		
	}
	
	public getTimeout(): number {
		
		return this.timeout;
		
	}
	
	public createQuestionElement(question: AFQuestion): AUIQuestion {
		
		if (question.getType() === this) return this.constructorProxy(question);
		else throw new Error("Attempted to create a question element with a mis-matching type.");
		
	}
	
}

export default AFQuestionTypes;