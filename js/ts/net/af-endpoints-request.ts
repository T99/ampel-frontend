/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:10 PM -- December 16th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import HTTPMethod from "../descriptors/http-method.js";
import TSObjectIterator from "../structures/implementations/iterate/ts-object-iterator.js";
import InvalidArgumentsError from "../errors/invalid-arguments-error.js";

/**
 * Describes the most basic form of an request to an Ampel endpoint.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFEndpointRequest {
	
	protected method: HTTPMethod;
	protected path: string = "https://api.ampelfeedback.xyz";
	protected requestBody: any;
	protected token: string;
	
	public constructor(method: HTTPMethod, endpointPath: string) {
		
		this.method = method;
		this.path += endpointPath;
		
	}
	
	// DOC-ME [12/16/18 @ 11:57 PM] - Documentation required!
	public getMethod(): HTTPMethod {
		
		return this.method;
		
	}
	
	// DOC-ME [12/16/18 @ 11:40 PM] - Documentation required!
	public getPath(): string {
		
		if (this.method !== HTTPMethod.GET || (this.method === HTTPMethod.GET && this.requestBody === undefined)) return this.path;
		else {
			
			let uri: string = this.path + "?";
			
			let objectIterator: TSObjectIterator = new TSObjectIterator(this.requestBody);
			
			objectIterator.forEachRemaining((element: { key: string, value: any }) => {
				
				uri += element.key;
				uri += "=";
				uri += element.value;
				
				if (objectIterator.hasNext()) uri += "&";
				
			});
			
			return uri;
			
		}
		
	}
	
	// DOC-ME [2/5/19 @ 12:02 AM] - Documentation required!
	public getRawPath(): string {
		
		return this.path;
		
	}
	
	// DOC-ME [2/8/19 @ 12:34 AM] - Documentation required!
	public setRequestBody(requestBody: any): void {
		
		this.requestBody = requestBody;
		
	}
	
	/**
	 * Returns true if this AFEndpointRequest has a request body associated with it.
	 *
	 * @returns {boolean} true if this AFEndpointRequest has a request body associated with it.
	 */
	public hasRequestBody(): boolean {
		
		if (this.method === HTTPMethod.GET) return false;
		else return (this.requestBody !== undefined);
		
	}
	
	/**
	 * Gets the API token/JWT that is associated with this type of AFEndpointRequest.
	 *
	 * @returns {object} The API token/JWT that is associated with this type of AFEndpointRequest.
	 */
	public getRequestBody(): any {
		
		if (this.method !== HTTPMethod.GET) return this.requestBody;
		else return null;
		
	}
	
	public getRawRequestBody(): any {
		
		return this.requestBody;
		
	}
	
	// DOC-ME [2/8/19 @ 12:34 AM] - Documentation required!
	public setToken(token: string): void {
		
		this.token = token;
		
	}
	
	/**
	 * Returns true if this type of AFEndpointRequest has a required token associated with it.
	 *
	 * @returns {boolean} true if this type of AFEndpointRequest has a required token associated with it.
	 */
	public hasToken(): boolean {
		
		return (this.token !== undefined);
		
	}
	
	/**
	 * Gets the API token/JWT that is associated with this type of AFEndpointRequest.
	 *
	 * @returns {string} The API token/JWT that is associated with this type of AFEndpointRequest.
	 */
	public getToken(): string {
		
		return this.token;
		
	}
	
}

export default AFEndpointRequest;