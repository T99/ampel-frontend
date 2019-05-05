/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:21 PM -- March 12th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
import TSComparator from "../../interfaces/ts-comparator.js";
import TSNumericComparator from "./ts-numeric-comparator.js";
/**
 * A class that can relatively order strings comprised of alphanumeric characters, as well as a limited number of other
 * characters.
 *
 * The overall order of characters is as follows:
 *
 * +---+----+   +---+----+   +---+----+   +---+----+
 * |Chr|Val |   |Chr|Val |   |Chr|Val |   |Chr|Val |
 * +---+----+   +---+----+   +---+----+   +---+----+
 * | 0 | 00 |   | H | 25 |   | u | 50 |   | - | 75 |
 * | 1 | 01 |   | i | 26 |   | U | 51 |   | . | 76 |
 * | 2 | 02 |   | I | 27 |   | v | 52 |   | / | 77 |
 * | 3 | 03 |   | j | 28 |   | V | 53 |   | : | 78 |
 * | 4 | 04 |   | J | 29 |   | w | 54 |   | ; | 79 |
 * | 5 | 05 |   | k | 30 |   | W | 55 |   | < | 80 |
 * | 6 | 06 |   | K | 31 |   | x | 56 |   | = | 81 |
 * | 7 | 07 |   | l | 32 |   | X | 57 |   | > | 82 |
 * | 8 | 08 |   | L | 33 |   | y | 58 |   | ? | 83 |
 * | 9 | 09 |   | m | 34 |   | Y | 59 |   | @ | 84 |
 * | a | 10 |   | M | 35 |   | z | 60 |   | [ | 85 |
 * | A | 11 |   | n | 36 |   | Z | 61 |   | \ | 86 |
 * | b | 12 |   | N | 37 |   |   | 62 |   | ] | 87 |
 * | B | 13 |   | o | 38 |   | ! | 63 |   | ^ | 88 |
 * | c | 14 |   | O | 39 |   | " | 64 |   | _ | 89 |
 * | C | 15 |   | p | 40 |   | # | 65 |   | ` | 90 |
 * | d | 16 |   | P | 41 |   | $ | 66 |   | { | 91 |
 * | D | 17 |   | q | 42 |   | % | 67 |   | | | 92 |
 * | e | 18 |   | Q | 43 |   | & | 68 |   | } | 93 |
 * | E | 19 |   | r | 44 |   | ' | 69 |   | ~ | 94 |
 * | f | 20 |   | R | 45 |   | ( | 70 |   +---+----+
 * | F | 21 |   | s | 46 |   | ) | 71 |
 * | g | 22 |   | S | 47 |   | * | 72 |
 * | G | 23 |   | t | 48 |   | + | 73 |
 * | h | 24 |   | T | 49 |   | , | 74 |
 * +---+----+   +---+----+   +---+----+
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSAlphanumericComparator extends TSComparator {
    constructor(reverseOrder) {
        super(reverseOrder);
    }
    internalComparison(element1, element2) {
        let comparisonIndex = 0;
        let numericComparator = new TSNumericComparator();
        while ((comparisonIndex < element1.length) && (comparisonIndex < element2.length)) {
            let comparisonValue = numericComparator.compare(TSAlphanumericComparator.getValueOfCharacter(element1.charAt(comparisonIndex)), TSAlphanumericComparator.getValueOfCharacter(element2.charAt(comparisonIndex)));
            if (comparisonValue === 0)
                comparisonIndex++;
            else
                return comparisonValue;
        }
        if ((element1.length === comparisonIndex) && (element2.length === comparisonIndex))
            return 0;
        else if (element1.length > comparisonIndex)
            return 1;
        else if (element2.length > comparisonIndex)
            return -1;
        else
            throw new Error("Unexpected comparison result.");
    }
    static getValueOfCharacter(character) {
        if (character.length >= 1) {
            character = character.substring(0, 1);
            let asciiCode = character.charCodeAt(0);
            if ((asciiCode >= 32) && (asciiCode <= 47))
                return (62 + (asciiCode - 32));
            else if ((asciiCode >= 48) && (asciiCode <= 57))
                return parseInt(character);
            else if ((asciiCode >= 58) && (asciiCode <= 64))
                return (78 + (asciiCode - 58));
            else if ((asciiCode >= 65) && (asciiCode <= 90))
                return (11 + (2 * (asciiCode - 65)));
            else if ((asciiCode >= 91) && (asciiCode <= 96))
                return (85 + (asciiCode - 91));
            else if ((asciiCode >= 97) && (asciiCode <= 122))
                return (10 + (2 * (asciiCode - 97)));
            else if ((asciiCode >= 123) && (asciiCode <= 126))
                return (91 + (asciiCode - 123));
        }
        else
            throw new Error("Attempted to get the value of a zero-length string.");
    }
}
export default TSAlphanumericComparator;
//# sourceMappingURL=ts-alphanumeric-comparator.js.map