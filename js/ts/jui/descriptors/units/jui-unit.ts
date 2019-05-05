/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:19 PM -- December 21st, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import JUIUnitDescriptor from "./jui-unit-descriptor.js";

/**
 * Describes a CSS length/getHeight/width in both it's magnitude (a number) and measurement (a {@link JUIUnitDescriptor}).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIUnit {
	
	private value: number;
	private measurement: JUIUnitDescriptor;
	
	public constructor(value: number, measurement: JUIUnitDescriptor) {
		
		this.value = value;
		this.measurement = measurement;
		
	}
	
	public set(value: number): void {
		
		this.value = value;
		
	}
	
	public increment(difference?: number): number {
		
		this.value = this.value + (difference ? difference : 1);
		return this.value;
		
	}
	
	public decrement(difference?: number): number {
		
		this.value = this.value - (difference ? difference : 1);
		return this.value;
		
	}
	
	public changeMeasurement(measurement: JUIUnitDescriptor): void {
		
		this.measurement = measurement;
		
	}
	
	public getNumericValue(): number {
		
		return this.value;
		
	}
	
	public getUnitType(): JUIUnitDescriptor {
		
		return this.measurement;
		
	}
	
	public toString(): string {
		
		return this.value + this.measurement.toString();
		
	}
	
}

export default JUIUnit;