/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:45 PM -- February 02nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * The most generic possible form of a data structure that exists for use by and in the Ampel API.
 *
 * TODO [2/2/19 @ 9:03 PM] - Keep the below list up-to-date.
 * Implementing classes are as follows:
 * 	- {@link AFClient}
 * 	- {@link AFOrganization}
 * 	- {@link AFOrganizationListing}
 * 	- {@link AFLocation}
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
abstract class AFStructure<E extends AFStructure<any>> {
	
	private maintainsChildren: boolean;
	
	protected constructor(shouldMaintainChildren: boolean) {
		
		this.maintainsChildren = shouldMaintainChildren;
		
	}
	
	protected shouldMaintainChildren(): boolean {
		
		return this.maintainsChildren;
		
	}
	
	/**
	 * Refreshes the information in this AFStructure, replacing the in-place information with that from the database/API
	 * and returning a Promise that resolves once this AFStructure's information has been fully refreshed.
	 *
	 * @returns {Promise<void>} A Promise that resolves once this AFStructure's information has been fully refreshed.
	 */
	public async abstract refresh(): Promise<E>;
	
	/**
	 * Refreshes the information in this AFStructure and all underlying AFStructures recursively, replacing the in-place
	 * information with that from the database/API and returning a Promise that resolves once all relevant information
	 * has been fully refreshed.
	 *
	 * @returns {Promise<E>} A Promise that resolves once all relevant information has been fully refreshed.
	 */
	public async deepRefresh(): Promise<E> {
		
		return new Promise<E>((resolve: (structure: E) => any, reject: () => any): void => {
			
			this.refresh().then(() => {
				
				if (this.shouldMaintainChildren()) {
					
					let childrenPromises: Array<Promise<any>> = [];
					
					this.getChildrenStructures().forEach((structure: AFStructure<any>) => {
						
						childrenPromises.push(structure.deepRefresh());
						
					});
					
					// TODO [2/6/19 @ 7:07 PM] - Is this really correct? Is there a better solution?
					Promise.all(childrenPromises).then(() => resolve(this as unknown as E));
					
				} else resolve(this as unknown as E);
				
			});
			
		});
		
	}
	
	/**
	 * A helper method that returns all of the underlying AFStructures of this AFStructure in order to get their
	 * {@link #refresh} Promises.
	 *
	 * @returns {AFStructure[]} An array of all of the underlying AFStructures of this AFStructure.
	 */
	protected abstract getChildrenStructures(): Array<AFStructure<any>>;
	
	public abstract log(recurse?: boolean): void;
	
}

export default AFStructure;