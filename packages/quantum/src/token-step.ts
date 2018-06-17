import { IToken, ITokenStep } from 'quantumlib';
import { addToCurrent, removeCurrentValue } from './current-pointer';

/**
 * Adds a stack item to the token
 *
 * @param token - Token to add stack item to
 * @param steps - Stack items to add
 */
export function addTokenStep(token: IToken, ...steps: ITokenStep[]): IToken {
	token.stack = [...token.stack, ...steps];
	return token;
}

/**
 * Completes a token step and adds next to the stack
 *
 * @param token - Token to complete
 * @param step - Step to complete
 */
export function completeTokenStep(token: IToken, step: ITokenStep): IToken {
	const definition = token.definition.execution.find(i => i.id === step.id);

	if (!definition) {
		throw new Error(`Cannot find execution step by id ${step.id}.`);
	}

	return updateTokenStep(
		addToCurrent(removeCurrentValue(token, step.id), ...definition.next),
		step,
	);
}

/**
 * Adds a new item to the stack and updates the current pointers
 *
 * @param token
 * @param step
 */
export function addNextTokenStep(token: IToken, ...steps: string[]): IToken {
	return addToCurrent(addNewTokenStepById(token, ...steps), ...steps);
}

/**
 * Adds a new token step to the stack by id
 *
 * @param token - Token to add new token step to
 * @param stepIds - Steps to add
 */
export function addNewTokenStepById(
	token: IToken,
	...stepIds: string[]
): IToken {
	for (const id of stepIds) {
		if (token.stack.some(i => i.id === id)) {
			return token;
		}

		addTokenStep(token, {
			id,
			iteration: 1,
			properties: {},
			state: {
				complete: false,
				started: false,
			},
		});
	}

	return token;
}

/**
 * Updates the value of a stack item in the token
 *
 * @param token - Token to update stack item for
 * @param stack - Stack item to update with
 */
export function updateTokenStep(token: IToken, stack: ITokenStep): IToken {
	const index = token.stack.findIndex(i => i.id === stack.id);

	if (index < 0) {
		throw new Error(
			`Could not find stack item by Id ${
				stack.id
			}. Cannot update non-existent stack item.`,
		);
	}

	token.stack[index] = stack;

	return token;
}

// Views
/**
 * Retrieves a step by an id
 *
 * @param token - Token to find step in
 * @param step - Step id
 */
export function getTokenStepById(token: IToken, id: string): ITokenStep {
	const step = token.stack.find(i => i.id === id);

	if (!step) {
		throw new Error(`Cannot find token step by Id ${id}.`);
	}

	return step;
}
