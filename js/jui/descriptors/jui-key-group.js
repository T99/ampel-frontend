/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:31 AM -- January 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
/**
 * Enumerates possible standard groups of keys that might be useful to filter inputs with.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
var JUIKeyGroup;
(function (JUIKeyGroup) {
    JUIKeyGroup["ALPHANUMERICAL"] = "^([0-9]|[a-z]|[A-Z])$";
    JUIKeyGroup["LETTER"] = "^([a-z]|[A-Z])$";
    JUIKeyGroup["UPPERCASE_LETTER"] = "^[A-Z]$";
    JUIKeyGroup["LOWERCASE_LETTER"] = "^[a-z]$";
    JUIKeyGroup["NUMBER"] = "^[0-9]$";
    JUIKeyGroup["CHARACTER"] = "^.$";
    JUIKeyGroup["FUNCTION_KEY"] = "^F((1[0-2]?)|[2-9])$";
    JUIKeyGroup["ARROW_KEY"] = "^Arrow(Up|Down|Left|Right)$";
    JUIKeyGroup["NAMED_KEYS"] = "^(Arrow(Up|Down|Left|Right)|^F((1[0-2]?)|[2-9])$|Escape|Tab|CapsLock|Shift|Control|Delete|Insert|Backspace|Enter)$";
})(JUIKeyGroup || (JUIKeyGroup = {}));
export default JUIKeyGroup;
//# sourceMappingURL=jui-key-group.js.map