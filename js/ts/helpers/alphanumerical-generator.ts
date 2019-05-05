/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:45 PM -- November 05th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

import MalformedPatternError from "../errors/malformed-pattern-error.js";

// DOC-ME [12/8/18 @ 4:51 PM] - Documentation required!
class AlphanumericalGenerator {
	
	private static LETTERS: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	private static SPECIAL_CHARACTERS: string[] = ["!", "@", "#", "&", "+", "=", "?"];
	private static ORDERED_PATTERN_REGEX: RegExp = /^((\d+)*([aluns]|(\[[0-9]+-[0-9]+\])|({.*})|(\(.*?\))))+$/;
	
	private constructor() {
		
		throw new Error("ERR | Attempted to create an instance of a static class, 'AlphanumericalGenerator'.");
	
	}
	
	/**
	 * Recursively validates a given pattern.
	 * 
	 * @param pattern A string-based pattern to be validated.
	 * @returns {Boolean} A boolean representing the validity of the pattern.
	 */
	public static validatePattern(pattern: string): boolean {
		
		if (pattern === "") return true;
		let initialTestResult: boolean = AlphanumericalGenerator.ORDERED_PATTERN_REGEX.test(pattern);
		let matches: string[] = pattern.match(/\(.*?\)/g);
		let subPatterns: string[] = [];
		if (matches && matches.length > 0) subPatterns = matches.map((match: string) => match.substring(1, match.length - 1));
		let subPatternTestResult: boolean = subPatterns.every(AlphanumericalGenerator.validatePattern);
		return ((initialTestResult === true) && (subPatternTestResult === true));
		
	}
	
	/**
	 * Generates and returns a random alphanumerical string based on the pattern provided, ordered based on the given pattern.
	 *
	 * Patterns are specified as follows:
	 * 	- A randomly upper or lower case letter is specified by an 'a'.
	 * 	- A lower case letter is specified by an 'l'.
	 * 	- An upper case letter is specified by a 'u'.
	 * 	- A number is specified by an 'n'.
	 * 	- A special character is specified by an 's'.
	 * 	- A number range is specified as '[<starting #>-<ending #>]'.
	 * 	- A string literal is specified as '{string literal}'.
	 * 	- Prepend any pattern item with an integer to repeat that item the number of times specified by the integer.
	 * 	- A pattern item group is defined as '(pattern item group)'.
	 *
	 * @param pattern A string-based pattern generated from the above specified format.
	 * @returns {String} A string that was generated from the provided pattern.
	 */
	public static getIdFromOrderedPattern(pattern: string): string {
		
		if (pattern.constructor !== String) throw new TypeError("AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was provided a " + pattern.constructor.name + " as a pattern rather than a String.");
		if (!AlphanumericalGenerator.validatePattern(pattern)) throw new MalformedPatternError("The pattern provided to AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was unacceptable.");
		
		let characters: string[] = pattern.split("");
		let index: number = 0;
		let result: string = "";
		
		do {
			
			let returned: {result: any, index: number} = this._getIdFromOrderedPattern(characters, index);
			index = returned.index;
			result += returned.result;
			
		} while (index < characters.length);
		
		return result;
		
	}
	
	private static _getIdFromOrderedPattern(characters: string[], index: number): { result: any, index: number } {
		
		let character: string = characters[index];
		
		if (character === "a") {
			
			return {
				result: AlphanumericalGenerator.getRandomLetter(),
				index: index + 1
			};
			
		} else if (character === "n") {
			
			return {
				result: AlphanumericalGenerator.getRandomInteger(0, 9),
				index: index + 1
			};
			
		} else if (character === "u") {
			
			return {
				result: AlphanumericalGenerator.getRandomUppercaseLetter(),
				index: index + 1
			};
			
		} else if (character === "l") {
			
			return {
				result: AlphanumericalGenerator.getRandomLowercaseLetter(),
				index: index + 1
			};
			
		} else if (character === "s") {
			
			return {
				result: AlphanumericalGenerator.getRandomSpecialCharacter(),
				index: index + 1
			};
			
		} else if (character === "[") {
			
			let closingBracketIndex: number = characters.indexOf("]", index);
			if (closingBracketIndex === -1) throw new Error("The pattern provided to AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was contained an unclosed square bracket.");
			let dashIndex: number = characters.indexOf("-", index);
			if (dashIndex === -1 || !(dashIndex < closingBracketIndex)) throw new Error("The pattern provided to AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was contained an number range that did not include a dash.");
			let beginRange: number = parseFloat(characters.slice(index + 1, dashIndex).join(""));
			let endRange: number = parseFloat(characters.slice(dashIndex + 1, closingBracketIndex).join(""));
			
			return {
				result: AlphanumericalGenerator.getRandomInteger(beginRange, endRange),
				index: closingBracketIndex + 1
			};
			
		} else if (character === "{") {
			
			let closingBracketIndex: number = characters.indexOf("}", index);
			if (closingBracketIndex === -1) throw new Error("The pattern provided to AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was contained an unclosed curly bracket.");
			
			return {
				result: characters.slice(index + 1, closingBracketIndex).join(""),
				index: closingBracketIndex + 1
			};
			
		} else if (character === "(") {
			
			let closingParenIndex: number = characters.indexOf(")", index);
			if (closingParenIndex === -1) throw new Error("The pattern provided to AlphanumericalGenerator#getIdFromOrderedPattern(pattern) was contained an unclosed curly bracket.");
			
			let subPattern: string = characters.slice(index + 1, closingParenIndex).join("");
			
			return {
				result: this.getIdFromOrderedPattern(subPattern),
				index: closingParenIndex + 1
			};
			
		} else if (Number.isInteger(parseFloat(character))) {
			
			let integerLength: number = 1;

			while (Number.isInteger(parseFloat(characters[index + integerLength]))) {

				character += characters[index + 1];
				integerLength++;

			}
			
			let multiplier: number = parseInt(character, 10);
			let result: string = "";
			let finalIndex: number = index;
			
			if (multiplier > 0) {
				
				while (multiplier > 0) {
					
					let returned: {result: any, index: number} = this._getIdFromOrderedPattern(characters, index + integerLength);
					result += returned.result;
					finalIndex = returned.index;
					multiplier--;
					
				}
				
			} else finalIndex = this._getIdFromOrderedPattern(characters, index + integerLength).index;

			return {
				result,
				index: finalIndex
			};
			
		}
		
	}
	
