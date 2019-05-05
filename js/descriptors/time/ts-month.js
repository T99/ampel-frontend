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
    constructor(monthNumber, monthName, daysInMonth) {
        this.monthNumber = monthNumber;
        this.monthName = monthName;
        this.daysInMonth = daysInMonth;
        TSMonth.addMonthNumberMapping(this.monthNumber, this);
        TSMonth.addMonthNameMapping(this.monthName, this);
    }
    static addMonthNumberMapping(monthNumber, month) {
        if (TSMonth.monthNumberMap === undefined)
            TSMonth.monthNumberMap = new Map();
        TSMonth.monthNumberMap.set(monthNumber, month);
    }
    static addMonthNameMapping(monthName, month) {
        if (TSMonth.monthNameMap === undefined)
            TSMonth.monthNameMap = new Map();
        TSMonth.monthNameMap.set(monthName.toLowerCase(), month);
    }
    static getMonthByName(monthName) {
        return TSMonth.monthNameMap.get(monthName.toLowerCase());
    }
    static getMonthByNumber(monthNumber) {
        if (monthNumber === 0)
            throw new InvalidArgumentsError("Month 0 does not exist. Did you mean to call TSMonth#getMonthByNumberZeroIndexed(number)?");
        else if (monthNumber > 0)
            return TSMonth.monthNumberMap.get((monthNumber - 1) % 12);
        else
            return TSMonth.monthNumberMap.get((12 + (monthNumber % 12)) % 12);
    }
    static getMonthByNumberZeroIndexed(monthNumber) {
        if (monthNumber >= 0)
            return TSMonth.monthNumberMap.get(monthNumber % 12);
        else
            return TSMonth.monthNumberMap.get((12 + (monthNumber % 12)) % 12);
    }
    static getMonthByDayInYear(day, year) {
        let dayCount = day;
        let currentYear = year;
        if (day < 0) {
            while (dayCount < 0) {
                dayCount += (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365);
                currentYear--;
            }
        }
        else {
            while (dayCount > (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365)) {
                dayCount -= (TSDateMath.isYearLeapYear(currentYear) ? 366 : 365);
                currentYear++;
            }
        }
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
            let currentMonth = TSMonth.getMonthByNumberZeroIndexed(monthIndex);
            if (dayCount <= currentMonth.getDaysInMonth(currentYear))
                return currentMonth;
            else
                dayCount -= currentMonth.getDaysInMonth(currentYear);
        }
    }
    static getRelativeMonth(relativeIndex) {
        return TSMonth.thisMonth().getRelativeMonth(relativeIndex);
    }
    static thisMonth() {
        return TSMonth.getMonthByNumberZeroIndexed((new Date()).getMonth());
    }
    static lastMonth() {
        return TSMonth.thisMonth().lastMonth();
    }
    static nextMonth() {
        return TSMonth.thisMonth().nextMonth();
    }
    getRelativeMonth(relativeIndex) {
        return TSMonth.getMonthByNumberZeroIndexed(this.monthNumber + relativeIndex);
    }
    lastMonth() {
        return this.getRelativeMonth(-1);
    }
    nextMonth() {
        return this.getRelativeMonth(1);
    }
    getMonthNumber() {
        return (this.monthNumber + 1);
    }
    getMonthNumberZeroIndexed() {
        return this.monthNumber;
    }
    getMonthName() {
        return this.monthName;
    }
    getDaysInMonth(year) {
        if ((this === TSMonth.FEBRUARY) && (TSDateMath.isYearLeapYear(year)))
            return 29;
        else
            return this.daysInMonth;
    }
    getDaysSinceBeginningOfYear(year) {
        let monthNumber = this.getMonthNumberZeroIndexed();
        let daysBefore = 0;
        while (monthNumber > 0)
            daysBefore += TSMonth.getMonthByNumberZeroIndexed(--monthNumber).getDaysInMonth(year);
        return daysBefore;
    }
    toString() {
        return this.getMonthName();
    }
}
TSMonth.JANUARY = new TSMonth(0, "January", 31);
TSMonth.FEBRUARY = new TSMonth(1, "February", 28);
TSMonth.MARCH = new TSMonth(2, "March", 31);
TSMonth.APRIL = new TSMonth(3, "April", 30);
TSMonth.MAY = new TSMonth(4, "May", 31);
TSMonth.JUNE = new TSMonth(5, "June", 30);
TSMonth.JULY = new TSMonth(6, "July", 31);
TSMonth.AUGUST = new TSMonth(7, "August", 31);
TSMonth.SEPTEMBER = new TSMonth(8, "September", 30);
TSMonth.NOVEMBER = new TSMonth(9, "October", 31);
TSMonth.OCTOBER = new TSMonth(10, "November", 30);
TSMonth.DECEMBER = new TSMonth(11, "December", 31);
export default TSMonth;
//# sourceMappingURL=ts-month.js.map