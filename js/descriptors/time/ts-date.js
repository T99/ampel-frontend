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
    constructor(epochTime, offsetHours) {
        this.epochTime = epochTime;
        this.offsetHours = (offsetHours !== undefined ? offsetHours : 0);
    }
    static fromNow() {
        let now = new Date();
        return new TSDate(now.getTime(), (-now.getTimezoneOffset() / 60));
    }
    static fromDate(date) {
        return new TSDate(date.getTime(), (-date.getTimezoneOffset() / 60));
    }
    static fromEpochTime(epochTime, offsetHours) {
        return new TSDate(epochTime, offsetHours);
    }
    static fromTheBeginningOfTime(offsetHours) {
        return new TSDate(0, offsetHours);
    }
    isYearLeapYear() {
        return TSDateMath.isYearLeapYear(this.getYear());
    }
    getYear() {
        let millisecondApproximation = this.getAdjustedEpochTime();
        let yearApproximation = (1970 + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
        let leapYearBeingInspected;
        if (this.getAdjustedEpochTime() >= 0) {
            leapYearBeingInspected = 1972;
            while (leapYearBeingInspected < Math.floor(yearApproximation)) {
                if (TSDateMath.isYearLeapYear(leapYearBeingInspected)) {
                    millisecondApproximation -= TSTimeUnit.DAY.getMilliseconds();
                    yearApproximation = (1970 + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
                }
                leapYearBeingInspected += 4;
            }
        }
        else {
            leapYearBeingInspected = 1968;
            while (leapYearBeingInspected > yearApproximation) {
                if (TSDateMath.isYearLeapYear(leapYearBeingInspected)) {
                    millisecondApproximation += TSTimeUnit.DAY.getMilliseconds();
                    yearApproximation = (1970 + (millisecondApproximation / TSTimeUnit.YEAR.getMilliseconds()));
                }
                leapYearBeingInspected -= 4;
            }
        }
        return Math.floor(yearApproximation);
    }
    getMonth() {
        let year = this.getYear();
        let beginningOfYear = (new TSDateBuilder()).withYear(year).build();
        let dayInYear = TSTimespan.between(beginningOfYear, this).toDays();
        return TSMonth.getMonthByDayInYear(dayInYear, year);
    }
    getDayOfMonth() {
        let beginningOfMonth = (new TSDateBuilder())
            .withYear(this.getYear())
            .withMonth(this.getMonth())
            .build();
        return (Math.floor(TSTimespan.between(beginningOfMonth, this).toDays()) + 1);
    }
    getHourOfDay24HourZeroIndexed() {
        let beginningOfDay = (new TSDateBuilder())
            .withYear(this.getYear())
            .withMonth(this.getMonth())
            .withDay(this.getDayOfMonth())
            .build();
        return (Math.floor(TSTimespan.between(beginningOfDay, this).toHours()));
    }
    getHourOfDay24Hour() {
        let zeroIndexed = this.getHourOfDay24HourZeroIndexed();
        if (zeroIndexed === 0)
            return 12;
        else
            return zeroIndexed + 1;
    }
    getHourOfDay12Hour() {
        return (this.getHourOfDay24Hour() % 13);
    }
    get12HourPeriod() {
        return (this.getHourOfDay24HourZeroIndexed() > 12 ? "PM" : "AM");
    }
    getMinuteOfHour() {
        let beginningOfHour = (new TSDateBuilder())
            .withYear(this.getYear())
            .withMonth(this.getMonth())
            .withDay(this.getDayOfMonth())
            .withHours(this.getHourOfDay24HourZeroIndexed())
            .build();
        return (Math.floor(TSTimespan.between(beginningOfHour, this).toMinutes()));
    }
    getSecondOfMinute() {
        let beginningOfMinute = (new TSDateBuilder())
            .withYear(this.getYear())
            .withMonth(this.getMonth())
            .withDay(this.getDayOfMonth())
            .withHours(this.getHourOfDay24HourZeroIndexed())
            .withMinutes(this.getMinuteOfHour())
            .build();
        return (Math.floor(TSTimespan.between(beginningOfMinute, this).toSeconds()));
    }
    getMillisecondOfSecond() {
        let beginningOfSecond = (new TSDateBuilder())
            .withYear(this.getYear())
            .withMonth(this.getMonth())
            .withDay(this.getDayOfMonth())
            .withHours(this.getHourOfDay24HourZeroIndexed())
            .withMinutes(this.getMinuteOfHour())
            .withSeconds(this.getSecondOfMinute())
            .build();
        return (Math.floor(TSTimespan.between(beginningOfSecond, this).toMilliseconds()));
    }
    getUTCOffset() {
        return this.offsetHours;
    }
    getEpochTime() {
        return this.epochTime;
    }
    getAdjustedEpochTime() {
        return (this.getEpochTime() + (this.getUTCOffset() * TSTimeUnit.HOUR.getMilliseconds()));
    }
    toString() {
        let month = this.getMonth().getMonthName();
        let day = this.getDayOfMonth();
        let ordinalIndicator = TSDateMath.getOrdinalIndicator(day);
        let year = this.getYear();
        let utcString = "(UTC" + (this.getUTCOffset() >= 0 ? "+" : "") + this.getUTCOffset() + ")";
        let hour = this.getHourOfDay12Hour().toString();
        let minute = this.getMinuteOfHour().toString();
        let second = this.getSecondOfMinute().toString();
        let millisecond = this.getMillisecondOfSecond().toString();
        let period = this.get12HourPeriod();
        while (minute.length < 2)
            minute = "0" + minute;
        while (second.length < 2)
            second = "0" + second;
        while (millisecond.length < 3)
            millisecond = "0" + millisecond;
        return (month + " " + day + ordinalIndicator + ", " + year + " " +
            utcString + " " + hour + ":" + minute + ":" + second + "." + millisecond + " " + period);
    }
}
TSDate.EPOCH_YEAR = 1970;
export default TSDate;
//# sourceMappingURL=ts-date.js.map