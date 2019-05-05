/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:54 PM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIValidator from "../helpers/jui-validator.js";
import MalformedJSONError from "../errors/malformed-json-error.js";

/**
 * An error originating from the Ampel API.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIError extends Error {
	
	private static readonly EXPECTED_KEYS: string[] = ["error", "origin", "timeStamp", "type"];
	
	private static readonly EXPECTED_NESTED_KEYS: string[] = ["readable", "value"];
	
	private readonly apiErrorMessage: string;
	
	private readonly originMessage: string;
	
	private readonly originValue: number;
	
	private readonly typeMessage: string;
	
	private readonly typeValue: number;
	
	// TODO [1/31/19 @ 7:12 PM] - Make this a TSDate rather than a Date.
	private readonly timestamp: Date;
	
	public constructor(status: number, statusText: string, body: any) {
		
		if (!JUIValidator.ensureKeys(body, AFAPIError.EXPECTED_KEYS)) {
			
			throw new MalformedJSONError(
				"AFAPIError Response Body",
				body,
				AFAPIError.EXPECTED_KEYS
			);
			
		}
		
		if (!JUIValidator.ensureKeys(body["origin"], AFAPIError.EXPECTED_NESTED_KEYS)) {
			
			throw new MalformedJSONError(
				"AFAPIError Response Body ('origin' key)",
				body,
				AFAPIError.EXPECTED_NESTED_KEYS
			);
			
		}
		
		if (!JUIValidator.ensureKeys(body["type"], AFAPIError.EXPECTED_NESTED_KEYS)) {
			
			throw new MalformedJSONError(
				"AFAPIError Response Body ('type' key)",
				body,
				AFAPIError.EXPECTED_NESTED_KEYS
			);
			
		}
		
		super("An error occurred with the Ampel API resulting in a " + status + " code (" + statusText + "): " +
			body["error"]);
		
		this.apiErrorMessage = body["error"];
		this.originMessage = body["origin"]["readable"];
		this.originValue = body["origin"]["value"];
		this.typeMessage = body["type"]["readable"];
		this.typeValue = body["type"]["value"];
		this.timestamp = new Date(body["timeStamp"]);
		
	}
	
	public getAPIErrorMessage(): string {
		
		return this.apiErrorMessage;
		
	}
	
	public getOriginMessage(): string {
		
		return this.originMessage;
		
	}
	
	public getOriginValue(): number {
		
		return this.originValue;
		
	}
	
	public getTypeMessage(): string {
		
		return this.typeMessage;
		
	}
	
	public getTypeValue(): number {
		
		return this.typeValue;
		
	}
	
	public toString(): string {
		
		return "Hello!";
		
	}
	
}

export default AFAPIError;