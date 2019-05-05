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
    constructor(singularName, pluralName, milliseconds) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.milliseconds = milliseconds;
    }
    getSingularName() {
        return this.singularName;
    }
    getPluralName() {
        return this.pluralName;
    }
    getMilliseconds() {
        return this.milliseconds;
    }
}
//                                                                 Singular         Plural          Time in Milliseconds
TSTimeUnit.MILLISECOND = new TSTimeUnit("millisecond", "milliseconds", 1);
TSTimeUnit.SECOND = new TSTimeUnit("second", "seconds", 1000);
TSTimeUnit.MINUTE = new TSTimeUnit("minute", "minutes", 1000 * 60);
TSTimeUnit.HOUR = new TSTimeUnit("hour", "hours", 1000 * 60 * 60);
TSTimeUnit.DAY = new TSTimeUnit("day", "days", 1000 * 60 * 60 * 24);
TSTimeUnit.WEEK = new TSTimeUnit("week", "weeks", 1000 * 60 * 60 * 24 * 7);
TSTimeUnit.MONTH = new TSTimeUnit("month", "months", 1000 * 60 * 60 * 24 * 30);
TSTimeUnit.YEAR = new TSTimeUnit("year", "years", 1000 * 60 * 60 * 24 * 365);
TSTimeUnit.DECADE = new TSTimeUnit("decade", "decades", 1000 * 60 * 60 * 24 * 365 * 10);
TSTimeUnit.CENTURY = new TSTimeUnit("century", "centuries", 1000 * 60 * 60 * 24 * 365 * 100);
TSTimeUnit.MILLENNIUM = new TSTimeUnit("millennium", "millennia", 1000 * 60 * 60 * 24 * 365 * 1000);
export default TSTimeUnit;
//# sourceMappingURL=ts-time-unit.js.map