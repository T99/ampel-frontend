/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:04 PM -- December 04th, 2018.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Provides a grab-bag of static string formatting methods.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class StringFormatter {
	
	// DOC-ME [12/4/18 @ 5:52 PM] - Documentation required!
	private content: string;
	
	// DOC-ME [12/4/18 @ 5:52 PM] - Documentation required!
	private constructor(content: string) {
		
		this.content = content;
		
	}
	
	// DOC-ME [12/4/18 @ 5:52 PM] - Documentation required!
	public static fromPascalCase(content: string): StringFormatter {
		
		content = content.trim();
		let newContent: string = "";
		
		if (content.length === 0) return new StringFormatter("");
		else newContent += content.charAt(0);
		
		let charIndex: number = 1;
		let lastChar: string = content.charAt(charIndex - 1);
		let thisChar: string = content.charAt(charIndex);
		let nextChar: string = content.charAt(charIndex + 1);
		
		while (thisChar !== "") {
			
			let lastCharIsUppercase: boolean = StringFormatter.isUppercaseCharacter(lastChar);
			let thisCharIsUppercase: boolean = StringFormatter.isUppercaseCharacter(thisChar);
			let nextCharIsUppercase: boolean = StringFormatter.isUppercaseCharacter(nextChar);
			
			if (lastCharIsUppercase) {
				
				if (thisCharIsUppercase) {
					
					if (nextCharIsUppercase || nextChar === "") newContent += thisChar;
					else newContent += (" " + thisChar.toLowerCase());
					
				} else newContent += thisChar;
				
			} else {
				
				if (thisCharIsUppercase) newContent += (" " + thisChar.toLowerCase());
				else newContent += thisChar;
				
			}
			
			lastChar = thisChar;
			thisChar = content.charAt(++charIndex);
			nextChar = content.charAt(charIndex + 1);
			
		}
		
		return new StringFormatter(newContent);
		
	}
	
	/**
	 * Returns true if the provided string consists solely of a single uppercase character.
	 *
	 * @param {string} content The content to check.
	 * @returns {boolean} true if the provided string consists solely of a single uppercase character.
	 */
	private static isUppercaseCharacter(content: string): boolean {
		
		return /^[A-Z]$/.test(content);
		
	}
	
	/**
	 * Returns true if the provided string consists solely of a single lowercase character.
	 * 
	 * @param {string} content The content to check.
	 * @returns {boolean} true if the provided string consists solely of a single lowercase character.
	 */
	private static isLowercaseCharacter(content: string): boolean {
		
		return /^[a-z]$/.test(content);
		
	}
	
	/**
	 * Returns true if the provided string consists solely of a single whitespace character.
	 *
	 * @param {string} content The content to check.
	 * @returns {boolean} true if the provided string consists solely of a single whitespace character.
	 */
	private static isWhitespaceCharacter(content: string): boolean {
		
		return /^\s$/.test(content);
		
	}
	
	public toSentenceCase(): string {
		
		let result: string = "";
		let currentWord: string;
		let lastWhitespaceIndex: number = 0;
		let hasNext: boolean;
		
		if (this.content === "") return "";
		else if (this.content.includes(" ")) {
			
			lastWhitespaceIndex = this.content.indexOf(" ", lastWhitespaceIndex);
			currentWord = this.content.substring(0, lastWhitespaceIndex);
			hasNext = (lastWhitespaceIndex < this.content.length - 1);
			
		} else {
			
			currentWord = this.content;
			hasNext = false;
			
		}
		
		// If the entire word is uppercase, keep is as such.
		if (currentWord.split("").every((character: string) => StringFormatter.isUppercaseCharacter(character))) {
			
			result += currentWord;
			
		} else {
			
			result += currentWord.charAt(0).toUpperCase();
			result += currentWord.substring(1);
			
		}
		
		while (hasNext) {
			
			let nextWhitespaceIndex: number = (this.content.includes(" ", lastWhitespaceIndex) ?
				this.content.indexOf(" ", lastWhitespaceIndex) :
				this.content.length);
			currentWord = this.content.substring(lastWhitespaceIndex, lastWhitespaceIndex);
			lastWhitespaceIndex = this.content.indexOf(" ", lastWhitespaceIndex);
			hasNext = (lastWhitespaceIndex < this.content.length - 1);
			
		}
		
		return result;
		
	}
	
	public toString(): string {
		
		return this.content;
		
	}
	
}

export default StringFormatter;