	/**
	 * Generates and returns a random alphanumerical string based on the pattern provided, in an unordered fashion.
	 *
	 * Patterns are specified as follows:
	 * 	- 
	 *
	 * @param pattern A string-based pattern generated from the above specified format.
	 * @returns {String} A string that was generated from the provided pattern.
	 */
	public static getIdFromUnorderedPattern(pattern: string): string {
		
		return "Hello";
		
	}
	
	public static getRandomLetter(beginRange?: string, endRange?: string): string {
		
		if (beginRange) {
			
			if (endRange) {
				
				if (beginRange.constructor !== String || endRange.constructor !== String) throw new TypeError("AlphanumericalGenerator#getRandomLetter(beginRange, endRange) was called with non-String arguments.");
				if (!((AlphanumericalGenerator.LETTERS.indexOf(beginRange.toLowerCase()) !== -1) && (AlphanumericalGenerator.LETTERS.indexOf(endRange.toLowerCase()) !== -1))) throw new TypeError("AlphanumericalGenerator#getRandomLetter(beginRange, endRange) was called with non-character arguments.");
				
				let beginIndex: number = AlphanumericalGenerator.LETTERS.indexOf(beginRange);
				let endIndex: number = AlphanumericalGenerator.LETTERS.indexOf(endRange);
				
				let characterSet: string[] = AlphanumericalGenerator.LETTERS.slice(Math.min(beginIndex, endIndex), Math.max(beginIndex, endIndex) + 1);
				
				let letter: string = characterSet[Math.floor(Math.random() * characterSet.length)];
				return (Math.floor(Math.random() * 2) === 0 ? letter.toUpperCase() : letter);
				
			} else throw new Error("AlphanumericalGenerator#getRandomLetter(beginRange, endRange) was called with only a beginIndex.");
			
		} else {
			
			let letter: string = AlphanumericalGenerator.LETTERS[Math.floor(Math.random() * AlphanumericalGenerator.LETTERS.length)];
			return (Math.floor(Math.random() * 2) === 0 ? letter.toUpperCase() : letter);
			
		}
		
	}
	
	public static getRandomLowercaseLetter(beginRange?: string, endRange?: string): string {
		
		return AlphanumericalGenerator.getRandomLetter(beginRange, endRange).toLowerCase();
		
	}
	
	public static getRandomUppercaseLetter(beginRange?: string, endRange?: string): string {
		
		return AlphanumericalGenerator.getRandomLetter(beginRange, endRange).toUpperCase();
		
	}
	
	public static getRandomInteger(beginRange: number, endRange: number): number {
		
		if ((beginRange !== undefined) && (endRange !== undefined)) {
			
			if (beginRange.constructor !== Number || endRange.constructor !== Number) throw new TypeError("AlphanumericalGenerator#getRandomLetter(beginRange, endRange) was called with non-Number arguments.");
			if (!Number.isInteger(beginRange) || !Number.isInteger(endRange)) throw new TypeError("AlphanumericalGenerator#getRandomLetter(beginRange, endRange) was called with non-integer arguments.");
			if (beginRange === endRange) return beginRange;
			
			return Math.floor(Math.random() * (Math.max(beginRange, endRange) - Math.min(beginRange, endRange) + 1)) + Math.min(beginRange, endRange);
			
		} else throw new Error("AlphanumericalGenerator#getRandomInteger(beginRange, endRange) was called without either a beginRange or an endRange.");
		
	}
	
	public static getRandomSpecialCharacter(): string {
		
		return AlphanumericalGenerator.SPECIAL_CHARACTERS[Math.floor(Math.random() * AlphanumericalGenerator.SPECIAL_CHARACTERS.length)];
		
	}
	
}

export default AlphanumericalGenerator;