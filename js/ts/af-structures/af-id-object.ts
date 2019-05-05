/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:46 AM -- January 31st, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * An interface representing an Ampel structure that has an ID.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
interface AFIDObject {
	
	getID(): string;
	
	getName(): string;
	
	// TODO [2/6/19 @ 8:00 PM] - Add 'getDateUpdated(): TSDate' and 'getDateCreated(): TSDate'.
	
}

export default AFIDObject;