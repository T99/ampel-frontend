/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:13 PM -- May 11th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * A number of async/await/Promise utility functions.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class TSAwaitUtils {
	
	private constructor() { /* Do nothing. */ }
	
	public static ms<T extends any = any>(milliseconds: number, returnValue?: T): Promise<T> {
		
		return new Promise<T>((resolve: (value?: T) => void): void => {
			
			setTimeout((): any => resolve(returnValue), milliseconds);
			
		});
		
	}
	
}

export default TSAwaitUtils;