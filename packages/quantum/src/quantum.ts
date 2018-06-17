import { IConnector, IDefinition, IToken } from 'quantumlib';
import { getConnectorById, isNativeConnector } from './connector';
import { getDefinitionByTokenStep } from './definition';
import {
	addNextTokenStep,
	completeTokenStep,
	getTokenStepById,
	updateTokenStep,
} from './token-step';

/**
 * Start a process from a definition
 *
 * @param connectors - Connectors that implement the definition
 * @param definition - Definition to execute
 *
 * @returns - New token state
 */
export async function fromDefinition(
	connectors: IConnector[],
	definition: IDefinition,
) {
	// Create a template token
	const token: IToken = {
		current: [],
		definition,
		stack: [],
	};

	// Add start elements to stack
	addNextTokenStep(
		token,
		...definition.execution
			.filter(
				i => !definition.execution.some(j => j.next.some(k => k === i.id)),
			)
			.map(i => i.id),
	);

	return fromToken(connectors, token);
}

/**
 * Execute a quantum instance from a token
 *
 * @param connectors - Connectors to execute with definition
 * @param token - Token to attempt to execute
 */
export async function fromToken(
	connectors: IConnector[],
	token: IToken,
): Promise<IToken> {
	await execute(connectors, token);
	return token;
}

export async function* execute(connectors: IConnector[], token: IToken) {
	let id: string | undefined;

	// Loop while there are currents
	// tslint:disable-next-line:no-conditional-assignment
	while ((id = token.current.shift())) {
		// Get step information
		const step = getTokenStepById(token, id);
		const definition = getDefinitionByTokenStep(token, id);
		const connector = getConnectorById(connectors, definition.connectorId);

		// Set started
		step.state.started = true;
		updateTokenStep(token, step);

		// Handle native connectors
		if (isNativeConnector(connector)) {
			// Update the result of the token step with the execution result
			updateTokenStep(token, await connector.execute(token, step));

			if (step.state.complete) {
				token = completeTokenStep(token, step);
			}
		}

		// Prepare next steps
		for (const n of definition.next) {
			// Add start elements to stack
			addNextTokenStep(token, getDefinitionByTokenStep(token, n).id);
		}
	}

	return token;
}
