/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:16 AM -- January 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 * Allows geolocating if enabled by the user.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFGeolocator {
	
	public static isSupported(): boolean {
		
		return ("geolocation" in navigator);
		
	}
	
	public static async hasPermissions(): Promise<boolean> {
		
		return new Promise<boolean>((resolve: (result: boolean) => void): void => {
			
			navigator.geolocation.getCurrentPosition(
				() => resolve(true),
				() => resolve(false)
			);
			
		});
		
	}
	
	public static async getPosition(): Promise<Position> {
		
		return new Promise<Position>((resolve: (result: Position) => void, reject: () => void): void => {
			
			navigator.geolocation.getCurrentPosition(
				(position: Position) => resolve(position),
				() => reject()
			);
			
		});
		
	}
	
	public static async getLatitude(): Promise<number> {
		
		return new Promise<number>((resolve: (result: number) => void, reject: () => void): void => {
			
			navigator.geolocation.getCurrentPosition(
				(position: Position) => resolve(position.coords.latitude),
				() => reject()
			);
			
		});
		
	}
	
	public static async getLongitude(): Promise<number> {
		
		return new Promise<number>((resolve: (result: number) => void, reject: () => void): void => {
			
			navigator.geolocation.getCurrentPosition(
				(position: Position) => resolve(position.coords.longitude),
				() => reject()
			);
			
		});
		
	}
	
}

export default AFGeolocator;