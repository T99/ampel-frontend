/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:12 PM -- May 24th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates different types of inputs alongside descriptions of the given type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIInputType {
	
	public static readonly BUTTON:			JUIInputType = new JUIInputType("button");
	public static readonly CHECKBOX:		JUIInputType = new JUIInputType("checkbox");
	public static readonly COLOR:			JUIInputType = new JUIInputType("color");
	public static readonly DATE:			JUIInputType = new JUIInputType("date");
	public static readonly FILE:			JUIInputType = new JUIInputType("file");
	public static readonly IMAGE_BUTTON:	JUIInputType = new JUIInputType("image");
	public static readonly MONTH:			JUIInputType = new JUIInputType("month");
	public static readonly SIMPLE_DATE:		JUIInputType = new JUIInputType("datetime-local");
	
	private static typeStringMap: Map<string, JUIInputType>;
	
	private typeString: string;
	
	protected constructor(typeString: string) {
	
		this.typeString = typeString;
		
		JUIInputType.addTypeStringMapping(typeString, this);
	
	}
	
	protected static addTypeStringMapping(typeString: string, type: JUIInputType): void {
		
		if (JUIInputType.typeStringMap === undefined) JUIInputType.typeStringMap = new Map<string, JUIInputType>();
		
		JUIInputType.typeStringMap.set(typeString, type);
		
	}
	
	public static getInputTypeForTypeString(typeString: string): JUIInputType {
		
		return JUIInputType.typeStringMap.get(typeString);
		
	}
	
	public getTypeString(): string {
		
		return this.typeString;
		
	}
	
}

export default JUIInputType;