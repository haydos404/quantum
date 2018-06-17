import { IDefinitionStep, IToken } from 'quantumlib';

// Views

/**
 * Retrieves a definition step by a token step
 *
 * @param token - Token to find definition in
 * @param id - Id of the token step
 */
export function getDefinitionByTokenStep(
	token: IToken,
	id: string,
): IDefinitionStep {
	const definition = token.definition.execution.find(i => i.id === id);

	if (!definition) {
		throw new Error(`Cannot find definition step by token step id ${id}`);
	}

	return definition;
}
