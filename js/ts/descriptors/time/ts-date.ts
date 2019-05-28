/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:00 PM -- January 28th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import TSMonth from "./ts-month.js";
import TSDateMath from "./ts-date-math.js";
import TSTimespan from "./ts-timespan.js";
import TSDateBuilder from "./ts-date-builder.js";
import TSTimeUnit from "./ts-time-unit.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDate {
	
	private static readonly EPOCH_YEAR: number = 1970;
	
	private epochTime: number;
	
	private offsetHours: number;
	
	private constructor(epochTime: number, offsetHours?: number) {
		
		this.epochTime = epochTime;
		this.offsetHours = (offsetHours !== undefined ? offsetHours : 0);
		
	}
	
	public static fromNow(): TSDate {
		
		let now: Date = new Date();
		return new TSDate(now.getTime(), (-now.getTimezoneOffset() / 60));
		
	}
	
	public static fromDate(date: Date): TSDate {
		
		return new TSDate(date.getTime(), (-date.getTimezoneOffset() / 60));
		
	}
	
	public static fromEpochTime(epochTime: number, offsetHours?: number): TSDate {
		
		return new TSDate(epochTime, offsetHours);
		
	}
	
	public static fromTheBeginningOfTime(offsetHours?: number): TSDate {
		
		return new TSDate(0, offsetHours);
		
	}
	
	public isYearLeapYear(): boolean {
		
		return TSDateMath.isYearLeapYear(this.getYear());
		
	}
	
	public getYear(): number {
		
		let millisecondApproximation: number = this.getAdjustedEpochTime();
		let yearApproximation: number = (TSDate.EPOCH_YEAR + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
		let leapYearBeingInspected: number;
		
		if (this.getAdjustedEpochTime() >= 0) {
			
			leapYearBeingInspected = 1972;
			
			while (leapYearBeingInspected < Math.floor(yearApproximation)) {
				
				if (TSDateMath.isYearLeapYear(leapYearBeingInspected)) {
					
					millisecondApproximation -= TSTimeUnit.DAY.getMilliseconds();
					yearApproximation = (TSDate.EPOCH_YEAR + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
					
				}
				
				leapYearBeingInspected += 4;
				
			}
			
		} else {
			
			leapYearBeingInspected = 1968;
			
			while (leapYearBeingInspected > yearApproximation) {
				
				if (TSDateMath.isYearLeapYear(leapYearBeingInspected)) {
					
					millisecondApproximation += TSTimeUnit.DAY.getMilliseconds();
					yearApproximation = (TSDate.EPOCH_YEAR + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
					
				}
				
				leapYearBeingInspected -= 4;
				
			}
			
		}
		
		return Math.floor(yearApproximation);
		
	}
	
	public getMonth(): TSMonth {
		
		let year: number = this.getYear();
		let beginningOfYear: TSDate = (new TSDateBuilder()).withYear(year).build();
		let dayInYear: number = TSTimespan.between(beginningOfYear, this).toDays();
		
		return TSMonth.getMonthByDayInYear(dayInYear, year);
		
	}
	
	public getDayOfMonth(): number {
		
		let beginningOfMonth: TSDate =
			(new TSDateBuilder())
				.withYear(this.getYear())
				.withMonth(this.getMonth())
				.build();
		
		return (Math.floor(TSTimespan.between(beginningOfMonth, this).toDays()) + 1);
		
	}
	
	public getHourOfDay24HourZeroIndexed(): number {
		
		let beginningOfDay: TSDate =
			(new TSDateBuilder())
			.withYear(this.getYear())
			.withMonth(this.getMonth())
			.withDay(this.getDayOfMonth())
			.build();
		
		return (Math.floor(TSTimespan.between(beginningOfDay, this).toHours()));
		
	}
	
	public getHourOfDay24Hour(): number {
		
		let zeroIndexed: number = this.getHourOfDay24HourZeroIndexed();
		
		if (zeroIndexed === 0) return 12;
		else return zeroIndexed + 1;
		
	}
	
	public getHourOfDay12Hour(): number {
		
		return (this.getHourOfDay24Hour() % 13);
		
	}
	
	public get12HourPeriod(): string {
		
		return (this.getHourOfDay24HourZeroIndexed() > 12 ? "PM" : "AM");
		
	}
	
	public getMinuteOfHour(): number {
		
		let beginningOfHour: TSDate =
			(new TSDateBuilder())
			.withYear(this.getYear())
			.withMonth(this.getMonth())
			.withDay(this.getDayOfMonth())
			.withHours(this.getHourOfDay24HourZeroIndexed())
			.build();
		
		return (Math.floor(TSTimespan.between(beginningOfHour, this).toMinutes()));
		
	}
	
	public getSecondOfMinute(): number {
		
		let beginningOfMinute: TSDate =
			(new TSDateBuilder())
			.withYear(this.getYear())
			.withMonth(this.getMonth())
			.withDay(this.getDayOfMonth())
			.withHours(this.getHourOfDay24HourZeroIndexed())
			.withMinutes(this.getMinuteOfHour())
			.build();
		
		return (Math.floor(TSTimespan.between(beginningOfMinute, this).toSeconds()));
		
	}
	
	public getMillisecondOfSecond(): number {
		
		let beginningOfSecond: TSDate =
			(new TSDateBuilder())
			.withYear(this.getYear())
			.withMonth(this.getMonth())
			.withDay(this.getDayOfMonth())
			.withHours(this.getHourOfDay24HourZeroIndexed())
			.withMinutes(this.getMinuteOfHour())
			.withSeconds(this.getSecondOfMinute())
			.build();
		
		return (Math.floor(TSTimespan.between(beginningOfSecond, this).toMilliseconds()));
		
	}
	
	public getUTCOffset(): number {
		
		return this.offsetHours;
		
	}
	
	public getEpochTime(): number {
		
		return this.epochTime;
		
	}
	
	public getAdjustedEpochTime(): number {
		
		return (this.getEpochTime() + (this.getUTCOffset() * TSTimeUnit.HOUR.getMilliseconds()));
		
	}
	
	public toString(): string {
		
		let month: string = this.getMonth().getMonthName();
		let day: number = this.getDayOfMonth();
		let ordinalIndicator: string = TSDateMath.getOrdinalIndicator(day);
		let year: number = this.getYear();
		let utcString: string = "(UTC" + (this.getUTCOffset() >= 0 ? "+" : "") + this.getUTCOffset() + ")";
		let hour: string = this.getHourOfDay12Hour().toString();
		let minute: string = this.getMinuteOfHour().toString();
		let second: string = this.getSecondOfMinute().toString();
		let millisecond: string = this.getMillisecondOfSecond().toString();
		let period: string = this.get12HourPeriod();
		
		while (minute.length < 2) minute = "0" + minute;
		while (second.length < 2) second = "0" + second;
		while (millisecond.length < 3) millisecond = "0" + millisecond;
		
		return (
			month + " " + day + ordinalIndicator + ", " + year + " " +
			utcString + " " + hour + ":" + minute + ":" + second + "." + millisecond + " " + period
		);
		
	}
	
}

export default TSDate;