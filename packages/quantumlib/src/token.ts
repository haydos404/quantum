import { IDefinition } from './definition';

export interface IState {
	/**
	 * Has started
	 */
	started: boolean;
	/**
	 * Has completed
	 */
	complete: boolean;
}

/**
 * Stack information
 */
export interface ITokenStep<P = any> {
	/**
	 * Id representing the activity or gateway
	 */
	id: string;

	/**
	 * Number of times this element has executed
	 */
	iteration: number;

	/**
	 * Item state
	 */
	state: IState;

	/**
	 * Typeof properties used
	 */
	properties: P;
}

/**
 * Token builder constructs a
 */
export interface IToken {
	/**
	 * Current location of the token
	 */
	current: string[];

	/**
	 * Current stack
	 */
	stack: ITokenStep[];

	/**
	 * Execution definition metadata
	 */
	definition: IDefinition;
}
