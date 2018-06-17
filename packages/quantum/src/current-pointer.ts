import { IToken } from 'quantumlib';

/**
 * Adds a new step to the current token pointer
 *
 * @param token - Token to add a new current element for
 * @param tokenSteps - Steps to add
 */
export function addToCurrent(token: IToken, ...tokenSteps: string[]): IToken {
	token.current = [...token.current, ...tokenSteps];
	return token;
}

/**
 * Removes execution steps from the current pointer
 *
 * @param token - Token to remove values from
 * @param steps - Execution steps to remove
 */
export function removeCurrentValue(token: IToken, ...steps: string[]): IToken {
	token.current = token.current.filter(i => !steps.some(j => i === j));

	return token;
}
