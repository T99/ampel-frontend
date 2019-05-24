/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:43 PM -- May 22nd, 2019.
 *	Website: dashboard.ampelfeedback.com
 */

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class JUIElementType<E extends Element = Element> {
	
	private readonly factoryMethod: () => E;
	
	protected constructor(factoryMethod: () => E) {
		
		this.factoryMethod = factoryMethod;
		
	}
	
	public create(): E {
		
		return this.factoryMethod();
		
	}
	
	protected static getPlainElementFactoryMethod<E>(elementTag: string): () => E {
		
		return (): E => document.createElement(elementTag) as unknown as E;
		
	}
	
}

export default JUIElementType;