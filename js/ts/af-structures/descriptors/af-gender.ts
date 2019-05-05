/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:09 AM -- February 01st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Enumerates possible genders.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFGender {
	
	public static readonly UNSPECIFIED: AFGender = new AFGender("Unspecified", 0);
	
	public static readonly MALE: AFGender = new AFGender("Male", 1);
	
	public static readonly FEMALE: AFGender = new AFGender("Female", 2);
	
	private readonly stringValue: string;
	
	private readonly numericalValue: number;
	
	private static numericalValueMap: Map<number, AFGender>;
	
	private constructor(stringValue: string, numericalValue: number) {
		
		this.stringValue = stringValue;
		this.numericalValue = numericalValue;
		
		AFGender.addNumericalValueMapping(this.numericalValue, this);
		
	}
	
	private static addNumericalValueMapping(numericalValue: number, gender: AFGender): void {
		
		if (AFGender.numericalValueMap === undefined) AFGender.numericalValueMap = new Map<number, AFGender>();
		
		AFGender.numericalValueMap.set(numericalValue, gender);
		
	}
	
	public static fromNumericalValue(numericalValue: number): AFGender {
		
		return AFGender.numericalValueMap.get(numericalValue);
		
	}
	
	public getStringValue(): string {
		
		return this.stringValue;
		
	}
	
	public getNumericalValue(): number {
		
		return this.numericalValue;
		
	}
	
	public equals(gender: AFGender): boolean {
		
		return (this.getNumericalValue() === gender.getNumericalValue());
		
	}
	
}

export default AFGender;