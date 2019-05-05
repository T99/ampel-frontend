/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:19 PM -- December 21st, 2018.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Describes a CSS length/getHeight/width in both it's magnitude (a number) and measurement (a {@link JUIUnitDescriptor}).
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIUnit {
    constructor(value, measurement) {
        this.value = value;
        this.measurement = measurement;
    }
    set(value) {
        this.value = value;
    }
    increment(difference) {
        this.value = this.value + (difference ? difference : 1);
        return this.value;
    }
    decrement(difference) {
        this.value = this.value - (difference ? difference : 1);
        return this.value;
    }
    changeMeasurement(measurement) {
        this.measurement = measurement;
    }
    getNumericValue() {
        return this.value;
    }
    getUnitType() {
        return this.measurement;
    }
    toString() {
        return this.value + this.measurement.toString();
    }
}
export default JUIUnit;
//# sourceMappingURL=jui-unit.js.map