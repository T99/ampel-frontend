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
enum JUIKeyGroup {
	
	ALPHANUMERICAL = "^([0-9]|[a-z]|[A-Z])$",
	LETTER = "^([a-z]|[A-Z])$",
	UPPERCASE_LETTER = "^[A-Z]$",
	LOWERCASE_LETTER = "^[a-z]$",
	NUMBER = "^[0-9]$",
	CHARACTER = "^.$",
	FUNCTION_KEY = "^F((1[0-2]?)|[2-9])$",
	ARROW_KEY = "^Arrow(Up|Down|Left|Right)$",
	NAMED_KEYS = "^(Arrow(Up|Down|Left|Right)|^F((1[0-2]?)|[2-9])$|Escape|Tab|CapsLock|Shift|Control|Delete|Insert|Backspace|Enter)$"
	
}

export default JUIKeyGroup;