/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:20 PM -- March 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A enumeration of possible units of time.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTimeUnit {
	
	//                                                                 Singular         Plural          Time in Milliseconds
	
	public static readonly MILLISECOND: TSTimeUnit =	new TSTimeUnit("millisecond",	"milliseconds",	1);
	
	public static readonly SECOND: TSTimeUnit =			new TSTimeUnit("second",		"seconds",		1000);
	
	public static readonly MINUTE: TSTimeUnit =			new TSTimeUnit("minute",		"minutes",		1000 * 60);
	
	public static readonly HOUR: TSTimeUnit =			new TSTimeUnit("hour",			"hours",		1000 * 60 * 60);
	
	public static readonly DAY: TSTimeUnit =			new TSTimeUnit("day",			"days",			1000 * 60 * 60 * 24);
	
	public static readonly WEEK: TSTimeUnit =			new TSTimeUnit("week",			"weeks",		1000 * 60 * 60 * 24 * 7);
	
	public static readonly MONTH: TSTimeUnit =			new TSTimeUnit("month",			"months",		1000 * 60 * 60 * 24 * 30);
	
	public static readonly YEAR: TSTimeUnit =			new TSTimeUnit("year",			"years",		1000 * 60 * 60 * 24 * 365);
	
	public static readonly DECADE: TSTimeUnit =			new TSTimeUnit("decade",		"decades",		1000 * 60 * 60 * 24 * 365 * 10);
	
	public static readonly CENTURY: TSTimeUnit =		new TSTimeUnit("century",		"centuries",	1000 * 60 * 60 * 24 * 365 * 100);
	
	public static readonly MILLENNIUM: TSTimeUnit =		new TSTimeUnit("millennium",	"millennia",	1000 * 60 * 60 * 24 * 365 * 1000);
	
	private readonly singularName: string;
	
	private readonly pluralName: string;
	
	private readonly milliseconds: number;
	
	private constructor(singularName: string, pluralName: string, milliseconds: number) {
		
		this.singularName = singularName;
		this.pluralName = pluralName;
		this.milliseconds = milliseconds;
		
	}
	
	public getSingularName(): string {
		
		return this.singularName;
		
	}
	
	public getPluralName(): string {
		
		return this.pluralName;
		
	}
	
	public getMilliseconds(): number {
		
		return this.milliseconds;
		
	}
	
}

export default TSTimeUnit;