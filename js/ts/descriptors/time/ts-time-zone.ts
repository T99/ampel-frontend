/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:58 AM -- March 08th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An enumeration of possible time zones.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTimeZone {
	
	// TODO [3/8/19 @ 2:19 AM] - Finish this class's enum members.
	
	public static readonly UTC_POS_14: TSTimeZone =		new TSTimeZone(+14,		"LINT");
	
	public static readonly UTC_POS_13_75: TSTimeZone =	new TSTimeZone(+13.75,	"CHADT");
	
	public static readonly UTC_POS_13: TSTimeZone =		new TSTimeZone(+13,		"NZDT", "PHOT", "TKT", "TOT");
	
	public static readonly UTC_POS_12_75: TSTimeZone =	new TSTimeZone(+12.75,	"CHAST");
	
	public static readonly UTC_POS_12: TSTimeZone =		new TSTimeZone(+12,		"");
	
	public static readonly UTC_POS_11: TSTimeZone =		new TSTimeZone(+11,		"");
	
	public static readonly UTC_POS_10: TSTimeZone =		new TSTimeZone(+10,		"");
	
	public static readonly UTC_POS_9: TSTimeZone =		new TSTimeZone(+9,		"");
	
	public static readonly UTC_POS_8: TSTimeZone =		new TSTimeZone(+8,		"");
	
	public static readonly UTC_POS_7: TSTimeZone =		new TSTimeZone(+7,		"");
	
	public static readonly UTC_POS_6: TSTimeZone =		new TSTimeZone(+6,		"");
	
	public static readonly UTC_POS_5: TSTimeZone =		new TSTimeZone(+5,		"");
	
	public static readonly UTC_POS_4: TSTimeZone =		new TSTimeZone(+4,		"");
	
	public static readonly UTC_POS_3: TSTimeZone =		new TSTimeZone(+3,		"");
	
	public static readonly UTC_POS_2: TSTimeZone =		new TSTimeZone(+2,		"");
	
	public static readonly UTC_POS_1: TSTimeZone =		new TSTimeZone(+1,		"BST", "CET", "DFT", "IST", "MET", "WAT", "WEST");
	
	public static readonly UTC: TSTimeZone =			new TSTimeZone(0,		"UTC", "GMT", "AZOST", "EGST", "WET");
	
	public static readonly UTC_NEG_1: TSTimeZone =		new TSTimeZone(-1,		"AZOT", "CVT", "EGT");
	
	public static readonly UTC_NEG_2: TSTimeZone =		new TSTimeZone(-2,		"BRST", "FNT", "GST", "PMDT", "UYST");
	
	public static readonly UTC_NEG_2_5: TSTimeZone =	new TSTimeZone(-2.5,	"BRST", "FNT", "GST", "PMDT", "UYST");
	
	public static readonly UTC_NEG_3: TSTimeZone =		new TSTimeZone(-3,		"ADT", "AMST", "ART", "BRT", "CLST", "FKST", "GFT", "PMST", "PYST", "ROTT",
																				"SRT", "UYT");
	
	public static readonly UTC_NEG_3_5: TSTimeZone =	new TSTimeZone(-3.5,	"NST", "NT");
	
	public static readonly UTC_NEG_4: TSTimeZone =		new TSTimeZone(-4,		"AMT", "AST", "BOT", "CDT", "CLT", "COST", "ECT", "EDT", "FKT", "GYT", "PYT",
																				"VET");
	
	public static readonly UTC_NEG_5: TSTimeZone =		new TSTimeZone(-5,		"EST", "CDT", "ACT", "COT", "EASST", "ECT", "PET");
	
	public static readonly UTC_NEG_6: TSTimeZone =		new TSTimeZone(-6,		"CST", "MDT", "EAST", "GALT");
	
	public static readonly UTC_NEG_7: TSTimeZone =		new TSTimeZone(-7,		"MST", "PDT");
	
	public static readonly UTC_NEG_8: TSTimeZone =		new TSTimeZone(-8,		"PST", "AKDT", "CIST");
	
	public static readonly UTC_NEG_9: TSTimeZone =		new TSTimeZone(-9,		"AKST", "GAMT", "GIT", "HDT");
	
	public static readonly UTC_NEG_9_5: TSTimeZone =	new TSTimeZone(-9.5,	"MART", "MIT");
	
	public static readonly UTC_NEG_10: TSTimeZone =		new TSTimeZone(-10,		"HST", "CKT", "SDT", "TAHT");
	
	public static readonly UTC_NEG_11: TSTimeZone =		new TSTimeZone(-11,		"NUT", "SST");
	
	public static readonly UTC_NEG_12: TSTimeZone =		new TSTimeZone(-12,		"BIT", "IDLW");
	
	private offset: number;
	
	private names: string[];
	
	private static offsetMap: Map<number, TSTimeZone>;
	
	private constructor(offset: number, primaryName: string, ...names: string[]) {
		
		this.offset = offset;
		this.names = [primaryName, ...names];
		
		TSTimeZone.addOffsetMapping(offset, this);
		
	}
	
	private static addOffsetMapping(offset: number, timezone: TSTimeZone): void {
		
		if (TSTimeZone.offsetMap === undefined) TSTimeZone.offsetMap = new Map<number, TSTimeZone>();
		
		TSTimeZone.offsetMap.set(offset, timezone);
		
	}
	
	public static getTimezoneForOffset(offset: number): TSTimeZone {
		
		return TSTimeZone.offsetMap.get(offset);
		
	}
	
	public getOffset(): number {
		
		return this.offset;
		
	}
	
	public getPrimaryName(): string {
		
		return this.names[0];
		
	}
	
	public getAllNames(): string[] {
		
		return this.names;
		
	}
	
}

export default TSTimeZone;