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
    constructor(offset, primaryName, ...names) {
        this.offset = offset;
        this.names = [primaryName, ...names];
    }
}
// TODO [3/8/19 @ 2:19 AM] - Finish this class's enum members.
TSTimeZone.UTC_POS_14 = new TSTimeZone(+14, "LINT");
TSTimeZone.UTC_POS_13_75 = new TSTimeZone(+13.75, "CHADT");
TSTimeZone.UTC_POS_13 = new TSTimeZone(+13, "NZDT", "PHOT", "TKT", "TOT");
TSTimeZone.UTC_POS_12_75 = new TSTimeZone(+12.75, "CHAST");
TSTimeZone.UTC_POS_12 = new TSTimeZone(+12, "");
TSTimeZone.UTC_POS_11 = new TSTimeZone(+11, "");
TSTimeZone.UTC_POS_10 = new TSTimeZone(+10, "");
TSTimeZone.UTC_POS_9 = new TSTimeZone(+9, "");
TSTimeZone.UTC_POS_8 = new TSTimeZone(+8, "");
TSTimeZone.UTC_POS_7 = new TSTimeZone(+7, "");
TSTimeZone.UTC_POS_6 = new TSTimeZone(+6, "");
TSTimeZone.UTC_POS_5 = new TSTimeZone(+5, "");
TSTimeZone.UTC_POS_4 = new TSTimeZone(+4, "");
TSTimeZone.UTC_POS_3 = new TSTimeZone(+3, "");
TSTimeZone.UTC_POS_2 = new TSTimeZone(+2, "");
TSTimeZone.UTC_POS_1 = new TSTimeZone(+1, "BST", "CET", "DFT", "IST", "MET", "WAT", "WEST");
TSTimeZone.UTC = new TSTimeZone(0, "UTC", "GMT", "AZOST", "EGST", "WET");
TSTimeZone.UTC_NEG_1 = new TSTimeZone(-1, "AZOT", "CVT", "EGT");
TSTimeZone.UTC_NEG_2 = new TSTimeZone(-2, "BRST", "FNT", "GST", "PMDT", "UYST");
TSTimeZone.UTC_NEG_2_5 = new TSTimeZone(-2.5, "BRST", "FNT", "GST", "PMDT", "UYST");
TSTimeZone.UTC_NEG_3 = new TSTimeZone(-3, "ADT", "AMST", "ART", "BRT", "CLST", "FKST", "GFT", "PMST", "PYST", "ROTT", "SRT", "UYT");
TSTimeZone.UTC_NEG_3_5 = new TSTimeZone(-3.5, "NST", "NT");
TSTimeZone.UTC_NEG_4 = new TSTimeZone(-4, "AMT", "AST", "BOT", "CDT", "CLT", "COST", "ECT", "EDT", "FKT", "GYT", "PYT", "VET");
TSTimeZone.UTC_NEG_5 = new TSTimeZone(-5, "EST", "CDT", "ACT", "COT", "EASST", "ECT", "PET");
TSTimeZone.UTC_NEG_6 = new TSTimeZone(-6, "CST", "MDT", "EAST", "GALT");
TSTimeZone.UTC_NEG_7 = new TSTimeZone(-7, "MST", "PDT");
TSTimeZone.UTC_NEG_8 = new TSTimeZone(-8, "PST", "AKDT", "CIST");
TSTimeZone.UTC_NEG_9 = new TSTimeZone(-9, "AKST", "GAMT", "GIT", "HDT");
TSTimeZone.UTC_NEG_9_5 = new TSTimeZone(-9.5, "MART", "MIT");
TSTimeZone.UTC_NEG_10 = new TSTimeZone(-10, "HST", "CKT", "SDT", "TAHT");
TSTimeZone.UTC_NEG_11 = new TSTimeZone(-11, "NUT", "SST");
TSTimeZone.UTC_NEG_12 = new TSTimeZone(-12, "BIT", "IDLW");
export default TSTimeZone;
//# sourceMappingURL=ts-time-zone.js.map