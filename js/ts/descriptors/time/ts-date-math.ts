/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:52 PM -- March 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A class containing various date math calculations used in determining dates from epoch/Unix times, leap years, etc.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDateMath {
	
	private constructor() { /* Do nothing. */ }
	
	public static isYearLeapYear(year: number): boolean {
		
		year = Math.floor(year);
		
		if (year % 4 === 0) {
			
			if (year % 100 === 0) {
				
				return (year % 400 === 0);
				
			} else return true;
			
		} else return false;
		
	}
	
	/**
	 * Returns the number of leap years between two years. The older date is inclusive while the newer date in
	 * exclusive.
	 * 
	 * @param {number} begin The year at which to begin counting leap years.
	 * @param {number} end The year at which to stop counting leap years.
	 * @returns {number} The number of leap years between the provided years.
	 */
	public static getLeapYearsBetweenYears(begin: number, end: number): number {
		
		let firstLeapYear: number = Math.min(begin, end);
		let lastLeapYear: number = Math.max(begin, end) - 1;
		
		while (!TSDateMath.isYearLeapYear(firstLeapYear)) firstLeapYear++;
		while (!TSDateMath.isYearLeapYear(lastLeapYear)) lastLeapYear--;
		
		if (firstLeapYear > lastLeapYear) return 0;
		else {
			
			let precursoryResult: number = Math.abs((lastLeapYear - firstLeapYear) / 4) + 1;
			
			let firstCentury: number = Math.ceil(firstLeapYear / 100) * 100;
			let lastCentury: number = Math.floor(lastLeapYear / 100) * 100;
			
			for (let year: number = firstCentury; year <= lastCentury; year += 100) {
				
				if (!TSDateMath.isYearLeapYear(year)) precursoryResult--;
				
			}
			
			return precursoryResult;
			
		}
		
	}
	
	public static getOrdinalIndicator(day: number): string {
		
		if (((day % 10) === 1) && day !== 11) return "st";
		if (((day % 10) === 2) && day !== 12) return "nd";
		if (((day % 10) === 3) && day !== 13) return "rd";
		else return "th";
		
	}
	
}

export default TSDateMath;