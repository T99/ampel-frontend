/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:16 PM -- March 07th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSTimeUnit from "./ts-time-unit.js";
import TSDate from "./ts-date.js";
/**
 * A class representing a length of time.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSTimespan {
    constructor(milliseconds) {
        this.milliseconds = milliseconds;
    }
    static between(date1, date2) {
        let oldest = Math.min(date1.getAdjustedEpochTime(), date2.getAdjustedEpochTime());
        let newest = Math.max(date1.getAdjustedEpochTime(), date2.getAdjustedEpochTime());
        return new TSTimespan(newest - oldest);
    }
    static since(date) {
        return new TSTimespan(TSDate.fromNow().getAdjustedEpochTime() - date.getAdjustedEpochTime());
    }
    static until(date) {
        return new TSTimespan(date.getAdjustedEpochTime() - TSDate.fromNow().getAdjustedEpochTime());
    }
    toMilliseconds() {
        return this.milliseconds;
    }
    toSeconds() {
        return (this.milliseconds / TSTimeUnit.SECOND.getMilliseconds());
    }
    toMinutes() {
        return (this.milliseconds / TSTimeUnit.MINUTE.getMilliseconds());
    }
    toHours() {
        return (this.milliseconds / TSTimeUnit.HOUR.getMilliseconds());
    }
    toDays() {
        return (this.milliseconds / TSTimeUnit.DAY.getMilliseconds());
    }
    toWeeks() {
        return (this.milliseconds / TSTimeUnit.WEEK.getMilliseconds());
    }
    toMonths() {
        return (this.milliseconds / TSTimeUnit.MONTH.getMilliseconds());
    }
    toYears() {
        return (this.milliseconds / TSTimeUnit.YEAR.getMilliseconds());
    }
    toStringFromUnits(units, enforceUse) {
        let sortedUnits = [];
        while (units.length !== 0) {
            let largestIndex = 0;
            for (let index = 1; index < units.length; index++) {
                if (units[index].getMilliseconds() > units[largestIndex].getMilliseconds())
                    largestIndex = index;
            }
            sortedUnits.push(units[largestIndex]);
            units.removeIndex(largestIndex);
        }
        let unitStrings = [];
        let remainingTime = this.milliseconds;
        for (let unit of sortedUnits) {
            let unitString = "";
            let amount = Math.floor(remainingTime / unit.getMilliseconds());
            if ((amount !== 0) || ((amount === 0) && (enforceUse === true))) {
                unitString += amount;
                unitString += " ";
                if (amount === 1)
                    unitString += unit.getSingularName();
                else
                    unitString += unit.getPluralName();
                remainingTime -= (amount * unit.getMilliseconds());
            }
            if (unitString !== "")
                unitStrings.push(unitString);
        }
        let finalResult = "";
        for (let index = 0; index < unitStrings.length; index++) {
            finalResult += unitStrings[index];
            if (index < unitStrings.length - 2)
                finalResult += ", ";
            else if (index < unitStrings.length - 1)
                finalResult += ", and ";
        }
        return finalResult;
    }
}
export default TSTimespan;
//# sourceMappingURL=ts-timespan.js.map