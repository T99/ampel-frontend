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
    constructor(content) {
        this.content = content;
    }
    // DOC-ME [12/4/18 @ 5:52 PM] - Documentation required!
    static fromPascalCase(content) {
        content = content.trim();
        let newContent = "";
        if (content.length === 0)
            return new StringFormatter("");
        else
            newContent += content.charAt(0);
        let charIndex = 1;
        let lastChar = content.charAt(charIndex - 1);
        let thisChar = content.charAt(charIndex);
        let nextChar = content.charAt(charIndex + 1);
        while (thisChar !== "") {
            let lastCharIsUppercase = StringFormatter.isUppercaseCharacter(lastChar);
            let thisCharIsUppercase = StringFormatter.isUppercaseCharacter(thisChar);
            let nextCharIsUppercase = StringFormatter.isUppercaseCharacter(nextChar);
            if (lastCharIsUppercase) {
                if (thisCharIsUppercase) {
                    if (nextCharIsUppercase || nextChar === "")
                        newContent += thisChar;
                    else
                        newContent += (" " + thisChar.toLowerCase());
                }
                else
                    newContent += thisChar;
            }
            else {
                if (thisCharIsUppercase)
                    newContent += (" " + thisChar.toLowerCase());
                else
                    newContent += thisChar;
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
    static isUppercaseCharacter(content) {
        return /^[A-Z]$/.test(content);
    }
    /**
     * Returns true if the provided string consists solely of a single lowercase character.
     *
     * @param {string} content The content to check.
     * @returns {boolean} true if the provided string consists solely of a single lowercase character.
     */
    static isLowercaseCharacter(content) {
        return /^[a-z]$/.test(content);
    }
    /**
     * Returns true if the provided string consists solely of a single whitespace character.
     *
     * @param {string} content The content to check.
     * @returns {boolean} true if the provided string consists solely of a single whitespace character.
     */
    static isWhitespaceCharacter(content) {
        return /^\s$/.test(content);
    }
    toSentenceCase() {
        let result = "";
        let currentWord;
        let lastWhitespaceIndex = 0;
        let hasNext;
        if (this.content === "")
            return "";
        else if (this.content.includes(" ")) {
            lastWhitespaceIndex = this.content.indexOf(" ", lastWhitespaceIndex);
            currentWord = this.content.substring(0, lastWhitespaceIndex);
            hasNext = (lastWhitespaceIndex < this.content.length - 1);
        }
        else {
            currentWord = this.content;
            hasNext = false;
        }
        // If the entire word is uppercase, keep is as such.
        if (currentWord.split("").every((character) => StringFormatter.isUppercaseCharacter(character))) {
            result += currentWord;
        }
        else {
            result += currentWord.charAt(0).toUpperCase();
            result += currentWord.substring(1);
        }
        while (hasNext) {
            let nextWhitespaceIndex = (this.content.includes(" ", lastWhitespaceIndex) ?
                this.content.indexOf(" ", lastWhitespaceIndex) :
                this.content.length);
            currentWord = this.content.substring(lastWhitespaceIndex, lastWhitespaceIndex);
            lastWhitespaceIndex = this.content.indexOf(" ", lastWhitespaceIndex);
            hasNext = (lastWhitespaceIndex < this.content.length - 1);
        }
        return result;
    }
    toString() {
        return this.content;
    }
}
export default StringFormatter;
//# sourceMappingURL=string-formatter.js.map