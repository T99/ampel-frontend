/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:41 PM -- May 30th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFAPIContentType {
	
	public static readonly JSON: AFAPIContentType = new AFAPIContentType((xhr: XMLHttpRequest): any => JSON.parse(xhr.responseText));
	public static readonly CSV: AFAPIContentType = new AFAPIContentType((xhr: XMLHttpRequest): any => xhr.response);
	
	private readonly processor: (xhr: XMLHttpRequest) => any;
	
	public constructor(processor: (xhr: XMLHttpRequest) => any) {
	
		this.processor = processor;
	
	}
	
	public process(xhr: XMLHttpRequest): any {
		
		return this.processor(xhr);
		
	}
	
}

export default AFAPIContentType;