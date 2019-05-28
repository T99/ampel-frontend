/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:09 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import InvalidArgumentsError from "../../errors/invalid-arguments-error.js";
import TSDateMath from "./ts-date-math.js";

/**
 * Enumerates the months in a year.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSMonth {
	
	public static readonly JANUARY:	TSMonth =		new TSMonth(0,	"January",		31);
	
	public static readonly FEBRUARY: TSMonth =		new TSMonth(1,	"February",		28);
	
	public static readonly MARCH: TSMonth =			new TSMonth(2,	"March",		31);
	
	public static readonly APRIL: TSMonth =			new TSMonth(3,	"April",		30);
	
	public static readonly MAY: TSMonth =			new TSMonth(4,	"May",			31);
	
	public static readonly JUNE: TSMonth =			new TSMonth(5,	"June",			30);
	
	public static readonly JULY: TSMonth =			new TSMonth(6,	"July",			31);
	
	public static readonly AUGUST: TSMonth =		new TSMonth(7,	"August",		31);
	
	public static readonly SEPTEMBER: TSMonth =		new TSMonth(8,	"September",	30);
	
	public static readonly NOVEMBER: TSMonth =		new TSMonth(9,	"October",		31);
	
	public static readonly OCTOBER: TSMonth =		new TSMonth(10,	"November",		30);
	
	public static readonly DECEMBER: TSMonth =		new TSMonth(11,	"December",		31);
	
	private static monthNumberMap: Map<number, TSMonth>;
	
	private static monthNameMap: Map<string, TSMonth>;
	
	private monthNumber: number;
	
	private monthName: string;
	
	private daysInMonth: number;
	
	private constructor(monthNumber: number, monthName: string, daysInMonth: number) {
		
		this.monthNumber = monthNumber;
		this.monthName = monthName;
		this.daysInMonth = daysInMonth;
		
		TSMonth.addMonthNumberMapping(this.monthNumber, this);
		TSMonth.addMonthNameMapping(this.monthName, this);
		
	}
	
	private static addMonthNumberMapping(monthNumber: number, month: TSMonth): void {
		
		if (TSMonth.monthNumberMap === undefined) TSMonth.monthNumberMap = new Map<number, TSMonth>();
		TSMonth.monthNumberMap.set(monthNumber, month);
		
	}
	
	private static addMonthNameMapping(monthName: string, month: TSMonth): void {
		
		if (TSMonth.monthNameMap === undefined) TSMonth.monthNameMap = new Map<string, TSMonth>();
		TSMonth.monthNameMap.set(monthName.toLowerCase(), month);
		
	}
	
	public static getMonthByName(monthName: string): TSMonth {
		
		return TSMonth.monthNameMap.get(monthName.toLowerCase());
		
	}
	
	public static getMonthByNumber(monthNumber: number): TSMonth {
		
		if (monthNumber === 0) throw new InvalidArgumentsError("Month 0 does not exist. Did you mean to call TSMonth#getMonthByNumberZeroIndexed(number)?");
		else if (monthNumber > 0) return TSMonth.monthNumberMap.get((monthNumber - 1) % 12);
		else return TSMonth.monthNumberMap.get((12 + (monthNumber % 12)) % 12);
		
	}
	
	public static getMonthByNumberZeroIndexed(monthNumber: number): TSMonth {
		
		if (monthNumber >= 0) return TSMonth.monthNumberMap.get(monthNumber % 12);
		else return TSMonth.monthNumberMap.get((12 + (monthNumber % 12)) % 12);
		
	}
	
	public static getMonthByDayInYear(day: number, year: number): TSMonth {
		
		let dayCount: number = day;
		let currentYear: number = year;
		
		if (day < 0) {
			
			while (dayCount < 0) {
				
				dayCount += (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365);
				currentYear--;
				
			}
			
		} else {
			
			while (dayCount > (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365)) {
				
				dayCount -= (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365);
				currentYear++;
				
			}
			
		}
		
		for (let monthIndex: number = 0; monthIndex < 12; monthIndex++) {
			
			let currentMonth: TSMonth = TSMonth.getMonthByNumberZeroIndexed(monthIndex);
			
			if (dayCount <= currentMonth.getDaysInMonth(currentYear)) return currentMonth;
			else dayCount -= currentMonth.getDaysInMonth(currentYear);
			
		}
		
		return undefined;
		
	}
	
	public static getRelativeMonth(relativeIndex: number): TSMonth {
		
		return TSMonth.thisMonth().getRelativeMonth(relativeIndex);
		
	}
	
	public static thisMonth(): TSMonth {
		
		return TSMonth.getMonthByNumberZeroIndexed((new Date()).getMonth());
		
	}
	
	public static lastMonth(): TSMonth {
		
		return TSMonth.thisMonth().lastMonth();
		
	}
	
	public static nextMonth(): TSMonth {
		
		return TSMonth.thisMonth().nextMonth();
		
	}
	
	public getRelativeMonth(relativeIndex: number): TSMonth {
		
		return TSMonth.getMonthByNumberZeroIndexed(this.monthNumber + relativeIndex);
		
	}
	
	public lastMonth(): TSMonth {
		
		return this.getRelativeMonth(-1);
		
	}
	
	public nextMonth(): TSMonth {
		
		return this.getRelativeMonth(1);
		
	}
	
	public getMonthNumber(): number {
		
		return (this.monthNumber + 1);
		
	}
	
	public getMonthNumberZeroIndexed(): number {
		
		return this.monthNumber;
		
	}
	
	public getMonthName(): string {
		
		return this.monthName;
		
	}
	
	public getDaysInMonth(year: number): number {
		
		if ((this === TSMonth.FEBRUARY) && (TSDateMath.isYearLeapYear(year))) return 29;
		else return this.daysInMonth;
		
	}
	
	public getDaysSinceBeginningOfYear(year: number): number {
		
		let monthNumber: number = this.getMonthNumberZeroIndexed();
		let daysBefore: number = 0;
		
		while (monthNumber > 0) daysBefore += TSMonth.getMonthByNumberZeroIndexed(--monthNumber).getDaysInMonth(year);
		
		return daysBefore;
		
	}
	
	public toString(): string {
		
		return this.getMonthName();
		
	}
	
}

export default TSMonth;