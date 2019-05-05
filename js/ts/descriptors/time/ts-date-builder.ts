/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:18 PM -- March 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

import BuilderBase from "../../helpers/builder-base.js";
import TSDate from "./ts-date.js";
import TSDateMath from "./ts-date-math.js";
import TSTimeUnit from "./ts-time-unit.js";
import TSMonth from "./ts-month.js";
import InvalidArgumentsError from "../../errors/invalid-arguments-error.js";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSDateBuilder extends BuilderBase<TSDate> {
	
	public constructor() {
		
		super();
		
		this.addOptionals(
			"year",
			"month",
			"day",
			"hours",
			"minutes",
			"seconds",
			"milliseconds",
			"offset"
		);
		
	}
	
	public withYear(year: number): TSDateBuilder {
		
		this.fulfillRequirement("year", year);
		
		return this;
		
	}
	
	public withMonth(month: TSMonth): TSDateBuilder {
		
		this.fulfillRequirement("month", month);
		
		return this;
		
	}
	
	public withDay(day: number): TSDateBuilder {
		
		if (day === 0) throw new InvalidArgumentsError("Day 0 does not exist. Did you mean to call TSDateBuilder#withDayZeroIndexed(number)?");
		else if (day > 0) this.fulfillRequirement("day", day - 1);
		else if (day < 0) this.fulfillRequirement("day", day);
		
		return this;
		
	}
	
	public withDayZeroIndexed(day: number): TSDateBuilder {
		
		this.fulfillRequirement("day", day);
		
		return this;
		
	}
	
	public withHours(hours: number): TSDateBuilder {
		
		this.fulfillRequirement("hours", hours);
		
		return this;
		
	}
	
	public withMinutes(minutes: number): TSDateBuilder {
		
		this.fulfillRequirement("minutes", minutes);
		
		return this;
		
	}
	
	public withSeconds(seconds: number): TSDateBuilder {
		
		this.fulfillRequirement("seconds", seconds);
		
		return this;
		
	}
	
	public withMilliseconds(milliseconds: number): TSDateBuilder {
		
		this.fulfillRequirement("milliseconds", milliseconds);
		
		return this;
		
	}
	
	public withOffset(offsetHours: number): TSDateBuilder {
		
		this.fulfillRequirement("offset", offsetHours);
		
		return this;
		
	}
	
	public build(): TSDate {
		
		let milliseconds: number = 0;
		
		if (this.checkFulfillment("year")) {
			
			let year: number = this.getValueOfRequirement("year");
			let leapYears: number = TSDateMath.getLeapYearsBetweenYears(1970, year);
			
			milliseconds += ((((year - 1970) * 365) + leapYears) * TSTimeUnit.DAY.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("month")) {
			
			let month: TSMonth = this.getValueOfRequirement("month");
			let relevantYear: number = (this.checkFulfillment("year") ? this.getValueOfRequirement("year") : 1970);
			let daysSinceBeginningOfYear: number = month.getDaysSinceBeginningOfYear(relevantYear);
			
			milliseconds += (daysSinceBeginningOfYear * TSTimeUnit.DAY.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("day")) {
			
			milliseconds += (this.getValueOfRequirement("day") * TSTimeUnit.DAY.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("hours")) {
			
			milliseconds += (this.getValueOfRequirement("hours") * TSTimeUnit.HOUR.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("minutes")) {
			
			milliseconds += (this.getValueOfRequirement("minutes") * TSTimeUnit.MINUTE.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("seconds")) {
			
			milliseconds += (this.getValueOfRequirement("seconds") * TSTimeUnit.SECOND.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("milliseconds")) {
			
			milliseconds += (this.getValueOfRequirement("milliseconds") * TSTimeUnit.MILLISECOND.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("offset")) {
			
			milliseconds -= (this.getValueOfRequirement("offset") * TSTimeUnit.HOUR.getMilliseconds());
			
		}
		
		if (this.checkFulfillment("offset")) return TSDate.fromEpochTime(milliseconds, this.getValueOfRequirement("offset"));
		else return TSDate.fromEpochTime(milliseconds);
		
	}
}

export default TSDateBuilder;